import React from "react";
import { useCart } from "../../hooks/useCart";
import CartSummary from "./CartSummary";
import Loading from "../../components/Loading";
import CartHeader from "./CartHeader";
import CartList from "./CartList";

/**
 * Component to display the cart page.
 */
const CartPage = () => {
	const { cartItems, subTotal, isFetching, isRemoving, isUpdating } = useCart();

	return isFetching ? (
		<div className="container min-h-screen text-center">
			<Loading />
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
