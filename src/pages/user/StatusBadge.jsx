import React from "react";
import PropTypes from "prop-types";

/**
 * StatusBadge - Displays user status with appropriate color coding
 * @param {string} status - User status (verified, registered, pending, blocked)
 */
const StatusBadge = ({ status = "" }) => {
	const getStatusColor = () => {
		switch (status) {
			case "verified":
				return "bg-green-100 text-green-800";
			case "registered":
				return "bg-yellow-100 text-yellow-800";
			case "pending":
				return "bg-orange-100 text-orange-800";
			case "blocked":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<span
			className={`my-2 inline-flex items-center px-4 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
			{status?.charAt(0).toUpperCase() + status?.slice(1)}
		</span>
	);
};

StatusBadge.propTypes = {
	status: PropTypes.oneOf(["verified", "registered", "pending", "blocked"])
		.isRequired,
};
export default StatusBadge;
