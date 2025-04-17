import React, { useState } from 'react';

/**
 * Custom hook to track and manage error states for operations.
 * 
 * @param {object} options - Options for initializing the error state.
 * @param {function} options.setError - The setError function from React Hook Form.
 * @param {object} options.defaultErrorValue - Initial error state as an object where keys are labels and values are error messages.
 * @returns {[object, function]} An array with the current error state and a function to update it.
 */
const useErrorManager = ( { setError = null, defaultErrorValue = {} } ) => {
    const [ isError, setIsError ] = useState( defaultErrorValue );

    /**
     * Utility function to set custom error messages.
     *
     * @param {string} label - Key for the error state to update.
     * @param {string} message - Custom error message.
     */
    const setCustomError = ( label = null, message = '' ) => {
        if ( !label ) throw new Error( 'Please provide the label for set error' );
        // Update local error state
        setIsError( ( prev ) => ( {
            ...prev,
            [ label ]: message,
        } ) );
        // Use setError from React Hook Form
        if ( setError )
            setError( label, { type: 'custom', message } );
    };

    const resetErrors = () => {
        setIsError( defaultErrorValue );
        // Optionally reset errors in React Hook Form
        Object.keys( defaultErrorValue ).forEach( ( label ) => {
            if ( setError )
                setError( label, { type: 'reset' } );
        } );
    };

    return [ isError, setCustomError, resetErrors ];
};

export default useErrorManager;
