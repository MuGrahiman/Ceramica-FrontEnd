import React, { useState } from 'react';

/**
 * Custom hook for handling multiple toggle functionality with default values
 * @param {Object} initialState - An object containing keys and their default boolean values
 * @returns {Array} - An array containing toggle function, isToggled function, and current state
 */
const useToggle = ( initialState = {} ) => {
    // Validate initialState to ensure all values are booleans
    Object.entries( initialState ).forEach( ( [ key, value ] ) => {
        if ( typeof value !== 'boolean' ) {
            console.error( `Invalid type for key "${ key }" value: expected boolean, received ${ typeof value }` );
        }
    } );

    const [ toggleState, setToggleState ] = useState( initialState );

    /**
     * Retrieves the current value of a specific toggle key.
     * If the key does not exist, it returns false by default.
     * 
     * @param {string} key - The unique identifier for the toggle.
     * @returns {boolean} - The current value of the toggle (true or false).
     */
    const getValue = ( key ) => key in toggleState ? toggleState[ key ] : false;

    /**
     * Toggles the specific key.     
     * @param {string} key - The unique identifier for the toggle.
     * @param {boolean|null} value - The specific value to set (if provided).
     * If null, the current value will be toggled (switched to the opposite).
     */
    const toggle = ( key = '', value = null ) => {
        if ( !key ) {
            console.error( "Key must be provided to toggle." );
            return;
        }

        setToggleState( ( prevState ) => {
            const currentValue = getValue( key );
            const newValue = value !== null && typeof value === 'boolean' ? value : !currentValue;

            return {
                ...prevState,
                [ key ]: newValue,
            };
        } );
    };

    /**
     * Checks if a given key is currently toggled (true or false).
     * 
     * @param {string} key - The unique identifier for the toggle.
     * @returns {boolean} - The current state of the toggle (true or false).
     */
    const isToggled = ( key ) => getValue( key );

    return [ toggle, isToggled, toggleState ];
};

export default useToggle;
