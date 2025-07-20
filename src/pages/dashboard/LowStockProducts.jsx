// components/LowStockProducts.jsx
import React from "react";
import PropTypes from "prop-types";
import ListContainer from "../../components/ListContainer";
import ListOptions from "../../components/ListOptions";
import { handleFileError } from "../../utils/fileHandler";

const getStockColor = (stock) =>
	stock < 3 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800";

/**
 * LowStockProductCard - Displays a card with product image, details, and stock information.
 * @param {Object} props - Component props
 * @param {string} props._id - Product ID
 * @param {string} props.title - Product name
 * @param {string} props.category - Product category
 * @param {string} props.size - Alt text for the image
 * @param {number} props.stock - Available stock quantity
 * @param {Object} props.coverImage - Object containing image URL
 * @returns {JSX.Element} A card displaying the product details or fallback UI
 */
const LowStockProductCard = ({
	_id = "",
	title = "",
	category = "",
	size = "",
	stock = 0,
	coverImage = {},
}) => (
	<li key={_id} className="py-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center space-x-3 min-w-0">
				<div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
					<img
						src={coverImage?.url}
						alt={title}
						className="h-full w-full object-cover"
						loading="lazy"
						onError={handleFileError}
					/>
				</div>
				<div className="min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">{title}</p>
					<p className="text-xs text-gray-500">
						{category} • {size}
					</p>
				</div>
			</div>
			<div className="ml-4 flex-shrink-0">
				<span
					className={`px-2 py-1 text-xs font-medium rounded-full
						 ${getStockColor(stock)}
					`}>
					{stock} left
				</span>
			</div>
		</div>
	</li>
);

LowStockProductCard.propTypes = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	stock: PropTypes.number.isRequired,
	coverImage: PropTypes.shape({
		url: PropTypes.string,
	}),
};

/**
 * LowStockProducts - Displays a list of products with low stock
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 * @returns {JSX.Element} List of low stock products
 */
const LowStockProducts = ({ products = [] }) => (
	<ListContainer divideItems scrollable containerClassName="p-2">
		<ListOptions
			OPTIONS={products}
			RENDER_ITEM={(product) => <LowStockProductCard {...product} />}
			EMPTY_MESSAGE="No low stock items currently"
		/>
	</ListContainer>
);

LowStockProducts.propTypes = {
	products: PropTypes.array.isRequired,
};

export default LowStockProducts;
