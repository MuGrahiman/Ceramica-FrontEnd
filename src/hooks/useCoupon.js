import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { getDate } from '../utils/date';
import {
    useCheckCouponMutation,
    useCouponSlice,
    useCreateCouponMutation,
    useDeleteCouponMutation,
    useGetCouponsQuery,
    useGetSingleCouponQuery,
    useOrderSlice,
    useUpdateCouponMutation,
    useUpdateCouponStatusMutation
} from '../redux/store';
import useApiHandler from './useApiHandler';
import { useCart } from './useCart';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../utils/errorHandlers';



/**
 * Custom hook to manage coupon-related operations.
 * @param {Object} config - Configuration object.
 * @param {Object} config.DEFAULT_SUCCESS_VALUE - Default success state values.
 * @param {Object} config.DEFAULT_VALUES - Default form values.
 * @param {Function} config.ON_SUBMIT - Callback function for form submission.
 * @returns {Object} An object containing form handlers, validation rules, and API call handlers.
 */
const useCoupon = ( { DEFAULT_SUCCESS_VALUE = {}, DEFAULT_VALUES = {}, ON_SUBMIT } = {} ) => {
    const {
        success: successToast,
        error: errorToast,
        info: infoToast,
        warn: warningToast,
    } = toast;
    const { getTotal } = useCart()
    const [ handleMutation ] = useApiHandler();
    const { validateAuthentication } = useAuth( "client" )
    const { addSubTotal } = useOrderSlice()
    const { addCoupon } = useCouponSlice()
    const [ checkCouponMutation ] = handleMutation( useCheckCouponMutation );

    /**
     * Custom hook to fetch all coupons.
     * @param {string} searchTerm - The search term for filtering coupons.
     * @returns {Object} The result of the useGetCouponsQuery hook.
     */
    const useGetCoupons = ( searchTerm ) => {
        return useGetCouponsQuery( searchTerm );
    };

    /**
     * Custom hook to fetch a single coupon by ID.
     * @param {string} couponId - The ID of the coupon to fetch.
     * @returns {Object} The result of the useGetSingleCouponQuery hook.
     */
    const useSingleCoupon = ( couponId ) => {
        return useGetSingleCouponQuery( couponId );
    };

    /**
     * Create a new coupon.
     * @returns {Array} A tuple containing the mutation function and loading state.
     */
    const useCreateCoupon = () => handleMutation( useCreateCouponMutation )

    /**
     * Update an existing coupon.
     * @returns {Array} A tuple containing the mutation function and loading state.
     */
    const useUpdateCoupon = () => handleMutation( useUpdateCouponMutation )

    /**
     * Update an existing coupon.
     * @returns {Array} A tuple containing the mutation function and loading state.
     */
    const useUpdateCouponStatus = () => handleMutation( useUpdateCouponStatusMutation )

    /**
     * Delete a coupon.
     * @returns {Array} A tuple containing the mutation function and loading state.
     */
    const useDeleteCoupon = () => handleMutation( useDeleteCouponMutation )

    // Form Hook Configuration
    const {
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        register,
        formState: { errors, isDirty, isSubmitting, isValid },
    } = useForm( {
        defaultValues: DEFAULT_VALUES,
    } );

    const [ isSuccess, setIsSuccess ] = useState( DEFAULT_SUCCESS_VALUE );

    /**
        * Set the success state for a specific field.
        * @param {string} label - The field label.
        * @param {boolean} isSucceed - Whether the field is valid.
        */
    const setSuccessState = ( label, isSucceed ) =>
        setIsSuccess( ( prev ) => ( {
            ...prev,
            [ label ]: isSucceed,
        } ) );

    /**
     * Set a custom error message for a specific field.
     * @param {string} label - The field label.
     * @param {string} message - The error message.
     */
    const setCustomError = ( label, message ) =>
        setError( label, { type: 'custom', message } );


    /**
     * Get the start and end dates from the form values.
     * @returns {Object} An object containing the start and end dates.
     */
    const getFormDates = () => {
        const startDate = getValues( 'validFrom' );
        const endDate = getValues( 'validUntil' );
        return { startDate, endDate };
    };

    /**
     * Validate the date range between start and end dates.
     * @param {Object} dates - The start and end dates.
     * @returns {boolean} Whether the date range is valid.
     */
    const validateDateRange = ( { startDate, endDate } ) => {
        if ( !startDate || !endDate ) return false;

        if ( endDate < startDate ) {
            setCustomError( 'validUntil', 'End date must be greater than start date.' );
            return false;
        }

        return true;
    };

    /**
     * Validate a specific date field.
     * @param {string} label - The field label.
     * @param {string} value - The field value.
     */
    const validateDate = ( label, value ) => {
        clearErrors( label );
        const selectedDate = getDate( value );
        const now = getDate();
        now.setHours( 0, 0, 0, 0 );

        if ( selectedDate < now ) {
            setCustomError( label, 'The selected date is in the past.' );
        }

        const { startDate, endDate } = getFormDates();
        if ( startDate && endDate ) validateDateRange( { startDate, endDate } );
        setSuccessState( label, value && !errors[ label ] );
    };

    /**
      * Validate a field on change.
      * @param {string} label - The field label.
      * @param {boolean} rule - The validation rule.
      */
    const validateFieldOnChange = ( label, rule ) => {
        clearErrors( label );
        if ( rule ) setSuccessState( label, rule );
    };



    const titleError = "Title must be at least 3 characters long."
    const usageLimitError = "Limit must be greater than zero."
    const statusError = "Please select an option"
    const minimumPurchaseAmountError = "Purchase Amount must be greater than 0"
    const discountError = "Discount must be in between 1 and 100"
    const descriptionError = "Description must be at least 200 characters long."
    // Validation rules for form fields
    const validationRules = {
        // Title validation rules
        title: {
            required: "Title is required.",
            minLength: {
                value: 3,
                message: titleError,
            },
            onChange: ( e ) =>
                validateFieldOnChange(
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
                validateFieldOnChange( "usageLimit", e.target.value && !errors[ "usageLimit" ], usageLimitError ),
        },
        // Status validation rules
        status: {
            required: "Status is required.",
            validate: ( value ) =>
                ( value && value !== "select" ) || statusError,
            onChange: ( e ) =>
                validateFieldOnChange( "status", e.target.value && !errors[ "status" ], statusError ),
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
                validateFieldOnChange(
                    "minimumPurchaseAmount",
                    e.target.value && !errors[ "minimumPurchaseAmount" ],
                    minimumPurchaseAmountError
                ),
        },
        // Discount validation rules
        discount: {
            required: "Discount is required.",
            valueAsNumber: true,
            validate: ( value ) => ( value >= 1 && value <= 100 ) || discountError,
            onChange: ( e ) =>
                validateFieldOnChange( "discount", e.target.value && !errors[ "discount" ],
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
                validateFieldOnChange(
                    "description",
                    e.target.value.trim().length >= 200 && !errors[ "description" ],
                    descriptionError
                ),
        },
    };

    /**
  * Check the coupon code.
  * @param {string} code - The coupon code to apply.
  */
    const checkCoupon = async ( code ) => {
        const totalAmount = getTotal()
        if ( !code ) {
            warningToast( "Please enter the code" );
            return;
        }
        validateAuthentication();

        const data = { couponCode: code, purchaseAmount: totalAmount };
        const coupon = await checkCouponMutation( data, {
            onError: ( err ) =>
                errorToast(
                    extractErrorMessage( err, "Coupon not found" )
                )
        } );

        if ( !coupon || typeof coupon !== "object" || !Object.keys( coupon ).length ) {
            errorToast( "Coupon not found" );
            return;
        }
        successToast( `${ coupon.discount } discount` );

        addCoupon( coupon )
        if ( coupon.discount ) {
            const discountPercentage = coupon.discount;
            const discountAmount = ( discountPercentage / 100 ) * totalAmount;
            const newSubTotal = totalAmount - discountAmount;
            addSubTotal( Math.max( newSubTotal, 0 ) );
        }


    };

    /**
      * Handle form submission.
      * @param {Object} data - The form data.
      */
    const handleFormSubmission = ( data ) => {
        if ( Object.keys( errors ).length > 0 ) return;

        clearErrors();
        const isValidDateRange = validateDateRange( getFormDates() );
        if ( !isValidDateRange ) return;

        if ( isDirty && isValid ) {
            ON_SUBMIT( data );
        } else {
            infoToast( 'Please make changes' );
        }
    };


    return {
        register,
        errors,
        handleCouponFormSubmit: handleSubmit( handleFormSubmission ),
        validationRules,
        isSuccess,
        isSubmitting,
        useGetCoupons,
        useSingleCoupon,
        useCreateCoupon,
        useUpdateCoupon,
        useUpdateCouponStatus,
        useDeleteCoupon,
        checkCoupon
    }
}

export default useCoupon
