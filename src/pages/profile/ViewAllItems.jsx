import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Displays a link to view all items of a specific type.
 * @param {number} length - The number of items to display in the link text.
 * @param {string} link - The URL to navigate to when the link is clicked.
 * @param {string} [text='items'] - The type of items being viewed (e.g., 'orders', 'items').
 */
const ViewAllItems = ({ length, link, text = "items" }) => {
	return (
		<div className="mt-6 text-center">
			<Link
				to={link}
				className="text-indigo-600 hover:text-indigo-800 font-medium">
				View all {length} {text}
			</Link>
		</div>
	);
};

ViewAllItems.propTypes = {
	length: PropTypes.number.isRequired,
	link: PropTypes.string.isRequired,
	text: PropTypes.string,
};

export default ViewAllItems;
