import React from "react";
import { FaHeartBroken } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * Displays an error message when the wishlist fails to load.
 * Provides a retry button to attempt loading the wishlist again.
 * @param {function} onRetry - Function to call when the retry button is clicked.
 */
const WishListError = ({ onRetry }) => {
	return (
		<div className="text-xl flex flex-col items-center justify-center min-h-96 px-4 text-center">
			<div className="relative p-6 bg-white rounded-full mb-8">
				<FaHeartBroken className="text-5xl text-red-600" />
			</div>
			<div className="font-bold flex items-center justify-center gap-3">
				Failed to load your wishlist. Please check your internet connection or
				try again later
				<div className="cursor-pointer transition animate-[bounce_1.01s_ease-in-out_infinite]">
					.
				</div>
				<div className="cursor-pointer transition animate-[bounce_1.02s_ease-in-out_infinite]">
					.
				</div>
				<div className="cursor-pointer transition animate-[bounce_1.03s_ease-in-out_infinite]">
					.
				</div>
			</div>
			<button onClick={onRetry} className="text-blue-500">
				Retry
			</button>
		</div>
	);
};

// PropTypes validation for the component's props
WishListError.propTypes = {
	onRetry: PropTypes.func.isRequired,
};

export default WishListError;
