import PropTypes from "prop-types";
import { useCallback } from "react";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/generals";
import Skeleton from "./Skeleton";

/**
 * Bold text component for emphasizing content
 */
const Strong = ({ item = "" }) => (
	<strong className="text-blue-950 font-medium">{item}</strong>
);

Strong.propTypes = {
	item: PropTypes.string.isRequired,
};

/**
 * Button for quantity adjustment in cart items
 */
const QuantityButton = ({
	onClick = () => {},
	text = "",
	disabled = false,
	showButtons = false,
}) =>
	showButtons ? (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className="mx-2 sm:text-xl hover:font-bold disabled:opacity-50 transition-all duration-200"
			aria-label={text === "-" ? "Decrease quantity" : "Increase quantity"}>
			{text}
		</button>
	) : null;

QuantityButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	showButtons: PropTypes.bool.isRequired,
};

/**
 * Displays product information with quantity controls
 */
const ItemInfoIndicator = ({
	title = "",
	coverImage = {},
	category = "",
	price = null,
	quantity = null,
	cartId = "",
	productId = "",
	size = "md",
	showButtons = false,
}) => {
	const {
		activeCartId,
		updateCartQuantity,
		removeFromCart,
		isRemoving,
		isUpdating,
	} = useCart();

	const handleQuantityChange = useCallback(
		(type) => {
			const newQuantity =
				type === "inc" ? quantity + 1 : Math.max(0, quantity - 1);
			updateCartQuantity({ productId, quantity: newQuantity, cartId });
		},
		[cartId, productId, quantity, updateCartQuantity]
	);

	// Memoize quantity handlers
	const handleDecrease = useCallback(
		() => handleQuantityChange("dec"),
		[handleQuantityChange]
	);
	const handleIncrease = useCallback(
		() => handleQuantityChange("inc"),
		[handleQuantityChange]
	);

	// Loading state
	if ((activeCartId === cartId && isRemoving) || isUpdating) {
		return <Skeleton isSvg size={size} />;
	}

	const SIZE_CLASSES = {
		sm: "p-2 text-xs",
		md: "p-4 text-sm",
		lg: "p-6 text-base",
	};

	return (
		<li
			className={`flex items-center justify-between ${SIZE_CLASSES[size]} gap-6`}
			aria-labelledby={`product-${title}`}>
			{/* Image */}
			{coverImage && (
				<div className="hidden sm:block h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
					<img
						alt={title || "Product Image"}
						src={coverImage?.url || "/placeholder.jpg"}
						className="h-full w-full object-cover object-center"
						loading="lazy"
						onError={(e) => {
							e.target.src = "/placeholder.jpg";
						}}
					/>
				</div>
			)}

			{/* Info */}
			<div className="flex-1 flex flex-col items-start justify-between gap-1">
				{title && (
					<h3 id={`product-${title}`} className="font-medium text-blue-950">
						{title}
					</h3>
				)}
				{category && (
					<p className="text-gray-500">
						Category: <Strong item={category} />
					</p>
				)}
				{price && (
					<p className="text-gray-500">
						Price: <Strong item={formatCurrency(price)} />
					</p>
				)}
			</div>

			{/* Actions */}
			<div className="flex flex-col items-start gap-2">
				{showButtons && (
					<button
						disabled={isRemoving}
						onClick={() => removeFromCart(cartId)}
						type="button"
						className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors duration-200">
						{isRemoving ? "Removing..." : "Remove"}
					</button>
				)}

				<div className="flex items-center text-gray-500">
					<QuantityButton
						showButtons={showButtons}
						onClick={handleDecrease}
						text="-"
						disabled={quantity <= 1}
					/>

					<div className="text-center min-w-[60px]">
						Qty: <Strong item={quantity} />
					</div>

					<QuantityButton
						showButtons={showButtons}
						onClick={handleIncrease}
						text="+"
					/>
				</div>

				<p className="font-bold text-gray-500">
					Total: <Strong item={formatCurrency(price * quantity)} />
				</p>
			</div>
		</li>
	);
};

ItemInfoIndicator.propTypes = {
	title: PropTypes.string.isRequired,
	coverImage: PropTypes.shape({ url: PropTypes.string }),
	category: PropTypes.string,
	price: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
	cartId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	showButtons: PropTypes.bool,
};

export default ItemInfoIndicator;
