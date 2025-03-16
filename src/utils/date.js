export const setDateAsDayMonthYear = ( dateString ) => {
    const date = new Date( dateString );
    const day = String( date.getDate() ).padStart( 2, '0' );
    const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
    const year = date.getFullYear();

    return `${ day }/${ month }/${ year }`; // Returns  DD-MM-YYYY
};

export const setDateAsMonthDayYear = ( dateString ) => {
    const date = new Date( dateString );
    return date?.toISOString().split( "T" )[ 0 ]; // Returns MM-DD-YYYY
};

/**
 * Utility function to get the current date or convert a value to a Date object.
 * 
 * @param {string|number|null} value - The value to convert to a Date. If no value is provided, 
 *                                      the current date will be returned.
 * @returns {Date} - A Date object representing the current date or the converted date.
 * @throws {Error} - Throws an error if the provided value cannot be converted to a valid Date.
 */
export const getDate = ( value = null ) => {
    // If value is null or undefined, return the current date
    if ( value === null || value === undefined ) {
        return new Date();
    }

    // Ensure the value is a string or a number before attempting to convert
    if ( typeof value !== 'string' && typeof value !== 'number' ) {
        throw new Error( 'Date Value must be a string or a number' );
    }

    // Attempt to convert the provided value to a Date object
    const date = new Date( value );

    // Check if the conversion was successful
    if ( isNaN( date.getTime() ) ) {
        throw new Error( 'Invalid date value provided' );
    }

    return date;
}

