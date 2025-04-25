import React from "react";
import PropTypes from "prop-types";

/**
 * Displays user details and address information.
 * @param {Object} user - The user object containing details.
 * @param {Object} address - The address object containing details.
 * @returns {JSX} - The user details component.
 */
const UserDetails = ({ user = {}, address = {} }) => {
	return (
		<div className="space-y-4 px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<p className="text-sm font-medium text-gray-500">First Name</p>
					<p className="mt-1 text-gray-900">{user.firstName || "N/A"}</p>
				</div>
				<div>
					<p className="text-sm font-medium text-gray-500">Last Name</p>
					<p className="mt-1 text-gray-900">{user.lastName || "N/A"}</p>
				</div>
			</div>
			<div>
				<p className="text-sm font-medium text-gray-500">Email</p>
				<p className="mt-1 text-gray-900">{user.email || "N/A"}</p>
			</div>
			<div>
				<p className="text-sm font-medium text-gray-500">Phone Number</p>
				<p className="mt-1 text-gray-900">{address.phoneNumber || "N/A"}</p>
			</div>
			<div className="pt-4">
				<h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-medium text-gray-500">Street</p>
						<p className="mt-1 text-gray-900">{address.street || "N/A"}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">City</p>
						<p className="mt-1 text-gray-900">{address.city || "N/A"}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">State/Province</p>
						<p className="mt-1 text-gray-900">{address.state || "N/A"}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-500">ZIP/Postal Code</p>
						<p className="mt-1 text-gray-900">{address.zipCode || "N/A"}</p>
					</div>
					<div className="md:col-span-2">
						<p className="text-sm font-medium text-gray-500">Country</p>
						<p className="mt-1 text-gray-900">{address.country || "N/A"}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

UserDetails.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,

	address: PropTypes.shape({
		street: PropTypes.string.isRequired,
		phoneNumber: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		zipCode: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
	}).isRequired,
};

export default UserDetails;
