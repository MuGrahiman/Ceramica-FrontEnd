import React, { useState } from 'react';

/**
 * Custom hook for handling multiple toggle functionality
 * @returns {Object} toggle functionality
 */
const useHandleMultipleToggle = () => {
    const [ toggleIndexes, setToggleIndexes ] = useState( [] );

    const toggle = ( index ) => {
        setToggleIndexes( ( prevIndexes ) => {
            if ( prevIndexes.includes( index ) ) {
                // Close the toggle if it's already open 
                return prevIndexes.filter( ( i ) => i !== index );
            } else {
                // Open the toggle
                return [ ...prevIndexes, index ];
            }
        } );
    };

    const isToggled = ( index ) => toggleIndexes.includes( index );

    return [ toggle, isToggled, toggleIndexes ];
};

/**
 * Main toggle hook that decides which toggle hook to use
 * Currently supports multiple toggles
 * @returns {Object} toggle functionality
 */
const useToggle = () => {
    return useHandleMultipleToggle();
};

export default useToggle;
