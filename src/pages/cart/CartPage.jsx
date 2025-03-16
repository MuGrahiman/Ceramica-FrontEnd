import React from "react";
import { useCart } from "../../hooks/useCart";
import CartSummary from "./CartSummary";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import LoadingTemplate from "../../components/LoadingTemplate";
import { useSelector } from "react-redux";

/**
 * Component to display the cart page.
 */
const CartPage = () => {
		const subTotal = useSelector( ( state ) => state.order.subTotal );
	
	const { cartItems, isFetching, isRemoving, isUpdating } = useCart();

	return isFetching ? (
		<div className="container min-h-screen text-center">
			<LoadingTemplate />
		</div>
	) : (
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
	);
};

export default CartPage;
