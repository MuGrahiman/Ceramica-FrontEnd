import React from "react";
import PropTypes from "prop-types";
import { useCart } from "../../hooks/useCart";
import Skeleton from "../../components/Skeleton";

const CartCard = ({
	title,
	coverImage,
	category,
	price,
	quantity,
	cartId, // This is the cart item ID
	productId, // This is the product ID
	showButtons = true,
}) => {
	const {
		activeCartId,
		updateCartQuantity,
		removeFromCart,
		isRemoving,
		isUpdating,
	} = useCart();

	// Handle quantity changes
	const handleQuantityChange = (type) =>
		updateCartQuantity({ productId, quantity, cartId }, type);

	// Show loading state if cart item is being updated/removed
	if ((activeCartId === cartId && isRemoving) || isUpdating) {
		return <Skeleton isSvg/>;
	}

	return (
		<li className="mx-auto flex flex-row items-center justify-between gap-6 py-6">
			{/* Image Section */}
			{coverImage && (
				<div className="hidden sm:block h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
					<img
						alt={title || "Product Image"}
						src={coverImage?.url || "/placeholder.jpg"}
						className="h-full w-full object-cover object-center"
					/>
				</div>
			)}

			{/* Product Info */}
			<div className="h-full flex flex-col items-start justify-between gap-2 text-start text-sm sm:text-base sm:font-medium text-gray-900">
				{title && (
					<h3>
						<strong>Name: </strong>
						{title}
					</h3>
				)}
				{category && (
					<p>
						<strong>Category: </strong>
						{category}
					</p>
				)}
				{price && (
					<p>
						<strong>Price: </strong>${price}
					</p>
				)}
			</div>

			{/* Actions Section */}
			<div className="sm:ms-auto flex flex-col items-center justify-center gap-2">
				<p className="text-sm sm:text-base sm:font-medium text-gray-900">
					<strong>Total: </strong>${(price || 0) * quantity}
				</p>

				{/* Quantity Control Buttons */}
				<div className="text-gray-500 flex items-center">
					<button
						onClick={() => handleQuantityChange("dec")}
						className="mx-2 sm:text-2xl hover:font-bold cursor-pointer"
						style={{ display: showButtons ? "inline-block" : "none" }}>
						-
					</button>
					<strong>Qty: {quantity}</strong>
					<button
						onClick={() => handleQuantityChange("inc")}
						className="mx-2 sm:text-2xl hover:font-bold cursor-pointer"
						style={{ display: showButtons ? "inline-block" : "none" }}>
						+
					</button>
				</div>

				{/* Remove Button */}
				<button
					disabled={isRemoving}
					onClick={() => removeFromCart(cartId)}
					type="button"
					className="text-sm sm:text-base sm:font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
					style={{ display: showButtons ? "inline-block" : "none" }}>
					{isRemoving ? "Removing..." : "Remove"}
				</button>
			</div>
		</li>
	);
};

// Define expected prop types
CartCard.propTypes = {
	productId: PropTypes.string.isRequired, 
	cartId: PropTypes.string.isRequired, 
	title: PropTypes.string,
	category: PropTypes.string,
	price: PropTypes.number,
	coverImage: PropTypes.shape({
		url: PropTypes.string,
	}),
	quantity: PropTypes.number.isRequired,
	showButtons: PropTypes.bool,
};

export default CartCard;