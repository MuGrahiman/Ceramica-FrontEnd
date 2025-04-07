import React from "react";
import PropTypes from "prop-types";
import MiniLoader from "../../components/MiniLoader";

/**
 * BlockToggleButton - Button to toggle user block status
 * @param {boolean} isBlocked - Current blocked status
 * @param {boolean} isUpdating - Loading state
 * @param {function} onClick - Click handler
 */
const BlockToggleButton = ({
	isBlocked = false,
	isUpdating = false,
	onClick,
}) => {
	return isUpdating ? (
		<MiniLoader />
	) : (
		<button
			onClick={onClick}
			disabled={isUpdating}
			className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
				isBlocked
					? "bg-green-100 text-green-800 hover:bg-green-200"
					: "bg-red-100 text-red-800 hover:bg-red-200"
			}`}>
			{isBlocked ? "Unblock User" : "Block User"}
		</button>
	);
};
BlockToggleButton.propTypes = {
	isBlocked: PropTypes.bool.isRequired,
	isUpdating: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};
export default BlockToggleButton;

