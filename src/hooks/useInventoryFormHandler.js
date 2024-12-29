import { useFieldArray, useForm } from "react-hook-form";
import useToast from "./useToast";
import { useEffect, useState } from "react";
import useHandleFiles from "./useHandleFiles";
import useColorValidator from "./useColorValidator";
import { handleFieldsValidation, iterateFiles } from "../utils/fileHandler";

/**
 * Custom hook to manage the inventory form.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Object} params.DEFAULT_VALUES - Default values for the form fields.
 * @param {Object} params.DEFAULT_SUCCESS_VALUE - Default success states for fields.
 * @param {Function} params.ON_SUBMIT - Function to handle form submission.
 * @param {boolean} params.LOADING - Loading state for form submission.
 * @returns {Object} Hook functions and states for managing the form.
 */
const useInventoryFormHandler = ( { DEFAULT_VALUES, DEFAULT_SUCCESS_VALUE, ON_SUBMIT, LOADING } ) => {
    const [ isSuccess, setIsSuccess ] = useState( DEFAULT_SUCCESS_VALUE );

    // Form Hook Configuration
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        setError,
        clearErrors,
        register,
        formState: { errors, isDirty, isSubmitting, isValid },
    } = useForm( {
        defaultValues: DEFAULT_VALUES
    } );

    // Field Array for File Management
    const { fields, append, remove } = useFieldArray( {
        control,
        name: "files",
    } );

    // Custom Hooks
    const showToast = useToast();
    const { handleFileChange, handleFileRemove, fileLoading } = useHandleFiles();
    const {
        validateColor,
        colorValue,
        colorLoading,
        colorError,
        colorSuccess,
        resetColor
    } = useColorValidator( DEFAULT_VALUES.color );

    // Utility function to set custom error messages
    const setErrorFn = ( label, message ) =>
        setError( label, { type: "custom", message: message } );

    // Utility function to set success state for fields
    const setSuccessFn = ( label, isSucceed ) =>
        setIsSuccess( ( prev ) => ( {
            ...prev,
            [ label ]: isSucceed,
        } ) );

    // Function to handle color input and validate it
    const onColorAdd = () => {
        const inputColor = getValues( 'colorInput' );
        clearErrors( "colorInput" );
        validateColor( inputColor, { onError: ( error ) => setErrorFn( 'colorInput', error ) } );
    };

    // Effect to handle the images' success state based on file count
    useEffect( () => {
        setSuccessFn( "images", fields.length > 2 && !errors[ "images" ] );
    }, [ errors, fields ] );

    // Effect to update the color field values in the form
    useEffect( () => {
        setValue( "color", {
            name: colorValue.name,
            hex: colorValue.hex,
            image: colorValue.image,
        } );

        setSuccessFn( "colorInput",
            colorValue.name &&
            colorValue.hex &&
            colorValue.image &&
            !errors[ "colorInput" ]
        );
    }, [ colorValue, errors ] );

    // Function to handle removing a single file by its public ID
    const onFileRemove = ( id ) => handleFileRemove( {
        label: "image",
        publicId: id,
        clearErrors: () => clearErrors( "image" ),
        onSuccess: () => {
            setValue( "file", null );
            setSuccessFn( 'image', false );
        },
        onError: ( error ) => setErrorFn( "image", error ),
    } );

    // Function to handle removing multiple files by their public ID
    const onFilesRemove = ( id, i ) => handleFileRemove( {
        label: "images",
        publicId: id,
        clearErrors: () => clearErrors( "images" ),
        onSuccess: () => {
            const images = getValues( "images" );
            const filteredImages = Array.from( images ).filter( ( _, index ) => index !== i );
            setValue( "images", { ...filteredImages } );
            remove( i );
        },
        onError: ( error ) => setErrorFn( "images", error ),
    } );

    // Handle form submission
    const handleForm = ( data ) => {
        clearErrors( "images" );
        const fieldsValidity = handleFieldsValidation( fields );

        if ( fieldsValidity !== true ) {
            return setErrorFn( "images", fieldsValidity );
        }

        // If form fields are valid, proceed with submission
        if ( isDirty && isValid ) {
            return ON_SUBMIT( data );
        } else {
            return showToast( "Please make changes", "info" );
        }
    };



    // Validation rules for form fields
    const validationRules = {
        // Image validation rules
        image: {
            required: "Image is required.",
            accept: ".jpeg, .jpg, .png",
            validate: ( value ) => getValues( "file" ) || value ? true : "Image is required.",
            onChange: ( e ) => handleFileChange( {
                label: "image",
                files: e.target.files,
                clearErrors: () => clearErrors( "image" ),
                maxFiles: 1,
                minFile: 1,
                currentFields: getValues( "file" ) ? [ getValues( "file" ) ] : [],
                onSuccess: () => setSuccessFn( "image", !errors[ "image" ] ),
                onError: ( error ) => setErrorFn( "image", error ),
                appendData: ( { public_id, url, type, format } ) =>
                    setValue( "file", { public_id, url, type: `${ type }/${ format }` } ),
            } ),
        },
        // Title validation rules
        title: {
            required: "Title is required.",
            minLength: {
                value: 3,
                message: "Title must be at least 3 characters long.",
            },
            onChange: ( e ) => {
                const value = e.target.value;
                clearErrors( "title" );
                setSuccessFn( "title", value.length >= 3 && !errors[ "title" ] );
            },
        },
        // Category validation rules
        category: {
            required: "Category is required.",
            validate: ( value ) => ( value && value !== "select" ) || "Please select an option",
            onChange: ( e ) => {
                const value = e.target.value;
                clearErrors( "category" );
                setSuccessFn( "category", value && !errors[ "category" ] );
            },
        },
        // Shape validation rules
        shape: {
            required: "Shape is required.",
            minLength: 3,
            onChange: ( e ) => {
                clearErrors( "shape" );
                const value = e.target.value;
                setSuccessFn( "shape", value.length > 2 && !errors[ "shape" ] );
            },
        },
        // Color validation rules
        colorInput: {
            required: "Color is required.",
            validate: ( value ) => value ? true : "Please select a color",
            onChange: () => clearErrors( "colorInput" ),
        },
        color: {
            hex: {
                required: "Color hex value is required.",
                validate: ( value ) => value ? true : "Please select a color hex value",
            },
            image: {
                required: "Color image is required.",
                validate: ( value ) => value ? true : "Please select a color image",
            },
            name: {
                required: "Color name is required.",
                validate: ( value ) => value ? true : "Please select a color name",
            },
        },
        // Dimension validation rules
        dimension: {
            required: "Dimension is required.",
            onChange: ( e ) => {
                clearErrors( "dimension" );
                const value = e.target.value;
                setSuccessFn( "dimension", value && !errors[ "dimension" ] );
            },
        },
        // Stock validation rules
        stock: {
            required: "Stock is required.",
            valueAsNumber: true,
            onChange: ( e ) => {
                clearErrors( "stock" );
                const value = e.target.value;
                setSuccessFn( "stock", value && !errors[ "stock" ] );
            },
        },
        // Size validation rules
        size: {
            required: "Size is required.",
            validate: ( value ) => ( value && value !== "select" ) || "Please select an option",
            onChange: ( e ) => {
                clearErrors( "size" );
                const value = e.target.value;
                setSuccessFn( "size", value && !errors[ "size" ] );
            },
        },
        // Status validation rules
        status: {
            required: "Status is required.",
            validate: ( value ) => ( value && value !== "select" ) || "Please select an option",
            onChange: ( e ) => {
                const value = e.target.value;
                clearErrors( "status" );
                setSuccessFn( "status", value && !errors[ "status" ] );
            },
        },
        // Price validation rules
        price: {
            required: "Price is required.",
            valueAsNumber: true,
            validate: value => value > 0 || 'Price must be greater than 0',
            onChange: ( e ) => {
                clearErrors( "price" );
                const value = e.target.value;
                setSuccessFn( "price", value && !errors[ "price" ] );
            },
        },
        // Description validation rules
        description: {
            required: "Description is required.",
            validate: ( value ) => value.trim().length >= 200 || "Description must be at least 200 characters long.",
            onChange: ( e ) => {
                clearErrors( "description" );
                const value = e.target.value;
                setSuccessFn( "description", value.trim().length >= 200 && !errors[ "description" ] );
            },
        },
        // Images validation rules
        images: {
            validate: ( files ) => files ? iterateFiles( files ) : handleFieldsValidation( fields ),
            onChange: ( e ) => handleFileChange( {
                label: "images",
                files: e.target.files,
                clearErrors: () => clearErrors( "images" ),
                maxFiles: 5,
                currentFields: fields,
                onSuccess: () => setSuccessFn( "images", fields.length > 2 && !errors[ "images" ] ),
                onError: ( error ) => setErrorFn( "images", error ),
                appendData: ( { public_id, url, type, format } ) =>
                    append( { public_id, url, type: `${ type }/${ format }` } ),
            } ),
        },
    };


    return {
        register,
        fields,
        errors,
        validationRules,
        isSuccess,
        fileLoading,
        setErrorFn,
        setSuccessFn,
        onFileRemove,
        onFilesRemove,
        onColorAdd,
        handleFormSubmit: handleSubmit( handleForm ),
        isFormSubmitting: (
            isSubmitting ||
            colorLoading ||
            fileLoading[ "image" ] ||
            fileLoading[ "images" ] ||
            LOADING
        ),
        imageField: ( getValues( "file" ) ? [ getValues( "file" ) ] : [] ),
        colorData: { ...colorValue, colorLoading, colorError, colorSuccess, resetColor },
    };
}

export default useInventoryFormHandler
