import React from "react";
import PropTypes from "prop-types";
import { FALL_BACK_IMAGE } from "../../constants/app";
import { handleFileError } from "../../utils/fileHandler";

/**
 * User Detail Component: Displays detailed information about a user.
 *
 * @param {Object} props - Component props
 * @param {Object} props.user - The user object containing details
 * @param {string} props.user.avatar - User's avatar image object with url
 * @param {string} props.user.firstName - User's first name
 * @param {string} props.user.lastName - User's last name
 * @param {string} props.user.email - User's email address
 * @param {string} props.user.role - User's role in the system
 * @param {string} props.user.status - User's account status
 *  */
const OrderUserDetails = ({ user = {} }) => {
	if (!user) {
		return (
			<p
				className="text-gray-600 text-center py-4"
				role="status"
				aria-live="polite">
				User details not available.
			</p>
		);
	}
	const { avatar, firstName, lastName, email, status } = user;
	const fullName = `${firstName || ""} ${lastName || ""}`.trim();
	const avatarUrl = avatar?.url || FALL_BACK_IMAGE;
	const altText = fullName || "User avatar";

	return (
		<div className="flex items-center">
			<img
				src={avatarUrl}
				alt={altText}
				onError={handleFileError}
				className="w-16 h-16 rounded-full mr-4"
			/>
			<div>
				<p className="text-gray-600 font-bold">{fullName}</p>
				<p className="text-gray-600">{email}</p>
				<p className="text-gray-600">Status: {status}</p>
			</div>
		</div>
	);
};

OrderUserDetails.propTypes = {
	user: PropTypes.shape({
		avatar: PropTypes.shape({
			url: PropTypes.string,
		}),
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		email: PropTypes.string,
		role: PropTypes.string,
		status: PropTypes.string,
	}),
};

export default React.memo(OrderUserDetails);
