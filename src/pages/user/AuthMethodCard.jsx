import React from "react";
import PropTypes from "prop-types";

/**
 * AuthMethodCard - Displays authentication method status
 * @param {Object} method - Authentication method details
 */
const AuthMethodCard = ({
	name = "",
	isConnected = false,
	icon: Icon,
	color = "gray",
}) => {
	return (
		<div
			className={`p-4 rounded-lg border transition-all duration-200 ${
				isConnected
					? `border-${color}-200 bg-${color}-50 hover:shadow-sm`
					: "border-gray-200 bg-gray-50"
			}`}>
			<div className="flex items-center">
				<div
					className={`p-2 rounded-md transition-colors duration-200 ${
						isConnected
							? `bg-${color}-100 text-${color}-600`
							: "bg-gray-100 text-gray-500"
					}`}>
					<Icon className="h-6 w-6" />
				</div>
				<div className="ml-3">
					<h4 className="text-sm font-medium">{name}</h4>
					<p className="text-sm text-gray-500">
						{isConnected
							? name === "Email/Password"
								? "Enabled"
								: "Connected"
							: "Not connected"}
					</p>
				</div>
			</div>
		</div>
	);
};

AuthMethodCard.propTypes = {
	name: PropTypes.string.isRequired,
	isConnected: PropTypes.bool.isRequired,
	icon: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
};
export default AuthMethodCard;
