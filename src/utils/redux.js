/* utils/redux*/

// Custom paramsSerializer function for query parameter serialization
export const paramsSerializer = ( params ) => {
    const searchParams = new URLSearchParams();
    Object.entries( params ).forEach( ( [ key, value ] ) => {
        if ( Array.isArray( value ) ) {
            value.forEach( ( item ) => searchParams.append( `${ key }[]`, item ) );
        } else {
            searchParams.append( key, value );
        }
    } );
    return searchParams.toString();
};

// Custom header function for handling token
export const prepareHeaders = ( headers ) => {
    const token = localStorage.getItem( "token" );
    if ( token ) {
        headers.set( "Authorization", `Bearer ${ token }` );
    }
    return headers;
};