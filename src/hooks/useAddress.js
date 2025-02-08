import { useForm } from "react-hook-form";
import { useAddAddressMutation } from "../redux/store";
import useToast from "../hooks/useToast";

const useAddress = (existingAddressData) => {
    const showToast = useToast();
    const [ addAddress, { isLoading } ] = useAddAddressMutation();

    const {
        handleSubmit,
        register,
        formState: { errors }, reset
    } = useForm(
        
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
        handleSubmit: handleSubmit( onSubmit ),
        reset:reset( existingAddressData ),
        register,
        errors,
        isLoading,
    };
};

export default useAddress;
