import { useState } from 'react';

/**
 * Custom hook for validating and fetching color details from the Color API.
 *
 * @param {string} defaultColor - The initial color value (hex code).
 * @returns {Object} Contains functions and states for validating color values.
 */
const useColorValidator = (defaultColor) => {
    const [colorValue, setColor] = useState(defaultColor); // { image: null, name: "", hex: "" }
    const [colorLoading, setColorLoading] = useState(false);
    const [colorError, setColorError] = useState(null);
    const [colorSuccess, setColorSuccess] = useState(false);

    /**
     * Validates the provided color value by fetching details from the Color API.
     *
     * @param {string} value - The color value (hex code) to validate.
     * @param {Object} callbacks - Callback functions for success and error handling.
     * @param {Function} callbacks.onSuccess - Function to call on successful color validation.
     * @param {Function} callbacks.onError - Function to call on failed color validation.
     */
    const validateColor = async (value, { onSuccess, onError }) => {
        setColorError(null);
        setColorLoading(true);

        const trimmedValue = value.trim();

        // Early return if the trimmed value is empty
        if (!trimmedValue) {
            setColorLoading(false);
            setColorError("Enter a valid value");
            if (typeof onError === 'function') onError("Enter a valid value");
            return;
        }

        try {
            const response = await fetch(`https://www.thecolorapi.com/id?hex=${trimmedValue}&format=json`);
            const data = await response.json();

            // Check if the data has the necessary properties
            if (data && data.name?.value && data.hex?.clean && data.image?.bare) {
                const newColorValue = { image: data.image.bare, name: data.name.value, hex: data.hex.clean };
                setColor(newColorValue);
                setColorSuccess(true);
                if (typeof onSuccess === 'function') onSuccess(newColorValue);
            } else {
                setColorError("There is no color with this value");
                if (typeof onError === 'function') onError("There is no color with this value");
            }
        } catch (error) {
            console.error("Error fetching color:", error);
            setColorError("Error fetching color");
            if (typeof onError === 'function') onError("Error fetching color");
        } finally {
            setColorLoading(false);
        }
    };

    /**
     * Resets the state of the hook to its initial values.
     */
    const resetColor = () => {
        setColor(""); 
        setColorLoading(false);
        setColorError(null);
        setColorSuccess(false);
    };

    return {
        validateColor,
        colorValue,
        colorLoading,
        colorError,
        colorSuccess,
        resetColor,
    };
};

export default useColorValidator;
