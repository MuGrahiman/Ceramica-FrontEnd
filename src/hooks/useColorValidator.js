import { useState } from 'react';

const useColorValidator = () => {
    const [color, setColor] = useState('');
    const [colorLoading, setColorLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isColorSuccess, setIsColorSuccess] = useState(false);

    const validateColor = async (value) => {
        const trimmedValue = value.trim();

        // Check if the value is empty
        if (!trimmedValue) {
            setError("Enter a valid value");
            return; // Exit early if the value is invalid
        }

        // Clear previous errors if input is valid
        setError(null);
        setColorLoading(true);

        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?hex=${trimmedValue}&format=json`
            );
            const data = await response.json();

            // Check if the response contains valid color data
            if (data.name && data.hex.value) {
                setColor(data.hex.value); // Set the color to the hex value
                setIsColorSuccess(true);
            } else {
                // Set an error if the fetch is successful but no color is found
                setError("There is no color with this value");
            }
        } catch (error) {
            console.error("Error fetching color:", error);
            setError("Error fetching color"); // Set error for fetch failure
        } finally {
            setColorLoading(false); // Ensure colorLoading state is cleared
        }
    };

    return { color, colorLoading, error, isColorSuccess, validateColor };
};

export default useColorValidator;
