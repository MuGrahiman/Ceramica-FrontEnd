import PropTypes from "prop-types";
import { stringTrimmer } from "../utils/generals";
import CoverImage from "./CoverImage";

const ProductCard = ({ product }) => {
	const defaultImage = "https://via.placeholder.com/150";
	const handleImageError = (e) => {
		e.target.src = defaultImage;
	};
	return (
		<div className="bg-white transform transition-transform hover:scale-105 shadow-lg rounded-lg overflow-hidden w-full sm:w-80 md:w-[25rem] lg:w-80 xl:w-72">
			{/* <img
				src={product.coverImage.url || defaultImage}
				alt={product.title || "Product Image"}
				className="w-full h-48 object-cover"
			/> */}
			<CoverImage
				SHOW_WISHLIST
				IMAGE={product.coverImage || defaultImage}
				WIDTH={"100%"}
				HEIGHT={"12rem"}
				ON_ERROR={handleImageError}
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold">{product.title}</h3>
				<p className="text-gray-600">{`${stringTrimmer(
					product.description,
					50
				)}...`}</p>
				<p className="mt-2 font-bold">${product.price || "N/A"}</p>
				<div className="flex items-center">
					<span className="text-yellow-500">{product.price || "N/A"} ★</span>
					<span className="text-gray-400 ml-2">({product.stock})</span>
				</div>
				<button className="mt-4 bg-blue-500 text-white p-2 rounded transition-all hover:bg-blue-600">
					Add to Cart
				</button>
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	product: PropTypes.shape({
		coverImage: PropTypes.shape({
			url: PropTypes.string,
		}),
		title: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.number,
		stock: PropTypes.number,
	}).isRequired,
	onAddToCart: PropTypes.func,
};

ProductCard.defaultProps = {
	onAddToCart: () => {},
};

export default ProductCard;
