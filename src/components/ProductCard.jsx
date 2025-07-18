import PropTypes from "prop-types";
import { stringTrimmer } from "../utils/generals";
import CoverImage from "./CoverImage";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
const defaultImage = "https://via.placeholder.com/150";

const ProductCard = ({ product }) => {
	const { addToCart, isAdding } = useCart();
	const handleImageError = (e) => {
		e.target.src = defaultImage;
	};

	return (
		<div className="flex-shrink-0 bg-white transform transition-transform shadow-lg hover:shadow-2xl rounded-lg overflow-hidden w-full sm:w-80 md:w-[25rem] lg:w-80 xl:w-72 min-h-[26rem] max-h-[26rem] flex flex-col">
			<CoverImage
				SHOW_WISHLIST
				IMAGE={product.coverImage || defaultImage}
				WIDTH={"100%"}
				HEIGHT={"12rem"}
				ON_ERROR={handleImageError}
				ITEM_ID={product._id}
			/>
			<Link
				to={`/shop/${product._id}`}
				className="p-4 flex-grow flex flex-col justify-between">
				<h3 className="text-lg font-semibold">{product.title}</h3>
				<div className="flex items-center gap-1.5">
					{/* Rating Stars */}
					<StarRating
						size="sm"
						ratingValue={product.averageRating || 0}
						defaultClass="text-gray-300 fill-current"
					/>

					{/* Numerical Rating */}
					<span className="text-sm font-medium text-amber-700">
						{product?.averageRating?.toFixed(1) || 0}
					</span>

					{/* Review Count */}
					<span className="text-xs text-gray-500">
						({product?.totalCount || 0}{" "}
						{product?.totalCount === 1 ? "review" : "reviews"})
					</span>
				</div>

				<p className="text-gray-600">{`${stringTrimmer(
					product.description,
					50
				)}...`}</p>
				<p className="mt-2 font-bold">${product.price || "N/A"}</p>
			</Link>
			<button
				disabled={isAdding}
				onClick={() => addToCart(product._id)}
				className="mt-4 bg-blue-500 text-white p-2 rounded-b transition-all hover:bg-blue-600 hover:scale-105 ">
				Add to Cart {isAdding && "..."}
			</button>
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
		_id: PropTypes.string.isRequired,
		averageRating: PropTypes.number,
		totalCount: PropTypes.number,
	}).isRequired,
	onAddToCart: PropTypes.func,
};

export default ProductCard;
