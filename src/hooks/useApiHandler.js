// src/hooks/useApiHandler.js
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useApiHandler = () => {
    const navigate = useNavigate();
    const showToast = useToast();

    /** 
    * Validate parameter type.
    * Returns true if valid else false.
    */
    const validateParam = useCallback( ( param, expectedType, name ) => {
        if ( param == null ) return true;
        if ( typeof param !== expectedType ) {
            showToast( `Invalid ${ name }: expected a ${ expectedType }.`, "error" );
            return false;
        }
        return true;
    }, [ showToast ] );

    /** 
     * Normalize RTK Query result.
     * Unwraps data if available, throws if error, else returns the result.
     */
    const normalizeResult = async ( rawResult ) => {
        if ( typeof rawResult?.unwrap === "function" ) return await rawResult.unwrap();
        if ( rawResult?.error ) throw rawResult.error;
        if ( rawResult?.data ) return rawResult.data;
        return rawResult;
    };

    /**
     * Handle API calls with error handling, success messages, and redirects.
     * @param {Function} apiCall - The API call function (e.g., Redux mutation).
     * @param {Object} args - The arguments to pass to the API call.
     * @param {Object} options - Configuration options.
     * @param {Function} options.onSuccess - Callback for success messages.
     * @param {string} options.redirectPath - Path to navigate to on success.
     * @param {Function} options.onError - Callback for error messages.
     * @param {Function} options.onFinally - Callback for final update.
     * @returns {Promise<Object|null>} The API response or null if an error occurs.
     */
    const handleApiCall = useCallback(
        async (
            apiCall = null,
            args = null, {
                onSuccess = null,
                redirectPath = null,
                onError = null,
                onFinally = null,
            } = {}
        ) => {
            try {
                if ( !apiCall || !validateParam( apiCall, "function", "API Call" ) ) {
                    showToast( "API Call is required", "error" );
                    return null;
                }

                validateParam( onSuccess, "function", "onSuccess" );
                validateParam( onError, "function", "onError" );
                validateParam( onFinally, "function", "onFinally" );
                validateParam( redirectPath, "string", "redirectPath" );

                const rawResult = await apiCall( args );
                const response = await normalizeResult( rawResult );

                const successMsg = onSuccess
                    ? await onSuccess( response )
                    : null;

                if ( successMsg ) showToast( successMsg, "success" );
                if ( redirectPath ) navigate( redirectPath );

                return response;
            } catch ( error ) {
                console.error( "API Handler Hook error:", error );

                const errMsg = onError
                    ? await onError( error )
                    : null;
                if ( errMsg ) showToast( errMsg, "error" );

                return null;
            } finally {
                if ( onFinally ) onFinally();
            }
        },
        [ navigate, showToast, validateParam ]
    );


    /**
     * Factory function to create mutation handlers.
     * @param {Function} mutationHook - The Redux mutation hook (e.g., useCreateCouponMutation).
     * @returns {Array} A tuple containing the mutation handler and loading state.
     */
    const handleMutation = ( mutationHook ) => {
        const [ mutation, ...rest ] = mutationHook();
        const handler = ( arg, options ) => handleApiCall( mutation, arg, options );
        return [ handler, ...rest ];
    };

    return [ handleMutation, handleApiCall ];
};

export default useApiHandler;
