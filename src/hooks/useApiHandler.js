import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useApiHandler = () => {
    const navigate = useNavigate();
    const showToast = useToast();

    /**
     * Validate option parameter types
     */
    const validateParam = ( param, expectedType, name ) => {
        if ( param !== null && typeof param !== expectedType ) {
            showToast( `Invalid ${ name }: expected a ${ expectedType }.`, "error" );
            return false;
        }
        return true;
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
    const handleApiCall = async ( apiCall = null, args = null, {
        onSuccess = null,
        redirectPath = null,
        onError = null,
        onFinally = null
    } = {} ) => {
        try {

            if ( !apiCall || !validateParam( apiCall, 'function', 'API Call' ) ) {
                showToast( 'API Call is reqired', "error" );
                return null;
            }
            validateParam( onSuccess, 'function', 'onSuccess' );
            validateParam( onError, 'function', 'onError' );
            validateParam( onFinally, 'function', 'onFinally' );
            validateParam( redirectPath, 'string', 'redirectPath' );

            const rawResult = await apiCall( args );
            const response =
                typeof rawResult?.unwrap === "function"
                    ? await rawResult.unwrap()
                    : rawResult;
                    
            if ( onSuccess ) showToast( onSuccess( response ), "success" );
            if ( redirectPath ) navigate( redirectPath );

            return response;
        } catch ( error ) {
            console.error( "API call error:", error );
            if ( onError ) showToast( onError( error ), "error" );
            return null;
        } finally {
            if ( onFinally ) onFinally();
        }
    };

    /**
     * Factory function to create mutation handlers.
     * @param {Function} mutationHook - The Redux mutation hook (e.g., useCreateCouponMutation).
     * @returns {Array} A tuple containing the mutation handler and loading state.
     */
    const handleMutation = ( mutationHook ) => {
        const [ mutation, ...rest ] = mutationHook();

        const handler = async ( arg, options ) => {
            return handleApiCall( mutation, arg, options );
        };

        return [ handler, ...rest ];
    };

    return [ handleMutation, handleApiCall ];
};

export default useApiHandler;
