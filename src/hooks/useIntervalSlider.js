import { useEffect, useState } from 'react';

/**
 * Custom hook for managing a slider that changes at a specified interval.
 *
 * @param {number} length - The number of slides in the slider.
 * @param {number} interval - The duration (in milliseconds) for which each slide is displayed.
 * @returns {[number, function]} - Returns the current slide index and a function to set the slide index manually.
 */
const useIntervalSlider = ( length = 0, interval = 100 ) => {
    const [ currentSlide, setCurrentSlide ] = useState( 0 );

    useEffect( () => {
        // Only set up the interval if there are slides
        if ( length > 0 ) {
            const slideInterval = setInterval( () => {
                setCurrentSlide( ( prev ) => ( prev + 1 ) % length );
            }, interval );

            // Clear the interval on component unmount or when length changes
            return () => clearInterval( slideInterval );
        }
    }, [ length, interval ] );

    return [ currentSlide, setCurrentSlide ];
};

export default useIntervalSlider;
