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