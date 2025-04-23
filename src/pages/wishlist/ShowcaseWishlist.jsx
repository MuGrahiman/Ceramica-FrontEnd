import React from "react";
import { FaHeart } from "react-icons/fa";
import ListOptions from "../../components/ListOptions";
import ProductCard from "../../components/ProductCard";
import PropTypes from "prop-types";

/**
 * Displays the wishlist items with a loading state and an empty message if no items are found.
 * @param {boolean} isWishlistFetching - Indicates whether the wishlist items are being fetched.
 * @param {Array} wishListItems - The list of wishlist items to display.
 * @param {string} emptyWishlistMessage - The message to display if the wishlist is empty.
 */
const ShowcaseWishlist = ({
	isWishlistFetching,
	wishListItems,
	emptyWishlistMessage,
}) => {
	return (
		<div className="animate-slide-down">
			<p className="text-lg text-gray-600 mb-8 text-center max-w-md mx-auto">
				Collect the desires of your heart and make them yours today.
			</p>
			<div className="flex flex-wrap justify-center gap-6 animate-swiper-fade">
				{isWishlistFetching ? (
					<FaHeart className="text-5xl text-red-500 animate-ping mt-8" />
				) : (
					<ListOptions
						OPTIONS={wishListItems}
						RENDER_ITEM={(product) => (
							<ProductCard key={product._id} product={product.inventory} />
						)}
						EMPTY_MESSAGE={emptyWishlistMessage}
					/>
				)}
			</div>
		</div>
	);
};

ShowcaseWishlist.propTypes = {
	isWishlistFetching: PropTypes.bool.isRequired,
	wishListItems: PropTypes.array.isRequired,
	emptyWishlistMessage: PropTypes.string.isRequired,
};

export default ShowcaseWishlist;
