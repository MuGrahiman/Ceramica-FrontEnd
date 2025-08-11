import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

/**
 * Reusable styled link component with right arrow icon.
 *
 * @param {Object} props
 * @param {string} props.linkedTo - Route path (required)
 * @param {string} [props.linkText] - Link display text
 */
const CustomLink = ({ linkedTo = "/", linkText = "Home" }) => {
	return (
		<Link
			to={linkedTo}
			className="inline-flex items-center justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-blue-600 hover:text-blue-950 transition-colors duration-200"
			aria-label={`Navigate to ${linkText}`}>
			{linkText}
			<IoIosArrowForward className="h-4 w-4" />
		</Link>
	);
};

CustomLink.propTypes = {
	linkedTo: PropTypes.string.isRequired,
	linkText: PropTypes.string,
};

export default CustomLink;
