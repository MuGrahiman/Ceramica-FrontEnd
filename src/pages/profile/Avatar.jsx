import React from "react";
import PropTypes from "prop-types";
const dummyImage =
	"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

	/**
 * Displays an avatar image with a default fallback.
 * @param {string} [imgLink=""] - The URL of the image to display.
 * @param {string} [imgAlt="dummyImage"] - The alt text for the image.
 * @returns {JSX} - The avatar image.
 */
	const Avatar = ({ imgLink = "", imgAlt = "dummyImage" }) => {
	return (
		<img
			className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl  animate-fade-in"
			src={imgLink || dummyImage}
			alt={imgAlt}
		/>
	);
};

Avatar.propTypes = {
	imgLink: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
};

export default Avatar;
