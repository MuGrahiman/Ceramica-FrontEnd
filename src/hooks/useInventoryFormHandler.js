import { useFieldArray, useForm } from "react-hook-form";
import useToast from "./useToast";
import { useEffect, useState } from "react";
import useHandleFiles from "./useHandleFiles";
import useColorValidator from "./useColorValidator";
import { handleFieldsValidation, iterateFiles } from "../utils/fileHandler";

const useInventoryFormHandler = ( { DEFAULT_VALUES, DEFAULT_SUCCESS_VALUE, ON_SUBMIT, LOADING } ) => {

    const [ isSuccess, setIsSuccess ] = useState( DEFAULT_SUCCESS_VALUE );


    // Form Hook Configuration
    const {
        handleSubmit,
        reset,
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
        colorData,
        colorLoading,
        colorError,
        colorSuccess,
        resetColor,
    } = useColorValidator( DEFAULT_VALUES.color );

    const onColorAdd = () => {
        setValue( "color", {
            name: colorData.name,
            hex: colorData.hex,
            image: colorData.image,
        } ),
            setValue( "colorInput", colorData.hex );
        clearErrors( "colorInput" );
        setSuccessFn( "colorInput", colorData && !errors[ "colorInput" ] );
    }

    // Utility Functions
    const setErrorFn = ( label, message ) =>
        setError( label, { type: "custom", message: message } );

    const setSuccessFn = ( label, isSucceed ) =>
        setIsSuccess( ( prev ) => ( {
            ...prev,
            [ label ]: isSucceed,
        } ) );

    //  Handle file effects
    useEffect( () => {
        setSuccessFn( "images", fields.length > 2 && !errors[ "images" ] );
    }, [ errors, fields ] );



    const onFileRemove = ( id ) => handleFileRemove( {
        label: "image",
        publicId: id,
        clearErrors: () => clearErrors( "image" ),
        onSuccess: () => { setValue( "file", null ), setSuccessFn( 'image', false ) },
        onError: ( error ) => setErrorFn( "image", error ),
    } )


    const onFilesRemove = ( id, i ) =>
        handleFileRemove( {
            label: "images",
            publicId: id,
            clearErrors: () => clearErrors( "images" ),
            onSuccess: () => {
                const images = getValues( "images" );
                const filteredImages = Array.from( images ).filter(
                    ( _, index ) => index !== i
                );
                setValue( "images", { ...filteredImages } );
                remove( i );
            },
            onError: ( error ) => setErrorFn( "images", error ),
        } )


    // Handle form submission
    const handleForm = ( data ) => {
        clearErrors( "images" );
        const fieldsValidity = handleFieldsValidation( fields );
        if ( fieldsValidity !== true ) return setErrorFn( "images", fieldsValidity );
        if ( isDirty && isValid ) return ON_SUBMIT( data );
        else return showToast( "Please make changes", "info" );
    };


    //  Handle validation
    const validationRules = {
        // image validator rules
        image: {
            required: "Image is required.",
            accept: ".jpeg, .jpg, .png",
            validate: ( value ) => getValues( "file" ) || value ? true : "Image is required.",
            onChange: ( e ) =>
                handleFileChange( {
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

        // title validator rules
        title: {
            required: "Title is required.",
            minLength: {
                value: 3,
                message: "Title must be at least 3 characters long.",
            },
            onChange: ( e ) => {
                const value = e.target.value;
                clearErrors( "title" );
                setSuccessFn( "title", value && value.length >= 3 && !errors[ "title" ] );
            },
        },

        // category validator rules
        category: {
            required: "Category is required.",
            validate: ( value ) =>
                ( value && value !== "select" ) || "Please select option",
            onChange: ( e ) => {
                const value = e.target.value;
                clearErrors( "category" );
                setSuccessFn( "category", value && !errors[ "category" ] );
            },
        },

        // shape validator rules
        shape: {
            required: "Shape is required.",
            minLength: 3,
            onChange: ( e ) => {
                clearErrors( "shape" );
                const value = e.target.value;
                setSuccessFn( "shape", value && value.length > 2 && !errors[ "shape" ] );
            },
        },

        // color validator rules
        colorInput: {
            required: "Color is required.",
            validate: ( value ) => ( value ? true : "Please Select the color" ),
            // onChange: ( e ) =>
            //     validateColor( e.target.value, {
            //         onError: ( error ) => setErrorFn( "colorInput", error ),
            //     } ),
        },
        color: {
            hex: {
                required: "Color hex value is required.",
                validate: ( value ) =>
                    value ? true : "Please Select the color hex value",
            },
            image: {
                required: "Color image is required.",
                validate: ( value ) => ( value ? true : "Please Select the color image" ),
            },
            name: {
                required: "Color name is required.",
                validate: ( value ) => ( value ? true : "Please Select the color name" ),
            },
        },

        // dimension validator rules
        dimension: {
            required: "Dimension is required.",
            onChange: ( e ) => {
                clearErrors( "dimension" );
                const value = e.target.value;
                setSuccessFn( "dimension", value && !errors[ "dimension" ] );
            },
        },

        // stock validator rules
        stock: {
            required: "Stock is required.",
            valueAsNumber: true,
            onChange: ( e ) => {
                clearErrors( "stock" );
                const value = e.target.value;
                setSuccessFn( "stock", value && !errors[ "stock" ] );
            },
        },

        // size validator rules
        size: {
            required: "Size is required.",
            validate: ( value ) =>
                ( value && value !== "select" ) || "Please select option",
            onChange: ( e ) => {
                clearErrors( "size" );
                const value = e.target.value;
                setSuccessFn( "size", value && !errors[ "size" ] );
            },
        },

        // price validator rules
        price: {
            required: "Price is required.",
            valueAsNumber: true,
            onChange: ( e ) => {
                clearErrors( "price" );
                const value = e.target.value;
                setSuccessFn( "price", value && !errors[ "price" ] );
            },
        },

        // description validator rules
        description: {
            required: "Description is required.",
            validate: ( value ) =>
                value.trim().length > 200 ||
                "Description must be at least 200 characters long.",
            onChange: ( e ) => {
                clearErrors( "description" );
                const value = e.target.value;
                setSuccessFn(
                    "description",
                    value && value.trim().length >= 200 && !errors[ "description" ]
                );
            },
        },

        // Image validation rules
        images: {
            validate: ( files ) =>
                files ? iterateFiles( files ) : handleFieldsValidation( fields ),
            onChange: ( e ) =>
                handleFileChange( {
                    label: "images",
                    files: e.target.files,
                    clearErrors: () => clearErrors( "images" ),
                    maxFiles: 5,
                    currentFields: fields,
                    onSuccess: () =>
                        setSuccessFn( "images", fields.length > 2 && !errors[ "images" ] ),
                    onError: ( error ) => {
                        setErrorFn( "images", error );
                        // return;
                    },
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
        colorValue: { ...colorData, colorLoading, colorError, colorSuccess, resetColor },
    };
}

export default useInventoryFormHandler
