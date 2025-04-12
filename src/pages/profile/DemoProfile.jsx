import React, { useState } from "react";

function DemoProfile({ user }) {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user.firstName || "",
		lastName: user.lastName || "",
		email: user.email,
		status: user.status,
	});

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, this would update the user via API
		console.log("Updated user data:", formData);
		setIsEditing(false);
	};

	// Status badge colors
	const getStatusColor = (status) => {
		switch (status) {
			case "verified":
				return "bg-green-100 text-green-800";
			case "registered":
				return "bg-blue-100 text-blue-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "blocked":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	// Format date for display
	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				{/* Profile Header */}
				<div className="flex flex-col items-center mb-8 animate-fade-in">
					<div className="relative group">
						<img
							className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105"
							src={
								user.avatar?.url ||
								"https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
							}
							alt={`${user.firstName || ""} ${user.lastName || ""}`}
						/>
						<div className="absolute inset-0 rounded-full flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 opacity-0 group-hover:opacity-100">
							<span className="text-white font-medium">Change Photo</span>
						</div>
					</div>

					<h1 className="mt-4 text-3xl font-bold text-gray-900 text-center">
						{user.firstName || "New"} {user.lastName || "User"}
					</h1>

					<div className="mt-2 flex items-center space-x-2">
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
								user.status
							)}`}>
							{user.status.charAt(0).toUpperCase() + user.status.slice(1)}
						</span>
						{user.guId && (
							<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
								Google Login
							</span>
						)}
						{user.fbId && (
							<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
								Facebook Login
							</span>
						)}
					</div>
				</div>

				{/* Main Content */}
				<div className="bg-white rounded-xl shadow-xl overflow-hidden animate-slide-up">
					{/* Tabs */}
					<div className="border-b border-gray-200">
						<nav className="flex -mb-px">
							<button className="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm border-blue-500 text-blue-600">
								Profile Information
							</button>
							<button className="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
								Activity Log
							</button>
						</nav>
					</div>

					{/* Profile Content */}
					<div className="p-6 sm:p-8">
						{isEditing ? (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
									<div>
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-700">
											First Name
										</label>
										<input
											type="text"
											name="firstName"
											id="firstName"
											value={formData.firstName}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
										/>
									</div>

									<div>
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-700">
											Last Name
										</label>
										<input
											type="text"
											name="lastName"
											id="lastName"
											value={formData.lastName}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700">
										Email address
									</label>
									<input
										type="email"
										name="email"
										id="email"
										value={formData.email}
										onChange={handleChange}
										disabled
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
									/>
								</div>

								<div>
									<label
										htmlFor="status"
										className="block text-sm font-medium text-gray-700">
										Account Status
									</label>
									<select
										id="status"
										name="status"
										value={formData.status}
										onChange={handleChange}
										className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-all duration-200">
										<option value="pending">Pending</option>
										<option value="registered">Registered</option>
										<option value="verified">Verified</option>
										<option value="blocked">Blocked</option>
									</select>
								</div>

								<div className="flex justify-end space-x-3">
									<button
										type="button"
										onClick={() => setIsEditing(false)}
										className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
										Cancel
									</button>
									<button
										type="submit"
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
										Save Changes
									</button>
								</div>
							</form>
						) : (
							<div className="space-y-6">
								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
									<div>
										<h3 className="text-sm font-medium text-gray-500">
											First Name
										</h3>
										<p className="mt-1 text-sm text-gray-900">
											{user.firstName || "Not provided"}
										</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-gray-500">
											Last Name
										</h3>
										<p className="mt-1 text-sm text-gray-900">
											{user.lastName || "Not provided"}
										</p>
									</div>
								</div>

								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Email address
									</h3>
									<p className="mt-1 text-sm text-gray-900">{user.email}</p>
								</div>

								<div>
									<h3 className="text-sm font-medium text-gray-500">
										Account Status
									</h3>
									<p className="mt-1 text-sm text-gray-900">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
												user.status
											)}`}>
											{user.status.charAt(0).toUpperCase() +
												user.status.slice(1)}
										</span>
									</p>
								</div>

								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
									<div>
										<h3 className="text-sm font-medium text-gray-500">
											Account Created
										</h3>
										<p className="mt-1 text-sm text-gray-900">
											{formatDate(user.createdAt)}
										</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-gray-500">
											Last Updated
										</h3>
										<p className="mt-1 text-sm text-gray-900">
											{formatDate(user.updatedAt)}
										</p>
									</div>
								</div>

								<div className="flex justify-end">
									<button
										onClick={() => setIsEditing(true)}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
										Edit Profile
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Additional Info Cards */}
				<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
					{/* Login Methods */}
					<div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md">
						<div className="px-4 py-5 sm:p-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
								Authentication Methods
							</h3>
							<div className="space-y-3">
								<div className="flex items-center">
									<div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
										<svg
											className="h-6 w-6 text-white"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-gray-900">
											Email/Password
										</p>
										<p className="text-sm text-gray-500">
											{user.password ? "Enabled" : "Not set up"}
										</p>
									</div>
								</div>
								{user.guId && (
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-red-500 rounded-md p-2">
											<svg
												className="h-6 w-6 text-white"
												fill="currentColor"
												viewBox="0 0 24 24">
												<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.699-6.735-2.699-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
											</svg>
										</div>
										<div className="ml-4">
											<p className="text-sm font-medium text-gray-900">
												Google
											</p>
											<p className="text-sm text-gray-500">Connected</p>
										</div>
									</div>
								)}
								{user.fbId && (
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-blue-600 rounded-md p-2">
											<svg
												className="h-6 w-6 text-white"
												fill="currentColor"
												viewBox="0 0 24 24">
												<path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
											</svg>
										</div>
										<div className="ml-4">
											<p className="text-sm font-medium text-gray-900">
												Facebook
											</p>
											<p className="text-sm text-gray-500">Connected</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Account Actions */}
					<div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md">
						<div className="px-4 py-5 sm:p-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
								Account Actions
							</h3>
							<div className="space-y-4">
								<button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200">
									Reset Password
								</button>
								{user.status !== "blocked" ? (
									<button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200">
										Block User
									</button>
								) : (
									<button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
										Unblock User
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Custom Animations */}
			<style jsx global>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				@keyframes slideUp {
					from {
						transform: translateY(20px);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}
				.animate-fade-in {
					animation: fadeIn 0.6s ease-out forwards;
				}
				.animate-slide-up {
					animation: slideUp 0.6s ease-out forwards;
				}
			`}</style>
		</div>
	);
}

// Example usage with sample data
DemoProfile.defaultProps = {
	user: {
		_id: "1",
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "hashedpassword",
		guId: "google123",
		fbId: null,
		status: "verified",
		avatar: {
			url: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
			public_id: "user_avatars/default",
			type: "image/jpeg",
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
};

export default DemoProfile;
