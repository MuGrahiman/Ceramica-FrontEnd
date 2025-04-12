import { useState } from "react";

const ChangePasswordForm = () => {
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const [showForgotFlow, setShowForgotFlow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user types
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const newErrors = {};

		if (!showForgotFlow && !formData.currentPassword) {
			newErrors.currentPassword = "Current password is required";
		}

		if (!formData.newPassword) {
			newErrors.newPassword = "New password is required";
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword = "Password must be at least 8 characters";
		}

		if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			setIsLoading(true);
			// Simulate API call
			setTimeout(() => {
				setIsLoading(false);
				setSuccess(true);
				setFormData({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
			}, 1500);
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
		setErrors({});
	};

	return (
		<div className="space-y-4"
        // className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
			{/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2> */}
			<h3 className="text-lg font-medium text-gray-900 mb-3">
				Change Password
			</h3>
			{success ? (
				<div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
					Password changed successfully!
				</div>
			) : (
				<form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4"
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
										type="password"
										id="currentPassword"
										name="currentPassword"
										value={formData.currentPassword}
										onChange={handleChange}
										className={`w-full px-3 py-2 border ${
											errors.currentPassword
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
								{errors.currentPassword && (
									<p className="mt-1 text-sm text-red-600">
										{errors.currentPassword}
									</p>
								)}
							</div>
						</>
					) : (
						<div className="col-span-full mb-6 p-4 bg-blue-50 rounded-md">
							<p className="text-blue-800 mb-3">
								We've sent a password reset link to your email. Please check
								your inbox.
							</p>
							<button
								type="button"
								onClick={resetForm}
								className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
								← Back to change password
							</button>
						</div>
					)}

					<div >
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
								errors.newPassword ? "border-red-500" : "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
						/>
						{errors.newPassword && (
							<p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
						)}
						<p className="mt-1 text-xs text-gray-500">
							Must be at least 8 characters
						</p>
					</div>

					<div >
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
								errors.confirmPassword ? "border-red-500" : "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
						/>
						{errors.confirmPassword && (
							<p className="mt-1 text-sm text-red-600">
								{errors.confirmPassword}
							</p>
						)}
					</div>
             
					<div className="flex justify-end col-span-full mb-8">
						<button
							type="submit"
							disabled={isLoading}
							className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
								isLoading ? "opacity-75 cursor-not-allowed" : ""
							}`}>
							{isLoading ? "Processing..." : "Change Password"}
						</button>
					</div>

				</form>
			)}
		</div>
	);
};

export default ChangePasswordForm;
