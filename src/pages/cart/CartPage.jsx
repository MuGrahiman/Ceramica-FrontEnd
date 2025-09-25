import React, { useMemo, useCallback } from "react";
import { useCart } from "../../hooks/useCart";
import CartSummary from "./CartSummary";
import CartHeader from "./CartHeader";
import { useSelector } from "react-redux";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import ListContainer from "../../components/ListContainer";
import ListOptions from "../../components/ListOptions";
import ItemInfoIndicator from "../../components/ItemInfoIndicator";

/**
 * CartPage Component - Displays the user's shopping cart with items and summary.
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

	// Memoized loading state for CartSummary
	const isLoading = useMemo(
		() => isRemoving || isUpdating || isFetching,
		[isRemoving, isUpdating, isFetching]
	);

	// Memoized render function for cart items
	const renderCartItem = useCallback(({ inventory, _id, ...rest }) => (
		<ItemInfoIndicator
			key={_id} 
			cartId={_id}
			productId={inventory._id}
			{...inventory}
			{...rest}
			showButtons={true}
			size="lg"
		/>
	), []);

	return (
		<LoadingErrorBoundary
			isLoading={isFetching}
			isError={isFetchError}
			errorMessage={handleAndShowError(
				fetchError,
				"Unable to load your shopping cart. Please try again later."
			)}
		>
			<div 
				className="container mx-auto sm:px-4 py-6 flex mt-12 mb-12 h-full flex-col overflow-hidden bg-white shadow-xl"
				role="main"
				aria-label="Shopping Cart"
			>
				<div className="flex-1 px-4 py-6 sm:px-6"> 
					<CartHeader />
					<ListContainer divideItems>
						<ListOptions
							OPTIONS={cartItems}
							EMPTY_MESSAGE="Your cart is empty. Start adding some products!"
							RENDER_ITEM={renderCartItem}
						/>
					</ListContainer>
				</div>
				<CartSummary
					subtotal={subTotal}
					isLoading={isLoading}
				/>
			</div>
		</LoadingErrorBoundary>
	);
};


export default CartPage;