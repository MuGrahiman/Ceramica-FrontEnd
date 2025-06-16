import { FALL_BACK_IMAGE } from "../constants/app";

const allowedTypes = [ "image/jpeg", "image/png", "image/jpg",
    "upload/jpeg", "upload/png", "upload/jpg" ];

// Validate file type and size
export const validateFile = ( file ) => {
    if ( !file ) return "Please upload a file.";
    if ( !file.type || !( file.type.startsWith( "image/" ) || file.type.startsWith( "upload/" ) ) ) return "Only image files are allowed.";
    if ( !allowedTypes.includes( file.type ) )
        return "Accepted formats: JPEG, JPG, PNG.";
    return true;
};

export const handleFieldsValidation = ( fields ) => {
    const validationMessages = {
        required: "Images are required.",
        min: "Minimum 3 images needed.",
        max: "Maximum 5 images allowed.",
    };

    if ( !fields ||!fields.length ) {
        return validationMessages.required;
    }

    if ( fields.length < 3 ) {
        return validationMessages.min;
    }

    if ( fields.length > 5 ) {
        return validationMessages.max;
    }
    for ( let index = 0; index < fields.length; index++ ) {
        const result = validateFile( fields[ index ] );

        if ( result !== true ) return result;
    }
    return true;
};
//  Iterate files & validate
export const iterateFiles = ( files ) => {
  
    if ( !files || !files.length ) {
        return "Upload file";
    }
    for ( let index = 0; index < files.length; index++ ) {
        const result = validateFile( files[ index ] );

        if ( result !== true ) return result;
    }

    return true;
}

export const handleFileError = (e) => {
    e.target.src = FALL_BACK_IMAGE;
};
