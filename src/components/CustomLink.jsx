import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

/**
 * Reusable styled link component with right arrow icon.
 *
 * @param {Object} props
 * @param {string} props.linkedTo - Route path (required)
 * @param {string} [props.linkText] - Link display text
 * @param {string} [props.customClass] - Additional CSS classes for customization
 */
const CustomLink = ({
	linkedTo = "/",
	linkText = "Home",
	customClass = " font-medium text-blue-600 hover:text-blue-950 ",
}) => {
	return (
		<Link
			to={linkedTo}
			className={clsx(
				"inline-flex items-center justify-center px-1 -mr-1 text-sm leading-5 transition-colors duration-200",
				customClass
			)}
			aria-label={`Navigate to ${linkText}`}>
			{linkText}
			<IoIosArrowForward className="h-4 w-4" />
		</Link>
	);
};

CustomLink.propTypes = {
	linkedTo: PropTypes.string.isRequired,
	linkText: PropTypes.string,
	customClass: PropTypes.string,
};

export default CustomLink;
