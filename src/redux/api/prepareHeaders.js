import { APP } from "../../constants/app";

// Custom header function for handling token
export const prepareHeaders = ( headers = {} ) => {
    if ( typeof headers !== 'object' ) {
        console.error( "Expected headers to be an object." );
        headers = {};
    }

    const jsonValue = localStorage.getItem( APP );
    if ( jsonValue ) {
        try {
            const { token } = JSON.parse( jsonValue );
            if ( token ) {
                // headers.set("Authorization", `Bearer ${token}`);
                headers[ "Authorization" ] = `Bearer ${ token }`;
            }
        } catch ( error ) {
            console.error( "Failed to parse APP data from localStorage:", error );
        }
    } else {
        console.warn( "No APP data found in localStorage." );
    }
    return headers;
};

