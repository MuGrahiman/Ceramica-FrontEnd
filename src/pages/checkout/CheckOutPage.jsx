import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import AddressForm from "../address/AddressForm";
import AddressList from "../address/AddressList";
import useAddress from "../../hooks/useAddress";
import { useCart } from "../../hooks/useCart";

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
	const { cartItems, subtotal, isFetching, isRemoving, isUpdating } = useCart();

	return (
		<div className="container mx-auto p-8">
			{/* Address Section: Allows users to enter a new address or select an existing one */}
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
					CART_ITEMS={cartItems}
					IS_LOADING={isFetching || isRemoving || isUpdating}
				/>
				<PaymentOptions SUB_TOTAL={subtotal}/>
			</section>
		</div>
	);
};

export default CheckOutPage;
