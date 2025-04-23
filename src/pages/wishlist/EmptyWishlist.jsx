import React from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Displays a message when the wishlist is empty and provides a link to the shop.
 * @param {string} emptyWishlistMessage - The message to display when the wishlist is empty.
 */
const EmptyWishlist = ({ emptyWishlistMessage }) => {
	return (
		<div className="flex flex-col items-center justify-center px-4 text-center animate-slide-down">
			<div className="relative mb-8">
				<div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-red-300 rounded-full animate-ping opacity-75"></div>
				<div className="relative p-6 bg-white rounded-full">
					<FaHeart className="text-5xl text-red-500 " />
				</div>
			</div>
			<strong className="text-xl font-bold text-gray-800 mb-3">
				{emptyWishlistMessage}
			</strong>
			<p className="text-lg text-gray-600 max-w-md mb-8">
				Save your favorite items here to keep track of what you love!
			</p>
			<Link
				to={"/shop"}
				className="
          flex items-center gap-2 px-8 py-3
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white rounded-lg shadow-lg
          hover:scale-105 hover:shadow-xl
          active:scale-95
          transition-all duration-300
        ">
				<FaSearch />
				<span>Discover Products</span>
			</Link>
		</div>
	);
};

EmptyWishlist.propTypes = {
	emptyWishlistMessage: PropTypes.string.isRequired,
};

export default EmptyWishlist;
