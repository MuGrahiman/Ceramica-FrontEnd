import { useState } from 'react';

/**
 * Custom hook for validating and fetching color details from the Color API.
 * 
 * @returns {Object} Contains functions and states for validating color values.
 */
const useColorValidator = ( defaultColor ) => {
    const [ colorData, setColor ] = useState( defaultColor );//{ image: null, name: "", hex: "" }
    const [ colorLoading, setColorLoading ] = useState( false );
    const [ colorError, setColorError ] = useState( null );
    const [ colorSuccess, setColorSuccess ] = useState( false );

    /**
     * Validates the provided color value by fetching details from the Color API.
     * 
     * @param {string} value - The color value (hex code) to validate.
     */
    const validateColor = async ( value, { onSuccess, onError } ) => {
        setColorError( null );
        setColorLoading( true );

        const trimmedValue = value.trim();

        if ( !trimmedValue ) {
            setColorLoading( false );
            setColorError( "Enter a valid value" );
            if ( onError instanceof Function ) onError( "Enter a valid value" )
            return;
        }


        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?hex=${ trimmedValue }&format=json`
            );
            const data = await response.json();
            // const {image.bare , name.value, hex.clean  } = data 
            if ( data && data.name.value && data.hex?.clean && data.image.bare ) {
                const colorData = { image: data.image.bare, name: data.name.value, hex: data.hex.clean }
                setColor( colorData );
                setColorSuccess( true );
                if ( onSuccess instanceof Function ) onSuccess( colorData )
            } else {
                setColorError( "There is no color with this value" );
                if ( onError instanceof Function ) onError( "There is no color with this value" )
            }
        } catch ( error ) {
            console.error( "Error fetching color:", error );
            setColorError( "Error fetching color" );
            if ( onError instanceof Function ) onError( "Error fetching color" )
        } finally {
            setColorLoading( false );
        }
    };

    /**
     * Resets the state of the hook to its initial values.
     */
    const resetColor = () => {
        setColor( "" );
        setColorLoading( false );
        setColorError( null );
        setColorSuccess( false );
    };

    return {
        validateColor,
        colorData,
        colorLoading,
        colorError,
        colorSuccess,
        resetColor,
    };
};

export default useColorValidator;
