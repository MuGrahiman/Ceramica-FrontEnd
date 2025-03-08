import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import useToast from './useToast';

const useCoupon = ( { DEFAULT_SUCCESS_VALUE, DEFAULT_VALUES, ON_SUBMIT } ) => {
    const showToast = useToast();

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
        defaultValues: DEFAULT_VALUES,
    } );

    const [ isSuccess, setIsSuccess ] = useState( DEFAULT_SUCCESS_VALUE );

    // Utility function to set success state for fields
    const setSuccessFn = ( label, isSucceed ) =>
        setIsSuccess( ( prev ) => ( {
            ...prev,
            [ label ]: isSucceed,
        } ) );

    // Utility function to set custom error messages
    const setErrorFn = ( label, message ) =>
        setError( label, { type: "custom", message: message } );
    const getValidDates = () => {
        const startDate = getValues( "validFrom" )
        const endDate = getValues( "validUntil" )
        return { startDate, endDate }
    }
    const validateDateRange = ( { startDate, endDate } ) => {
        //  new Date( getValues( "validFrom" ) ); // Convert to Date object
        // new Date( getValues( "validUntil" ) ); // Convert to Date object
        if ( !startDate || !endDate ) return false
        // Check if the selected date is in the future or past
        if ( endDate < startDate ) {
            setErrorFn( "validUntil", "End date must be greater than start date." );
            return false
        }

        // Return true if the dates are valid (optional)
        return true;
    }

    const validateDate = ( label, value ) => {
        clearErrors( label );
        const selectedDate = new Date( value ); // Convert to Date object

        // Get the current date
        const now = new Date();

        // Reset the time part of the current date to compare only the date
        now.setHours( 0, 0, 0, 0 ); // Set time to midnight
        // Check if the selected date is in the future or past
        if ( selectedDate < now ) {
            setErrorFn( label, "The selected date is in the past." );
        }

        const { startDate, endDate } = getValidDates()
        if ( startDate && endDate ) validateDateRange( { startDate, endDate } );
        // Optionally, set success or error states
        setSuccessFn( label, value && !errors[ label ] );
        return;
    };
    const validateOnChange = ( label, rule, message ) => {
        // alert( rule )
        clearErrors( label );
        if ( rule ) setSuccessFn( label, rule );
        // else setErrorFn( label, message )
    };


    const titleError = "Title must be at least 3 characters long."
    const usageLimitError = "Limit must be greater than zero."
    const statusError = "Please select an option"
    const minimumPurchaseAmountError = "Purchase Amount must be greater than 0"
    const discountError = "Discount must be greater than 0"
    const descriptionError = "Description must be at least 200 characters long."
    // Validation rules for form fields
    const validationRules = {
        // Title validation rules
        title: {
            required: "Title is required.",
            minLength: {
                value: 3,
                // message: titleError,
            },
            onChange: ( e ) =>
                validateOnChange(
                    "title",
                    e.target.value.length >= 3 && !errors[ "title" ],
                    titleError
                ),
        },
        // Stock validation rules
        usageLimit: {
            required: "Limit is required.",
            valueAsNumber: true,
            validate: ( value ) =>
                ( value && value > 0 ) || usageLimitError,
            onChange: ( e ) =>
                validateOnChange( "usageLimit", e.target.value && !errors[ "usageLimit" ], usageLimitError ),
        },
        // Status validation rules
        status: {
            required: "Status is required.",
            validate: ( value ) =>
                ( value && value !== "select" ) || statusError,
            onChange: ( e ) =>
                validateOnChange( "status", e.target.value && !errors[ "status" ], statusError ),
        },
        // Price validation rules
        validFrom: {
            required: "Valid From Date is required.",
            onChange: ( e ) => validateDate( "validFrom", e.target.value ),
        },
        // valid Until validation rules
        validUntil: {
            required: "Date is required.",
            onChange: ( e ) => validateDate( "validUntil", e.target.value ),
        },
        // Minimum Purchase Amount validation rules
        minimumPurchaseAmount: {
            required: "Purchase Amount is required.",
            valueAsNumber: true,
            validate: ( value ) =>
                value > 0 || minimumPurchaseAmountError,
            onChange: ( e ) =>
                validateOnChange(
                    "minimumPurchaseAmount",
                    e.target.value && !errors[ "minimumPurchaseAmount" ],
                    minimumPurchaseAmountError
                ),
        },
        // Discount validation rules
        discount: {
            required: "Discount is required.",
            valueAsNumber: true,
            validate: ( value ) => value > 0 || discountError,
            onChange: ( e ) =>
                validateOnChange( "discount", e.target.value && !errors[ "discount" ],
                    discountError
                ),
        },
        // Description validation rules
        description: {
            required: "Description is required.",
            validate: ( value ) =>
                value.trim().length >= 200 ||
                descriptionError,
            onChange: ( e ) =>
                validateOnChange(
                    "description",
                    e.target.value.trim().length >= 200 && !errors[ "description" ],
                    descriptionError
                ),
        },
    };

    // Handle form submission
    const handleForm = ( data ) => {
        if ( errors && errors.length ) return;

        clearErrors()
        const isValidDateRange = validateDateRange(getValidDates())
        if ( !isValidDateRange ) return;

        // const startDate = new Date( getValues( "validFrom" ) ); // Convert to Date object
        // const endDate = new Date( getValues( "validUntil" ) ); // Convert to Date object

        // // Check if the selected date is in the future or past
        // if ( endDate < startDate ) {
        //     return setErrorFn( "validUntil", "End date must be greater than start date." );
        // }


        // If form fields are valid, proceed with submission
        if ( isDirty && isValid  ) {
            return ON_SUBMIT( data );
        } else {
            return showToast( "Please make changes", "info" );
        }
    };

    return {
        register,
        errors,
        handleFormSubmit: handleSubmit( handleForm ),
        validationRules,
        isSuccess, isSubmitting
    }
}

export default useCoupon
