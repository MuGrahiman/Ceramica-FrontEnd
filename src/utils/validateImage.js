const allowedTypes = [ "image/jpeg", "image/png", "image/jpg" ];

// Validate file type and size
export const validateFile = ( file ) => {
    if ( !file ) return "Please upload a file.";
    if ( !file.type.startsWith( "image/" ) ) return "Only image files are allowed.";
    if ( !allowedTypes.includes( file.type ) )
        return "Accepted formats: JPEG, JPG, PNG.";
    return true;
};
