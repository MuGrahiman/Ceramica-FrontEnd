import { useForm } from "react-hook-form";
import { useAddAddressMutation, useGetAddressesQuery, useUpdateAddressMutation } from "../redux/store";
import useToast from "../hooks/useToast";
import { useAuth } from "./useAuth";
import { useCallback, useEffect, useState } from "react";
import { createDefaultState } from "../utils/generals";
import { ADDRESS_FIELDS } from "../constants/address";

const useAddress = () => {
    const showToast = useToast();
    const { isAuthorized, currentUser } = useAuth( "client" );

    // State for managing selected address ID and address list
    const [ addressId, setAddressId ] = useState( null );
    const [ addressList, setAddressList ] = useState( null );

    // API queries and mutations
    const { data, error: fetchError, isLoading: isFetching } = useGetAddressesQuery( null, { skip: !isAuthorized } );
    const [ addAddress, { isLoading: isAddingAddress } ] = useAddAddressMutation();
    const [ updateAddress, { isLoading: isUpdatingAddress } ] = useUpdateAddressMutation();

    // React Hook Form setup
    const {
        handleSubmit,
        register, trigger,
        formState: { errors, isDirty, isSubmitting, isValid },
        reset,
        setValue,
        watch, clearErrors,

    } = useForm();

    /**
     * Pre-fills email field if user is authorized
     */
    useEffect( () => {
        if ( isAuthorized && currentUser.role === "client" ) {
            setValue( "email", currentUser.email );
        }

    }, [ isAuthorized, currentUser, reset ] );

    /**
     * Updates address list when data is fetched successfully
     */
    useEffect( () => {
        if ( fetchError ) {
            console.error( fetchError );
            showToast( "Failed to fetch addresses. Please try again.", "error" );
        }
        if ( data && data.length ) {
            setAddressList( data );
        }
    }, [ data, fetchError, showToast ] );

    /**
     * Validates form before submission
     * @returns {boolean} - Returns true if form is valid, otherwise false
     */
    const validateForm = () => {
        clearErrors()
        trigger()
        if ( !isDirty ) {
            showToast( "Make any changes before submitting", "error" );
            return false;
        }
        if ( !isValid ) {
            showToast( "Form data is not valid", "error" );
            return false;
        }
        return true;
    };

    /**
     * Handles form submission to add a new address.
     * @param {Object} formData - The address form data.
     */
    const onSubmit = async ( formData ) => {
        if ( !validateForm() ) return;
        try {
            const newAddress = await addAddress( formData ).unwrap();
            setAddressId( newAddress._id );
            reset( createDefaultState( ADDRESS_FIELDS, "",
                { ...newAddress, email: currentUser.email }
            ) );
            showToast( "Address added successfully", "success" );
        } catch ( error ) {
            showToast( "Failed to add address. Please try again.", "error" );
            console.error( "Error adding address:", error );
        }
    };

    /**
     * Handles updating an existing address.
     */
    const editAddress = async () => {
        if ( !validateForm() ) return;

        try {
            const currentFormValues = watch();
            const updatedAddress = await updateAddress( { addressId, data: currentFormValues } ).unwrap();
            setAddressId( updatedAddress._id );
            reset( createDefaultState( ADDRESS_FIELDS, "",
                { ...updatedAddress, email: currentUser.email }
            ) );
            showToast( "Address updated successfully", "success" );
        } catch ( error ) {
            showToast( "Failed to update address. Please try again.", "error" );
            console.error( "Error updating address:", error );
        }
    };

    /**
     * Resets the form and clears the selected address ID
     */
    const resetForm = useCallback( () => {
        clearErrors()
        reset();
        setAddressId( null );
    }, [ clearErrors, reset ] );

    /**
     * Handles address selection, updating the form with the selected address.
     * @param {Object} address - Selected address data.
     */
    const onSelection = ( address ) => {
        if ( !address ) {
            showToast( "Failed to select address", "error" );
            return;
        }
        if ( addressId === address._id ) return; // Prevent redundant updates

        setAddressId( address._id );
        reset( createDefaultState( ADDRESS_FIELDS, "", { ...address, email: currentUser.email } ) );
    };

    return {
        addressId,
        addressList,
        handleSubmit: handleSubmit( onSubmit ),
        editAddress,
        reset: resetForm,
        register,
        errors,
        isLoading: isFetching || isAddingAddress || isUpdatingAddress || isSubmitting,
        isFetching,
        isUpdatingAddress,
        isAddingAddress,
        onSelection,
    };
};

export default useAddress;
