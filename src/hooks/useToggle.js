import React, { useState } from 'react';

// Custom hook for handling single toggle functionality
const useHandleSingleToggle = () => {
    const [ toggleIndex, setToggleIndex ] = useState( null );

    const toggle = ( index ) => {
        setToggleIndex( ( prevIndex ) => ( prevIndex === index ? null : index ) );
    };

    const isToggled = ( index ) => toggleIndex === index;

    return [ toggle, isToggled, toggleIndex ];
};

// Custom hook for handling multiple toggle functionality
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

// Main toggle hook that decides which toggle hook to use
const useHandleToggle = ( { multiple = false } ) => {

    const singleToggle = useHandleSingleToggle();
    const multipleToggle = useHandleMultipleToggle();

    return multiple ? multipleToggle : singleToggle;
};

export default useHandleToggle;

