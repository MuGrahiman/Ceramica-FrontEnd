import { useForm } from "react-hook-form";
import { useAddAddressMutation, useGetAddressesQuery } from "../redux/store";
import useToast from "../hooks/useToast";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

const useAddress = ( existingAddressData ) => {
    const showToast = useToast();
    const { isAuthorized } = useAuth( "client" );
    const [ addressList, setAddressList ] = useState( null );

    const { data, error: fetchError, isLoading: isFetching } = useGetAddressesQuery( null,
        { skip: !isAuthorized }
    );
    const [ addAddress, { isLoading } ] = useAddAddressMutation();

    // Update cart items when data changes
    useEffect( () => {
        if ( fetchError ) {
            showToast( "Failed to fetch address items. Please try again.", 'error' );
        }
        if ( data && data.length ) {
            setAddressList( data );
        } else {
            setAddressList( null );
        }
    }, [ data, fetchError, showToast ] );

    const {
        handleSubmit,
        register,
        formState: { errors }, reset
    } = useForm(
            // { defaultValues: defaultAddressValues, }

        );

    const onSubmit = async ( formData ) => {
        try {
            await addAddress( formData ).unwrap();
            showToast( "Address added successfully", "success" );
        } catch ( error ) {
            showToast( "Failed to add address. Please try again.", "error" );
            console.error( "Error adding address:", error );
        }
    };

    return {
        addressList,
        handleSubmit: handleSubmit( onSubmit ),
        reset: () => reset( existingAddressData ),
        register,
        errors,
        isLoading,isFetching
    };
};

export default useAddress;
