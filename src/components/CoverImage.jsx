import React from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import useWishList from "../hooks/useWishList";
import MiniLoader from "./MiniLoader";

const CoverImage = ({
	IMAGE,
	WIDTH = "100%",
	HEIGHT = "auto",
	ON_ERROR,
	SHOW_WISHLIST = false,
	ITEM_ID,
}) => {
	const { checkIdInWishlist, handleWishlistClick, isLoading, wishlistId } =
		useWishList(SHOW_WISHLIST);
	const isItemInWishlist = checkIdInWishlist(ITEM_ID);
	return (
		<div style={{ width: WIDTH, height: HEIGHT }} className="relative">
			<img
				src={IMAGE.url}
				alt={IMAGE.public_id}
				loading="lazy"
				onError={ON_ERROR}
				className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
			/>
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
								isItemInWishlist ? "fill-red-500" : "fill-white"
							} w-5 h-5 m-1 drop-shadow-lg hover:scale-110`}
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
