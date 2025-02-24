/**
 * Handles an error and displays a toast message.
 * @param {Error|Object} error - The error object.
 * @param {string} fallbackMessage - The fallback message to display if the error message is not available.
 * @param {function} showToast - Function to display toast messages.
 */
export const handleAndShowError = ( error, fallbackMessage, showToast ) => {
    console.error( error );

    // Extract the error message from the error object
    const errorMessage = error.message ||
        ( error.data && error.data.message ) ||
        ( error.response && error.response.data.message ) ||
        fallbackMessage ||
        "Something went wrong.";

    if ( showToast && typeof showToast === 'function' ) showToast( errorMessage, 'error' );
};