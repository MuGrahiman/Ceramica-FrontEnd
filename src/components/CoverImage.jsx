import React from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";

const CoverImage = ({
	IMAGE,
	WIDTH = "100%",
	HEIGHT = "auto",
	ON_ERROR,
	SHOW_WISHLIST = false,
	ON_ADD_WISH,
}) => {
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
				// <div
				// 	className="absolute top-2 end-2 flex items-center justify-center bg-slate-50 rounded-full  shadow-md p-1.5 cursor-pointer m-1 hover:scale-110"
				// 	onClick={ON_ADD_WISH}>
					<button 
					onClick={ON_ADD_WISH}
                    className="absolute top-2 end-2 flex items-center justify-center bg-slate-300 rounded-full   p-1 cursor-pointer " 
                    aria-label="Add to wishlist">
						<FaHeart className="w-5 h-5 m-1 fill-slate-50 hover:scale-110" />
					</button>
				// {/* </div> */}
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
	ON_ADD_WISH: PropTypes.func,
};

export default CoverImage;
