import React from "react";
import PropTypes from "prop-types";

const STATUS_COLOR_MAP = {
	yellow:
		"border-yellow-500 dark:border-yellow-500 hover:ring-yellow-800 text-yellow-900 dark:text-yellow-800 hover:text-yellow-300 placeholder-yellow-700 dark:placeholder-yellow-500 bg-yellow-50 dark:bg-gray-100 hover:bg-yellow-900",
	green:
		"border-green-500 dark:border-green-500 hover:ring-green-800 text-green-900 dark:text-green-800 hover:text-green-300 placeholder-green-700 dark:placeholder-green-500 bg-green-50 dark:bg-gray-100 hover:bg-green-900",
	red: "border-red-500 dark:border-red-500 hover:ring-red-800 text-red-900 dark:text-red-800 hover:text-red-300 placeholder-red-700 dark:placeholder-red-500 bg-red-50 dark:bg-gray-100 hover:bg-red-900",
	orange:
		"border-orange-500 dark:border-orange-500 hover:ring-orange-800 text-orange-900 dark:text-orange-800 hover:text-orange-300 placeholder-orange-700 dark:placeholder-orange-500 bg-orange-50 dark:bg-gray-100 hover:bg-orange-900",
	gray: "border-gray-500 dark:border-gray-500 hover:ring-gray-800 text-gray-900 dark:text-gray-800 hover:text-gray-300 placeholder-gray-700 dark:placeholder-gray-500 bg-gray-50 dark:bg-gray-100 hover:bg-gray-900",
};

/**
 * Status badge component with optional click handler
 * @param {Object} props
 * @param {string} props.label - Badge display text
 * @param {string} props.color - Color theme for the badge
 * @param {Function} props.onClick - Optional click handler
 */
const Badge = ({ label = "", color = "gray", onClick = null }) => (
	<span
		onClick={onClick}
		className={`inline-flex items-center px-2 py-1 me-2 text-sm font-medium rounded border ${
			STATUS_COLOR_MAP[color]
		} ${
			onClick && typeof onClick === "function"
				? "cursor-pointer"
				: "cursor-default"
		}`}>
		{label?.toUpperCase()}
	</span>
);

Badge.propTypes = {
	label: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

export default Badge;
