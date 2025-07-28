import React from "react";
import { useCart } from "../../hooks/useCart";
import CartSummary from "./CartSummary";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import { useSelector } from "react-redux";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";

/**
 * Component to display the cart page.
 */
const CartPage = () => {
	const subTotal = useSelector((state) => state.order.subTotal);

	const {
		cartItems,
		isFetching,
		isRemoving,
		isUpdating,
		fetchError,
		isFetchError,
	} = useCart();

	return (
		<LoadingErrorBoundary
			isLoading={isFetching}
			isError={isFetchError}
			errorMessage={
				fetchError?.data?.message ||
				fetchError?.message ||
				"Failed to fetch cart items"
			}>
			<div className="container mx-auto sm:px-4 py-6 flex mt-12 mb-12 h-full flex-col overflow-hidden bg-white shadow-xl">
				<div className="flex-1  px-4 py-6 sm:px-6">
					<CartHeader />
					<CartList CART_ITEMS={cartItems} />
				</div>
				<CartSummary
					subtotal={subTotal}
					isLoading={isRemoving || isUpdating || isFetching}
				/>
			</div>
		</LoadingErrorBoundary>
	);
};

export default CartPage;
