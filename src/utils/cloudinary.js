import CryptoJS from "crypto-js";
import { cloudAxiosInstance } from "./axiosInstance";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

// const cloudAxios = axiosInstance.defaults.baseURL = `/${ cloudName }`;

/**
 * Uploads a file to Cloudinary.
 * 
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<Object|null>} The response data from Cloudinary or null if the upload fails.
 */
export const uploadFile = async ( file ) => {
    if ( !file ) return null;

    const formData = new FormData();
    formData.append( "file", file );
    formData.append( "upload_preset", uploadPreset );

    try {
        // const response = await axios.post(
        //     `https://api.cloudinary.com/v1_1/${ cloudName }/image/upload`,
        //     formData
        // );
        const response = await cloudAxiosInstance.post(
            `/${ cloudName }/image/upload`,
            formData
        );
        return response?.status === 200 ? response.data : null;
    } catch ( error ) {
        console.error( "Image upload error:", error?.message || error );
        return null;
    }
};

/**
 * Generates a signature for Cloudinary API requests.
 * 
 * @param {string} apiSecret - The API secret for Cloudinary.
 * @param {number} timestamp - The current timestamp.
 * @param {string} publicId - The public ID of the image.
 * @returns {string} The generated SHA1 signature.
 */
const generateSignature = ( apiSecret, timestamp, publicId ) => {
    const paramsToSign = `public_id=${ publicId }&timestamp=${ timestamp }${ apiSecret }`;
    return CryptoJS.SHA1( paramsToSign ).toString( CryptoJS.enc.Hex );
};

/**
 * Removes an image from Cloudinary by its public ID.
 * 
 * @param {string} publicId - The public ID of the image to remove.
 * @returns {Promise<boolean>} True if removal was successful, false otherwise.
 */
export const removeFile = async ( publicId ) => {
    if ( !publicId ) return null;
    try {

        const timestamp = Math.floor( Date.now() / 1000 );
        const signature = generateSignature( apiSecret, timestamp, publicId );

        // const response = await axios.post(
        //     `https://api.cloudinary.com/v1_1/${ cloudName }/image/destroy`,
        //     {
        //         public_id: publicId,
        //         api_key: apiKey,
        //         timestamp: timestamp,
        //         signature: signature,
        //     }
        // );
        const response = await cloudAxiosInstance.post(
            `/${ cloudName }/image/destroy`,
            {
                public_id: publicId,
                api_key: apiKey,
                timestamp: timestamp,
                signature: signature,
            }
        );
        return response.status === 200;
    } catch ( error ) {
        console.error( "Error removing image:", error );
        return false;
    }
};
