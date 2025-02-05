import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../hooks/useCart";
import Loading from "../../components/Loading";

/**
 * Component to display a single cart item.
 * @param {Object} props - The props for the component.
 * @param {Object} props.inventory - The product details.
 * @param {number} props.quantity - The quantity of the product in the cart.
 * @param {string} props._id - The ID of the cart item.
 */
const CartCard = ({ inventory, quantity, _id }) => {
	const { cartId, updateCartQuantity, removeFromCart, isRemoving, isUpdating } =
		useCart();

	const handleQuantityChange = (type) =>
		updateCartQuantity({ inventory, quantity, _id }, type);

	return (cartId === _id && isRemoving) || isUpdating ? (
		<Loading />
	) : (
		<li
			key={_id}
			className="flex flex-col sm:flex-row items-center justify-center sm:gap-6 py-6">
			{/* Image Section */}
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
				<img
					alt={inventory?.title || "Product Image"}
					src={inventory?.coverImage?.url || "/placeholder.jpg"}
					className="h-full w-full object-cover object-center"
				/>
			</div>

			{/* Info Section */}
			<div className="flex flex-col mb-4 text-start">
				<h3 className="text-base font-medium text-gray-900">
					<strong>Name: </strong>
					{inventory?.title}
				</h3>
				<p className="text-base font-medium text-gray-900">
					<strong>Category: </strong>
					{inventory?.category}
				</p>
				<p className="text-base font-medium text-gray-900">
					<strong>Price: </strong>${inventory?.price}
				</p>
			</div>

			{/* Actions Section */}
			<div className="sm:ms-auto flex flex-col items-center justify-center gap-2">
				<p className="text-base font-medium text-gray-900">
					<strong>Total: </strong>${(inventory?.price || 0) * quantity}
				</p>

				{/* Quantity Control */}
				<div className="text-gray-500 flex items-center">
					<button
						onClick={() => handleQuantityChange("dec")}
						className="mx-2 text-2xl hover:font-bold cursor-pointer">
						-
					</button>
					<strong>{quantity}</strong>
					<button
						onClick={() => handleQuantityChange("inc")}
						className="mx-2 text-2xl hover:font-bold cursor-pointer">
						+
					</button>
				</div>

				{/* Remove Button */}
				<button
					disabled={isRemoving}
					onClick={() => removeFromCart(_id)}
					type="button"
					className="font-medium text-red-500 hover:text-red-700 disabled:opacity-50">
					{isRemoving ? "Removing..." : "Remove"}
				</button>
			</div>
		</li>
	);
};

CartCard.propTypes = {
	inventory: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
		coverImage: PropTypes.shape({
			url: PropTypes.string,
		}),
	}).isRequired,
	quantity: PropTypes.number.isRequired,
	_id: PropTypes.string.isRequired,
};

export default CartCard;
