import { useForm } from "react-hook-form";
import { useAddAddressMutation, useDeleteAddressMutation, useGetAddressesQuery, useUpdateAddressMutation } from "../redux/store";
import useToast from "../hooks/useToast";
import { useAuth } from "./useAuth";
import { useCallback, useEffect, useState } from "react";
import { createDefaultState } from "../utils/generals";
import { ADDRESS_FIELDS } from "../constants/address";
import useApiHandler from "./useApiHandler";

const useAddress = () => {
    const showToast = useToast();
    const { isAuthorized, currentUser } = useAuth( "client" );
    if ( !isAuthorized ) showToast( 'Please Login', 'error' )
    // State for managing selected address ID and address list
    const [ addressId, setAddressId ] = useState( null );
    const [ addressList, setAddressList ] = useState( [] );
    const [ addressDetails, setAddressDetails ] = useState( {} );

    const [ handleMutation ] = useApiHandler();
    // API queries and mutations
    const { data, error: fetchError, isLoading: isFetching } = useGetAddressesQuery( null, { skip: !isAuthorized } );
    const [ addAddress, { isLoading: isAddingAddress } ] = handleMutation( useAddAddressMutation );
    const [ updateAddress, { isLoading: isUpdatingAddress } ] = handleMutation( useUpdateAddressMutation );
    const [
        deleteAddress,
        { isLoading: isDeletingAddress }, //{isLoading,isError,isSuccess}
    ] = handleMutation( useDeleteAddressMutation );
    // React Hook Form setup
    const defaultValues = createDefaultState( ADDRESS_FIELDS, "",
        { email: currentUser?.email, isDefault: false }
    )
    const {
        handleSubmit,
        register, trigger,
        formState: { errors, isDirty, isSubmitting, isValid },
        reset,
        setValue,
        watch, clearErrors,

    } = useForm( {
        defaultValues
    } );

    /**
     * Pre-fills email field if user is authorized
     */
    useEffect( () => {
        if ( isAuthorized && currentUser?.role === "client" ) {
            setValue( "email", currentUser?.email );
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
            const sortedAddresses = [ ...data ].sort( ( a, b ) => {
                if ( a.isDefault && !b.isDefault ) {
                    return -1;
                }
                if ( !a.isDefault && b.isDefault ) {
                    return 1;
                }
                return 0;
            } );

            setAddressList( sortedAddresses );
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
    const onAddAddress = async ( formData ) => {
        if ( !validateForm() ) return;
        await addAddress( formData, {
            onSuccess: ( newAddress ) => {
                setAddressId( newAddress._id );
                reset( createDefaultState( ADDRESS_FIELDS, "",
                    { ...newAddress, email: currentUser?.email }
                ) ); return "Address added successfully"
            },
            onError: ( err ) =>
                err.data.message ||
                err.message ||
                "Failed to add address. Please try again.",
        } );
    };

    /**
     * Handles updating an existing address.
     */
    const onEditAddress = async () => {
        if ( !validateForm() ) return;
        if ( !addressId ) return showToast( "Please choose any address for edit.", "warning" );

        const currentFormValues = watch();
        await updateAddress( { addressId, data: currentFormValues }, {
            onSuccess: ( updatedAddress ) => {
                setAddressId( updatedAddress._id );
                reset( createDefaultState( ADDRESS_FIELDS, "",
                    { ...updatedAddress, email: currentUser?.email }
                ) );
                return "Address updated successfully"
            },
            onError: ( err ) =>
                err.data.message ||
                err.message ||
                "Failed to update address. Please try again."
        } );

    };
    /**
     * Handles delete an existing address.
     */
    const onDeleteAddress = async ( id ) => {
        if ( !id ) return showToast( "Address id is required for delete", "warning" );
        await deleteAddress( id, {
            onSuccess: () => "Address deleted successfully ",
            onError: ( err ) =>
                err.data.message ||
                err.message ||
                "Failed to delete address. Please try again.",
        } );
    };

    /**
     * Resets the form and clears the selected address ID
     */
    const resetForm = useCallback( () => {
        clearErrors()
        reset( defaultValues );
        setAddressId( null );
    }, [ clearErrors, defaultValues, reset ] );

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
        const addressData = createDefaultState(
            ADDRESS_FIELDS, "",
            { ...address, email: currentUser?.email }
        )
        setAddressDetails( addressData )
        reset( addressData );
    };

    return {
        addressId,
        addressList,
        addressDetails,
        handleSubmit: handleSubmit( onAddAddress ),
        editAddress: onEditAddress,
        deleteAddress: onDeleteAddress,
        reset: resetForm,
        register,
        errors,
        isAddressLoading: isFetching || isAddingAddress || isUpdatingAddress || isSubmitting || isDeletingAddress,
        isAddressFetching:isFetching,
        isAddingAddress,
        isUpdatingAddress,
        isDeletingAddress,
        onSelection,
    };
};

export default useAddress;
