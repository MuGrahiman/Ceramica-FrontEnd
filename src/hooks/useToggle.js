import React, { useState } from 'react';

/**
 * Custom hook for handling multiple toggle functionality
 * @returns {Object} toggle functionality
 */
const useToggle = () => {
    const [ toggleIndexes, setToggleIndexes ] = useState( [] );

    const toggle = ( index ) => {
        setToggleIndexes( ( prevIndexes ) => {
            if ( prevIndexes.includes( index ) ) {
                // Remove the index if it's already added 
                return prevIndexes.filter( ( i ) => i !== index );
            } else {
                // Add the index 
                return [ ...prevIndexes, index ];
            }
        } );
    };

    /**
     * Checks if a given index is currently toggled
     * @param {string|number} index - Unique identifier to check
     * @returns {boolean} - Toggle state
     */
    const isToggled = ( index ) => toggleIndexes.includes( index );

    return [ toggle, isToggled, toggleIndexes ];
};


export default useToggle;
