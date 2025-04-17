import React, { useState } from 'react'

/**
 * Custom hook to track and manage success states for operations.
 * 
 * @param {object} options - Options for initializing the success state.
 * @param {object} options.defaultSuccessValue - Initial success state as an object where keys are labels and values are booleans.
 * @returns {[object, function]} An array with the current success state and a function to update it.
 */
const useSuccessManager = ( { defaultSuccessValue = {} } ) => {
    const [ isSuccess, setIsSuccess ] = useState( defaultSuccessValue );

    /**
     * Updates the success state for a specific label.
     *
     * @param {string} label - Key for the success state to update.
     * @param {boolean} isSucceed - Boolean indicating whether the operation was successful.
     */
    const setSuccess = ( label = null, isSucceed = false ) => {
        if ( !label ) throw new Error( 'Please provide the label for set success' )
        setIsSuccess( ( prev ) => ( {
            ...prev,
            [ label ]: isSucceed,
        } ) );
    }

    const resetSuccess = () => setIsSuccess( defaultSuccessValue );

    return [ isSuccess, setSuccess, resetSuccess ]
}

export default useSuccessManager
