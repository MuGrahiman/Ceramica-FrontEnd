import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * EmptySpot Component
 *
 * This component displays a message when there are no items in a wishlist,
 * with customizable heading, subheading, icon, and button content.
 */
const EmptySpot = ({
	heading = "No items",
	subheading = "Start to shop",
	icon,
	buttonText = "Shop",
	buttonLink = "/Shop",
}) => {
	return (
		<div className="text-center py-8">
			{icon}
			<h3 className="mt-2 text-sm font-medium text-gray-900">{heading}</h3>
			<p className="mt-1 text-sm text-gray-500">{subheading}</p>
			<div className="mt-6">
				<Link
					to={buttonLink}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					{buttonText}
				</Link>
			</div>
		</div>
	);
};

// PropTypes for validation
EmptySpot.propTypes = {
	heading: PropTypes.string,
	subheading: PropTypes.string,
	icon: PropTypes.node,
	buttonText: PropTypes.string,
	buttonLink: PropTypes.string,
};

export default EmptySpot;
