import React, { useCallback, useMemo, useState } from 'react';


/**
 * Custom hook for managing multiple toggle states with default values.
 * @param {Object} initialState - An object containing keys and their default boolean values.
 * @returns {Array} - An array containing:
 *   - `toggleValue` (function): A function to toggle the current value of a specified key.
 *   - `getValue` (function): A function to retrieve the current value of a specified key (boolean).
 *   - `resetValues` (function): A function to reset the values of all keys to the initial values or to a specified values.
 *   - `toggleState` (Object): The current toggle states (object) .
 */

const useMultiToggler = ( initialState = {} ) => {
    // Validate initialState to ensure all values are booleans
    const validateBooleanValues = useCallback( ( state ) => {
        Object.entries( state ).forEach( ( [ key, value ] ) => {
            if ( typeof value !== 'boolean' ) {
                throw new Error( `Invalid type for key "${ key }" value: expected boolean, received ${ typeof value }` );
            }
        } );
    }, [] );

    // Validate only on initial mount
    React.useEffect( () => {
        validateBooleanValues( initialState );
    }, [ initialState, validateBooleanValues ] );
    const [ toggleState, setToggleState ] = useState( initialState );

    /**
     * Retrieves the current value of a specific toggle key.
     * If the key does not exist, it returns false by default.
     * 
     * @param {string} key - The unique identifier for the toggle.
     * @returns {boolean} - The current value of the toggle (true or false).
     */
    const getValue = useCallback( ( key ) => {
        return key in toggleState ? toggleState[ key ] : false;
    }, [ toggleState ] );

    /**
     * Gets all keys that are currently toggled on  
     */
    const getToggledKeys = useCallback(() => {
        return Object.keys(toggleState).filter(key => toggleState[key] === true);
    }, [toggleState]);

    /**
     * Gets the first key that is currently toggled on
     */
    const firstToggledKey = useMemo(() => {
        return Object.keys(toggleState).find(key => toggleState[key] === true);
    }, [toggleState]);
    /**
     * Directly sets a specific key to a boolean value
     */
    const setValue = useCallback((key, value) => {
        if (typeof value !== 'boolean') {
            console.error("useMultiToggler.setValue: Value must be a boolean");
            return;
        }
        
        setToggleState(prevState => ({
            ...prevState,
            [key]: value
        }));
    }, []);
    /**
     * Toggles the specific key.     
     * @param {string} key - The unique identifier for the toggle.
     * @param {boolean|null} value - The specific value to set (if provided).
     * If null, the current value will be toggled (switched to the opposite).
     */
    const toggleValue = useCallback( ( key = '', value = null ) => {
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
    }, [ getValue ] );

    /**
     * Resets the toggle states based on the provided newState object.
     * If newState is empty, resets all toggles to their initial values.
     * 
     * @param {Object} newState - An object containing keys and their new boolean values.
     */
    const resetValues = useCallback( ( newState = {} ) => {

        validateBooleanValues( newState );

        setToggleState( ( prevState ) => ( {
            ...prevState,
            ...newState,
        } ) );
    }, [ validateBooleanValues ] );

    return [ toggleValue, getValue, resetValues, toggleState ];
};

export default useMultiToggler;

/**
 * Custom hook for managing a single toggle state with default values.
 *
 * @param {boolean} initialState - The initial state of the toggle. Defaults to `false`.
 * @returns {Array} - An array containing:
 *   - `isToggled`: The current toggle state (boolean).
 *   - `toggle`: A function to toggle the current state.
 *   - `openToggle`: A function to set the state to `true`.
 *   - `closeToggle`: A function to set the state to `false`.
 *   - `reset`: A function to reset the state to the initial value.
 */
export const useMiniToggler = ( initialState = false ) => {
    // State to keep track of the toggle status, initialized to the provided initialState
    const [ isToggled, setIsToggled ] = useState( !!initialState );

    // Function to toggle the current state or set it to a specific boolean value
    const toggle = useCallback( ( value = null ) => {
        setIsToggled( prev =>
            value !== null && typeof value === 'boolean' ? value : !prev
        );
    }, [] );

    // Function to set the toggle state to true
    const openToggle = useCallback( () => setIsToggled( true ), [] );

    // Function to set the toggle state to false
    const closeToggle = useCallback( () => setIsToggled( false ), [] );

    // Function to reset the state to the initial value
    const reset = useCallback( () => setIsToggled( !!initialState ), [ initialState ] );

    return [ isToggled, toggle, openToggle, closeToggle, reset ];
};
