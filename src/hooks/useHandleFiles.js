import React, { useState } from "react";
import { validateFile } from "../utils/fileHandler";
import { removeFile, uploadFile } from "../utils/cloudinary";

/**
 * Custom hook to handle image uploads and removals.
 * 
 * @returns {Object} An object containing loading state and functions to handle file change and removal.
 */
const useHandleFiles = () => {
    const [ fileLoading, setFileLoading ] = useState( {} );

    // Utility: Set loading state
    const updateLoadingState = ( label, isLoading ) =>
        setFileLoading( ( prev ) => ( { ...prev, [ label ]: isLoading } ) );

    const validateParams = ( { clearErrors, onError } ) => {
        if ( clearErrors && typeof ( clearErrors ) !== "function" )
            clearErrors();
        if ( !onError || typeof ( onError ) !== "function" )
            throw new Error( 'Please provide the error functionality ' )
    }
    
    const validateSuccess = ( onSuccess ) =>
        ( onSuccess && typeof ( onSuccess ) === "function" ) &&
        onSuccess();

    /**
     * Handles file change events for uploading images.
     * 
     * @param {Object} params - The parameters for handling file changes.
     * @param {string} params.label - Text label for the field.
     * @param {FileList} params.files - Files (e.g., e.target.files).
     * @param {Function} params.clearErrors - Function to clear existing errors.
     * @param {number} [params.maxFiles=1] - Maximum number of files allowed.
     * @param {Array} [params.currentFields=[]] - Current uploaded files.
     * @param {Function} params.onSuccess - Callback on successful upload.
     * @param {Function} params.onError - Callback to handle errors.
     * @param {Function} params.appendData - Function to append valid data.
     */
    const handleFileChange = async ( {
        label,
        files,
        clearErrors = null,
        maxFiles = 1, minFile = 1,
        currentFields = [],
        onSuccess,
        onError,
        appendData,
    } ) => {
        await validateParams( { clearErrors, onError } )
        // Set loading state for the specific label
        updateLoadingState( label, true )
        if ( !files || !files.length ) {
            updateLoadingState( label, false )
            return onError( "Please upload a file." );
        }

        const filesData = Array.from( files );
        // Check max file limit for multiple uploads
        if ( currentFields.length + filesData.length > maxFiles ) {
            updateLoadingState( label, false )
            return onError( `Only ${ maxFiles } files are allowed.` );
        }

        for ( const file of filesData ) {
            const validity = validateFile( file );
            if ( validity !== true ) {
                updateLoadingState( label, false )
                return onError( validity );
            }
        }
        // Process files 
        const results = await Promise.all(
            filesData.map( async ( file ) => {
                return uploadFile( file )
                    .then( async ( response ) => {
                        if ( !response ) {
                            onError( "Server error" );
                            return false;
                        }
                        await appendData( response );
                        return true;
                    } )
                    .catch( () => {
                        onError( "Upload failed" );
                        return false;
                    } );
            } )
        );

        // Check if all files are successfully processed

        if ( results.every( Boolean ) )
            validateSuccess( onSuccess )

        // Reset loading state for the specific label
        updateLoadingState( label, false )
    };

    /**
     * Handles the removal of a file by its public ID.
     * 
     * @param {Object} params - The parameters for the file removal.
     * @param {string} params.label - Text label for the field.
     * @param {string} params.publicId - The public ID of the file to remove.
     * @param {Function} params.clearErrors - Function to clear existing errors.
     * @param {Function} params.onSuccess - Callback invoked on successful removal.
     * @param {Function} params.onError - Callback invoked on error.
     */
    const handleFileRemove = async ( {
        label,
        publicId,
        clearErrors,
        onSuccess,
        onError,
    } ) => {
        // Set loading state to true
        updateLoadingState( label, true )
        // Clear any existing errors for the field
        await validateParams( { clearErrors, onError } )


        // Validate publicId
        if ( !publicId ) {
            onError( "Invalid ID provided." );
            updateLoadingState( label, false )
            return; // Exit early if publicId is not valid
        }



        try {
            // Attempt to remove the image
            const isImageRemove = await removeFile( publicId );

            // Set loading state to false after the operation
            // updateLoadingState( label, false )

            // Call the appropriate callback based on the result
            if ( isImageRemove ) {
                validateSuccess( onSuccess )
            } else {
                onError( "Failed to remove the image. Please try again." );
            }
        } catch ( error ) {
            // Handle unexpected errors
            console.error( " useHandleFiles  error:", error )
            onError( `An error occurred: ${ error.message }` );
        } finally {

            updateLoadingState( label, false )

        }
    };

    return { fileLoading, handleFileChange, handleFileRemove };
};

export default useHandleFiles;
