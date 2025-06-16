import React from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import useWishList from "../hooks/useWishList";
import MiniLoader from "./MiniLoader";
import { FALL_BACK_IMAGE } from "../constants/app";

/**
 * Displays a product image with optional wishlist toggle button.
 * Handles lazy-loading, error fallbacks, and wishlist state.
 * @param {Object} props
 * @param {Object} props.IMAGE - Image data {url, public_id} (required)
 * @param {string} props.ITEM_ID - Unique ID for wishlist logic (required)
 * @param {function} props.ON_ERROR - Error handler for image loading (required)
 * @param {boolean} [props.SHOW_WISHLIST=false] - Toggles wishlist button visibility
 * @param {string} [props.WIDTH="100%"] - CSS-compatible width value
 * @param {string} [props.HEIGHT="auto"] - CSS-compatible height value
 */
const CoverImage = ({
	IMAGE = {},
	WIDTH = "100%",
	HEIGHT = "auto",
	ON_ERROR = () => {},
	SHOW_WISHLIST = false,
	ITEM_ID = "",
}) => {
	const { checkIdInWishlist, handleWishlistClick, isLoading, wishlistId } =
		useWishList(SHOW_WISHLIST);
	const isItemInWishlist = checkIdInWishlist(ITEM_ID);
	return (
		<div
			key={IMAGE.public_id}
			style={{ width: WIDTH, height: HEIGHT }}
			className="relative group animate-fade-in duration-700">
			<img
				src={IMAGE.url || FALL_BACK_IMAGE}
				alt={IMAGE.public_id || "Fall back alt"}
				loading="lazy"
				onError={ON_ERROR}
				className="w-full h-full object-cover rounded-lg shadow-lg  "
			/>

			{/* Wishlist Icon  */}
			{SHOW_WISHLIST && (
				<button
					onClick={() => handleWishlistClick(ITEM_ID)}
					disabled={isLoading}
					className={`absolute top-2 end-2 flex items-center justify-center bg-blend-soft-light rounded-full p-1 cursor-pointer ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
					aria-label="Add to wishlist">
					{isLoading && ITEM_ID === wishlistId ? (
						<MiniLoader />
					) : (
						<FaHeart
							className={`${
								isItemInWishlist ? "fill-red-500 " : "fill-white "
							} animate-fade-in  w-5 h-5 m-1 drop-shadow-lg hover:scale-110 transition-transform transform `}
						/>
					)}
				</button>
			)}
		</div>
	);
};

CoverImage.propTypes = {
	IMAGE: PropTypes.shape({
		url: PropTypes.string.isRequired,
		public_id: PropTypes.string.isRequired,
	}).isRequired,
	WIDTH: PropTypes.string,
	HEIGHT: PropTypes.string,
	ON_ERROR: PropTypes.func.isRequired,
	SHOW_WISHLIST: PropTypes.bool,
	ITEM_ID: PropTypes.string.isRequired,
};

export default CoverImage;
