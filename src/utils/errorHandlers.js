/**
 * Extracts a user-friendly error message from an error object.
 * @param {Error|Object} error - The error object.
 * @param {string} fallbackMessage - The fallback message to display if the error message is not available.
 * @return {string} errorMessage - Return the error message.
 */
export const extractErrorMessage = ( error = {}, fallbackMessage = '' ) => {
    console.error( error );
    // Initialize errorMessage with the fallback message 
    let errorMessage = fallbackMessage || "Something went wrong.";

    // Check if error is an object
    if ( error && typeof error === 'object' ) {
        // Check for error.response.data.message 
        if ( error.response && typeof error.response === 'object' ) {
            if ( error.response.data ) {
                if ( typeof error.response.data === 'object' ) {
                    errorMessage = error.response.data.message || error.response.data;
                } else if ( typeof error.response.data === 'string' ) {
                    errorMessage = error.response.data;
                }
            }
            // Check for error.response.message
            if ( typeof error.response.message === 'string' ) {
                errorMessage = error.response.message;
            }
        }
        // Check for error.data
        if ( error.data ) {
            if ( typeof error.data === 'object' ) {
                errorMessage = error.data.message || error.data;
            } else if ( typeof error.data === 'string' ) {
                errorMessage = error.data;
            }
        }
        // Finally, check the error.message
        if ( typeof error.message === 'string' ) {
            errorMessage = error.message;
        }
    }

    return errorMessage;
};
