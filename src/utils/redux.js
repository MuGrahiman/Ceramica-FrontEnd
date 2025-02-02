/* utils/redux*/

import { APP } from "../constants/app";

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
export const prepareHeaders = (headers) => {
    const jsonValue = localStorage.getItem(APP);
    if (jsonValue) {
        try {
            const { token } = JSON.parse(jsonValue);
            if (token) {
                console.log("🚀 ~ prepareHeaders ~ token:", token);
                headers.set("Authorization", `Bearer ${token}`);
            }
        } catch (error) {
            console.error("Failed to parse APP data from localStorage:", error);
        }
    } else {
        console.warn("No APP data found in localStorage.");
    }
    console.log(headers); // Ensure headers include Authorization
    return headers;
};
;
