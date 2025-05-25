import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/generals";

/**
 * Product image component with fallback
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 */
const ProductImage = ({ src, alt }) => (
	<div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
		<img
			src={src || "default-product-image.jpg"}
			alt={alt || "default-product-image.jpg"}
			className="w-full h-full object-cover object-center"
			onError={(e) => {
				e.target.src = "default-product-image.jpg";
			}}
		/>
	</div>
);
ProductImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};

/**
 * Displays a product summary card with image, title, price, and quantity
 * @param {Object} props - Component props
 * @param {Object} props.image - Product image object
 * @param {string} props.image.url - Image source URL
 * @param {string} props.image.alt - Image alt text
 * @param {string} props.title - Product title
 * @param {number} props.price - Product unit price
 * @param {number} props.quantity - Product quantity
 * @returns {React.Element} Product summary card component
 */
const TotalPreviewCard = ({ image, title, price, quantity }) => {
	return (
		<li className="p-4" aria-labelledby={`product-${title}`}>
			<div className="sm:flex items-start sm:items-center gap-4">
				<ProductImage src={image?.url} alt={image?.public_id || title} />

				<div className="mt-4 sm:mt-0 flex-1">
					<div className="flex items-center justify-between">
						<h3
							id={`product-${title}`}
							className="text-base font-medium text-gray-900">
							{title}
						</h3>
						<p className="text-sm text-gray-500">
							Price: {formatCurrency(price)}
						</p>
					</div>

					<div className="mt-2 flex items-center justify-between">
						<p className="text-sm text-gray-500">Quantity: {quantity}</p>
						<p className="font-medium text-gray-900">
							Total: {formatCurrency(price * quantity)}
						</p>
					</div>
				</div>
			</div>
		</li>
	);
};

TotalPreviewCard.propTypes = {
	image: PropTypes.shape({
		url: PropTypes.string,
		public_id: PropTypes.string,
	}),
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
};

export default React.memo(TotalPreviewCard);
