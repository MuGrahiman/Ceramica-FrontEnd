import { useState } from "react";
import PropTypes from "prop-types";
import useErrorManager from "../../hooks/useErrorManager";
import useSuccessManager from "../../hooks/useSuccessManager";
import { createDefaultState } from "../../utils/generals";

const ChangePasswordForm = ({ onSubmit, isUpdating = false }) => {
	const defaultPasswordValue = [
		"currentPassword",
		"newPassword",
		"confirmPassword",
	];
	const defaultFormValue = createDefaultState(defaultPasswordValue, "");
	const [formData, setFormData] = useState(defaultFormValue);
	const [isError, setErrors, resetErrors] = useErrorManager({
		defaultErrorValue: defaultFormValue,
	});

	const [showForgotFlow, setShowForgotFlow] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (isError[name]) {
			setErrors(name, "");
		}
	};

	const validate = () => {
		let isValid = true;
		if (!showForgotFlow && !formData.currentPassword) {
			setErrors("currentPassword", "Current password is required");
			isValid = false;
		}

		if (!formData.newPassword) {
			setErrors("newPassword", "New password is required");
			isValid = false;
		} else if (formData.newPassword.length < 8) {
			setErrors("newPassword", "Password must be at least 8 characters");
			isValid = false;
		}

		if (!formData.confirmPassword) {
			setErrors("confirmPassword", "Confirm password is required");
			isValid = false;
		} else if (formData.newPassword !== formData.confirmPassword) {
			setErrors("confirmPassword", "Passwords do not match");
			isValid = false;
		}
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			onSubmit(formData);
		}
	};

	const handleForgotPassword = () => {
		setShowForgotFlow(true);
		// In a real app, you would trigger the forgot password flow here
		// This might involve showing a modal or sending an email
		console.log("Forgot password flow initiated");
	};

	const resetForm = () => {
		setShowForgotFlow(false);
		resetErrors();
		setFormData(defaultFormValue);
	};

	return (
		<div
			className="space-y-4"
			// className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
		>
			<h3 className="text-lg font-medium text-gray-900 mb-3">
				Change Password
			</h3>

			<form
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4"
				onSubmit={handleSubmit}>
				{!showForgotFlow ? (
					<>
						<div className="mb-4 col-span-full">
							<label
								htmlFor="currentPassword"
								className="block text-sm font-medium text-gray-700 mb-1">
								Current Password
							</label>
							<div className="relative">
								<input
									type="text"
									id="currentPassword"
									name="currentPassword"
									value={formData.currentPassword}
									onChange={handleChange}
									className={`w-full px-3 py-2 border ${
										isError.currentPassword
											? "border-red-500"
											: "border-gray-300"
									} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
								/>
								<button
									type="button"
									onClick={handleForgotPassword}
									className="absolute right-2 top-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
									Forgot?
								</button>
							</div>
							{isError.currentPassword && (
								<p className="mt-1 text-sm text-red-600">
									{isError.currentPassword}
								</p>
							)}
						</div>
					</>
				) : (
					//TODO: Make it as layout ; use in the mail
					<div className="col-span-full mb-6 p-4 bg-blue-50 rounded-md">
						<p className="text-blue-800 mb-3">
							We've sent a password reset link to your email. Please check your
							inbox.
						</p>
						<button
							type="button"
							onClick={resetForm}
							className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
							← Back to change password
						</button>
					</div>
				)}

				<div>
					<label
						htmlFor="newPassword"
						className="block text-sm font-medium text-gray-700 mb-1">
						New Password
					</label>
					<input
						type="password"
						id="newPassword"
						name="newPassword"
						value={formData.newPassword}
						onChange={handleChange}
						className={`w-full px-3 py-2 border ${
							isError.newPassword ? "border-red-500" : "border-gray-300"
						} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
					/>
					{isError.newPassword && (
						<p className="mt-1 text-sm text-red-600">{isError.newPassword}</p>
					)}
					<p className="mt-1 text-xs text-gray-500">
						Must be at least 8 characters
					</p>
				</div>

				<div>
					<label
						htmlFor="confirmPassword"
						className="block text-sm font-medium text-gray-700 mb-1">
						Confirm New Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className={`w-full px-3 py-2 border ${
							isError.confirmPassword ? "border-red-500" : "border-gray-300"
						} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
					/>
					{isError.confirmPassword && (
						<p className="mt-1 text-sm text-red-600">
							{isError.confirmPassword}
						</p>
					)}
				</div>

				<div className="flex justify-end col-span-full mb-8">
					<button
						type="submit"
						disabled={isUpdating}
						className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
							isUpdating ? "opacity-75 cursor-not-allowed" : ""
						}`}>
						{isUpdating ? "Processing..." : "Change Password"}
					</button>
				</div>
			</form>
		</div>
	);
};
// Define PropTypes for the component
ChangePasswordForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	isUpdating: PropTypes.bool.isRequired,
};
export default ChangePasswordForm;
