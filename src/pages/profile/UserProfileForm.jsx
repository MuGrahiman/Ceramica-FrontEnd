import React from "react";
import PropTypes from "prop-types";

const UserProfileForm = ({ user, handleChange }) => {
	return (
		<form className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={user?.firstName}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={user?.lastName}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Email
				</label>
				<input
					type="email"
					value={user?.email}
					className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
					disabled
				/>
			</div>
			<div className="flex justify-end pt-4">
				<button
					type="button"
					className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
					Save Changes
				</button>
			</div>
		</form>
	);
};

// Define PropTypes for the component
UserProfileForm.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default UserProfileForm;
