import React from "react";
import { useCart } from "../../hooks/useCart";
import ListOptions from "../../components/ListOptions";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";
import Loading from "../../components/Loading";
import CartHeader from "./CartHeader";

/**
 * Component to display the cart page.
 */
const CartPage = () => {
	const {
		cartItems,
		subtotal,
		isFetching,
		isRemoving,
		isUpdating,
	} = useCart();

	return isFetching ? (
		<div className="container min-h-screen text-center">
			<Loading />
		</div>
	) : (
		<div className="container mx-auto sm:px-4 py-6 flex mt-12 mb-12 h-full flex-col overflow-hidden bg-white shadow-xl">
			<div className="flex-1  px-4 py-6 sm:px-6">

				<CartHeader />

				<div className="mt-8 pt-6">
					<div className="flow-root">
						{cartItems && cartItems.length > 0 ? (
							<ul role="list" className="-my-6 divide-y divide-gray-200">
								<ListOptions
									OPTIONS={cartItems}
									RENDER_ITEM={(item) => <CartCard {...item} />}
								/>
							</ul>
						) : (
							<p>No products found in your cart!</p>
						)}
					</div>
				</div>
			</div>

			<CartSummary
				subtotal={subtotal}
				isLoading={isRemoving || isUpdating || isFetching}
			/>
		</div>
	);
};

export default CartPage;
