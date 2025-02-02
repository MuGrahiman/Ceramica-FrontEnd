
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";
import { paramsSerializer } from "./paramsSerializer";
import { prepareHeaders } from "./prepareHeaders";
import { removeUser } from "../store";

export const axiosBaseQuery =
    ( { baseUrl } = { baseUrl: '' } ) =>
        async ( argData, { dispatch } ) => {
            console.log("🚀 ~ argData:", argData)
            const { url, method, body, params, headers } = argData
            console.log( "🚀 ~ url, method, body, params, headers :", url, method, body, params, headers )
            try {
                // Prepare headers using the prepareHeaders function
                const headerValue = headers || new Headers()
                const preparedHeaders = prepareHeaders( { ...headerValue } );
                // await axiosInstance.get( "http://localhost:5000" + baseUrl + url )
                //     .then( res => console.log( res ) )
                //     .catch( err => console.error( err ) );

                const result = await axiosInstance( {
                    url: baseUrl + url,
                    method,
                    data: body,
                    params: params,
                    headers: preparedHeaders,
                    withCredentials: true, // Set withCredentials based on the provided option
                } );
                return result;
            } catch ( axiosError ) {
                const err = axiosError;
                console.error( "Axios Error:", {
                    message: err.message,
                    stack: err.stack,
                    status: err.status,
                } );
                // Handle specific error statuses
                if ( err.response?.status === 401 ) {
                    // Token expired or unauthorized access
                    dispatch( removeUser() ); // Dispatch logout action to clean session
                    alert( "Your session has expired. Please log in again." ); // Show toast notification
                    // window.location.href = '/login'; // Redirect to login page (optional)
                }
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };


