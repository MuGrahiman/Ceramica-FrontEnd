import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import AddressForm from "../address/AddressForm";
import AddressList from "../address/AddressList";
import useAddress from "../../hooks/useAddress";
import { useCart } from "../../hooks/useCart";
import { handleIteration } from "../../utils/generals";
import InfoLayout from "../../components/InfoLayout";

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
		deleteAddress,
	} = useAddress();

	const { cartItems, isFetching, isRemoving, isUpdating } = useCart();

	const renderItem = (item) => ({
		quantity: item.quantity,
		productId: item.inventory?._id || null,
		coverImage: item.inventory?.coverImage || "",
		price: item.inventory?.price || 0,
		title: item.inventory?.title || "Unknown Title",
	});
	const summaryOfCartItems = handleIteration(cartItems, renderItem);

	return (
		<div className="container mx-auto py-8">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 ">
				<div className="col-span-1 md:col-span-1 lg:col-span-2 order-2 md:order-1">
					<InfoLayout title="Address Form">
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
					</InfoLayout>
				</div>
				<div className="col-span-1 md:col-span-1 lg:col-span-1 order-1 md:order-2 ">
					<InfoLayout title="Saved Addresses">
						<AddressList
							ADDRESS_LIST={addressList}
							IS_LOADING={isLoading}
							ON_SELECTION={onSelection}
							ADDRESS_ID={addressId}
							ON_DELETE={deleteAddress}
						/>
					</InfoLayout>
				</div>

				<div className=" col-span-1 md:col-span-2   order-3">
					<InfoLayout title="Saved Addresses">
						<OrderSummary
							CART_SUMMARY={summaryOfCartItems}
							IS_LOADING={isFetching || isRemoving || isUpdating}
						/>
					</InfoLayout>
				</div>
				<div className="col-span-1 md:col-span-2 lg:col-span-1  order-4">
					<InfoLayout title="Saved Addresses">
						<PaymentOptions
							cartSummary={summaryOfCartItems}
							addressId={addressId}
							isLoading={isFetching || isRemoving || isUpdating}
						/>
					</InfoLayout>
				</div>
			</section>
		</div>
	);
};

export default CheckOutPage;
