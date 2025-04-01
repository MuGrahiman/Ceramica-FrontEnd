import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useApiHandler = () => {
    const navigate = useNavigate();
    const showToast = useToast();
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
    const handleApiCall = async ( apiCall, args = null, {
        onSuccess = null,
        redirectPath = null,
        onError = null,
        onFinally = null
    } = {} ) => {
        try {
            // apiCall validation
            if ( typeof apiCall !== 'function' ) {
                const error = "Invalid API call";
                showToast( error, "error" );
                return null;
            }

            // Parameter validation
            if ( onSuccess !== null && typeof onSuccess !== 'function' ) {
                const error = "Invalid onSuccess: expected a function.";
                showToast( error, "error" );
            }

            if ( redirectPath !== null && typeof redirectPath !== 'string' ) {
                const error = "Invalid redirectPath: expected a string.";
                showToast( error, "error" );
            }

            if ( onError !== null && typeof onError !== 'function' ) {
                const error = "Invalid onError: expected a function.";
                showToast( error, "error" );
            }


            const res = await apiCall( args ).unwrap();

            // Show success toast
            if ( onSuccess ) {
                showToast( onSuccess(res), "success" );
            }

            // Navigate to redirect path if specified
            if ( redirectPath ) {
                navigate( redirectPath );
            }
            // Return a success object, including the API result
            return res;
        } catch ( error ) {
            console.error( "API call error:", error );

            // Show error toast
            if ( onError ) {
                showToast( onError( error ), "error" );
            }
            return null; // Better to provide an error object
        } finally {
            // Call the external finally logic if provided
            if ( onFinally && typeof onFinally === 'function' ) {
                onFinally();
            }
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
