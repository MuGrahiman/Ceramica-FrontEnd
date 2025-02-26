import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import AddressForm from "../address/AddressForm";
import AddressList from "../address/AddressList";
import useAddress from "../../hooks/useAddress";
import { useCart } from "../../hooks/useCart";
import { handleIteration } from "../../utils/generals";

const CheckOutPage = () => {
	const {
		handleSubmit,
		editAddress,
		register,
		errors,
		reset,
		addressId,
		addressList,
		isLoading,
		onSelection,
	} = useAddress();

	const { cartItems, subTotal, isFetching, isRemoving, isUpdating } = useCart();

	const renderItem = (item) => ({
		quantity: item.quantity,
		productId: item.inventory?._id || null, // Use optional chaining and default to null
		coverImage: item.inventory?.coverImage || "", // Default to empty string if not available
		price: item.inventory?.price || 0, // Default to 0 if not available
		title: item.inventory?.title || "Unknown Title", // Default to 'Unknown Title'
	});
	const summaryOfCartItems = handleIteration(cartItems, renderItem);

	return (
		<div className="container mx-auto p-8">
			<section className="flex flex-col-reverse md:flex-row gap-8 mb-8 md:max-h-[60rem] lg:max-h-[32rem]">
				<AddressForm
					key={addressId}
					EDIT_ADDRESS={editAddress}
					register={register}
					ADDRESS_ID={addressId}
					HANDLE_SUBMIT={handleSubmit}
					RESET={reset}
					ERRORS={errors}
					IS_LOADING={isLoading}
				/>
				<AddressList
					ADDRESS_LIST={addressList}
					IS_LOADING={isLoading}
					ON_SELECTION={onSelection}
					ADDRESS_ID={addressId}
				/>
			</section>

			<section className="flex flex-col lg:flex-row gap-8 max-h-screen">
				<OrderSummary
					CART_SUMMARY={summaryOfCartItems}
					IS_LOADING={isFetching || isRemoving || isUpdating}
				/>
				<PaymentOptions
					subTotal={subTotal}
					cartSummary={summaryOfCartItems}
					addressId={addressId}
					isLoading={isFetching || isRemoving || isUpdating}
				/>
			</section>
		</div>
	);
};

export default CheckOutPage;
