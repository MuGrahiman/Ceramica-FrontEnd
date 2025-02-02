import axios from "axios";

export const queryAxiosInstance = axios.create( {
    baseURL: "http://localhost:5000",
    // headers: {
    //     "Content-Type": "application/json",
    // },
} );

export const cloudAxiosInstance  = axios.create( {
    baseURL: "https://api.cloudinary.com/v1_1",
} );