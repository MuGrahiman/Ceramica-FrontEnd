import { useState } from 'react';

/**
 * Custom hook for validating and fetching color details from the Color API.
 * 
 * @returns {Object} Contains functions and states for validating color values.
 */
const useColorValidator = () => {
    const [ color, setColor ] = useState( "" );
    const [ colorLoading, setColorLoading ] = useState( false );
    const [ colorError, setColorError ] = useState( null );
    const [ colorSuccess, setColorSuccess ] = useState( false );

    /**
     * Validates the provided color value by fetching details from the Color API.
     * 
     * @param {string} value - The color value (hex code) to validate.
     */
    const validateColor = async ( value ) => {

        setColorError( null );
        setColorLoading( true );

        const trimmedValue = value.trim();

        if ( !trimmedValue ) {
        setColorLoading( false );
        setColorError( "Enter a valid value" );
            return;
        }


        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?hex=${ trimmedValue }&format=json`
            );
            const data = await response.json();

            if ( data.name && data.hex?.value ) {
                setColor( data.hex.value );
                setColorSuccess( true );
            } else {
                setColorError( "There is no color with this value" );
            }
        } catch ( error ) {
            console.error( "Error fetching color:", error );
            setColorError( "Error fetching color" );
        } finally {
            setColorLoading( false );
        }
    };

    /**
     * Resets the state of the hook to its initial values.
     */
    const resetState = () => {
        setColor( "" );
        setColorLoading( false );
        setColorError( null );
        setColorSuccess( false );
    };

    return {
        validateColor,
        color,
        colorLoading,
        colorError,
        colorSuccess,
        resetState,
    };
};

export default useColorValidator;
