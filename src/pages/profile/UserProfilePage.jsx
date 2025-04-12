import { useState } from "react";

const UserProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("profile");
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone || "",
		address: user.address || {
			street: "",
			city: "",
			state: "",
			zip: "",
			country: "",
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			address: {
				...prev.address,
				[name]: value,
			},
		}));
	};

	return (
		<div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Profile Header with Floating Animation */}
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-float">
					<div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
						<div className="absolute -bottom-16 left-6">
							<div className="relative group">
								<img
									className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl transition-all duration-300 group-hover:scale-105"
									src={user.profilePhoto}
									alt={`${user.firstName} ${user.lastName}`}
								/>
								{/* Verification Badge */}
								{user.otpVerified && (
									<div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2 border-2 border-white animate-pulse">
										<svg
											className="h-5 w-5 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
								)}
							</div>
						</div>
						<div className="absolute bottom-4 right-6">
							<button
								onClick={() => setIsEditing(!isEditing)}
								className="px-4 py-2 bg-white/90 text-indigo-600 rounded-full shadow-md hover:bg-white transition-all duration-200">
								{isEditing ? "Cancel" : "Edit Profile"}
							</button>
						</div>
					</div>

					<div className="pt-20 px-6 pb-6">
						<div className="flex flex-col items-center sm:items-start">
							<h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
								{user.firstName} {user.lastName}
							</h1>
							<p className="text-gray-600 mt-2">{user.email}</p>

							<div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
									{user.membership || "Standard Member"}
								</span>
								{user.otpVerified && (
									<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
										Verified Account
									</span>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Profile Info */}
					<div className="lg:col-span-2 space-y-6">
						{/* Personal Information Card */}
						<div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
							<div className="px-6 py-5 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-900">
									<svg
										className="h-6 w-6 text-indigo-600 inline-block mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									Personal Information
								</h2>
							</div>
							<div className="px-6 py-4">
								{isEditing ? (
									<form className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													First Name
												</label>
												<input
													type="text"
													name="firstName"
													value={formData.firstName}
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
													value={formData.lastName}
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
												value={user.email}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
												disabled
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Phone Number
											</label>
											<input
												type="tel"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
											/>
										</div>
										<div className="pt-4">
											<h3 className="text-lg font-medium text-gray-900 mb-3">
												Address
											</h3>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Street
													</label>
													<input
														type="text"
														name="street"
														value={formData.address.street}
														onChange={handleAddressChange}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														City
													</label>
													<input
														type="text"
														name="city"
														value={formData.address.city}
														onChange={handleAddressChange}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														State/Province
													</label>
													<input
														type="text"
														name="state"
														value={formData.address.state}
														onChange={handleAddressChange}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-1">
														ZIP/Postal Code
													</label>
													<input
														type="text"
														name="zip"
														value={formData.address.zip}
														onChange={handleAddressChange}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
													/>
												</div>
												<div className="md:col-span-2">
													<label className="block text-sm font-medium text-gray-700 mb-1">
														Country
													</label>
													<input
														type="text"
														name="country"
														value={formData.address.country}
														onChange={handleAddressChange}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
													/>
												</div>
											</div>
										</div>
										<div className="flex justify-end pt-4">
											<button
												type="button"
												className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
												Save Changes
											</button>
										</div>
									</form>
								) : (
									<div className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<p className="text-sm font-medium text-gray-500">
													First Name
												</p>
												<p className="mt-1 text-gray-900">{user.firstName}</p>
											</div>
											<div>
												<p className="text-sm font-medium text-gray-500">
													Last Name
												</p>
												<p className="mt-1 text-gray-900">{user.lastName}</p>
											</div>
										</div>
										<div>
											<p className="text-sm font-medium text-gray-500">Email</p>
											<p className="mt-1 text-gray-900">{user.email}</p>
										</div>
										{formData.phone && (
											<div>
												<p className="text-sm font-medium text-gray-500">
													Phone Number
												</p>
												<p className="mt-1 text-gray-900">{formData.phone}</p>
											</div>
										)}
										{formData.address.street && (
											<div className="pt-4">
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													Address
												</h3>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div>
														<p className="text-sm font-medium text-gray-500">
															Street
														</p>
														<p className="mt-1 text-gray-900">
															{formData.address.street}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															City
														</p>
														<p className="mt-1 text-gray-900">
															{formData.address.city}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															State/Province
														</p>
														<p className="mt-1 text-gray-900">
															{formData.address.state}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															ZIP/Postal Code
														</p>
														<p className="mt-1 text-gray-900">
															{formData.address.zip}
														</p>
													</div>
													<div className="md:col-span-2">
														<p className="text-sm font-medium text-gray-500">
															Country
														</p>
														<p className="mt-1 text-gray-900">
															{formData.address.country}
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Wishlist Card */}
						<div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
							<div className="px-6 py-5 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-900">
									<svg
										className="h-6 w-6 text-indigo-600 inline-block mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
									Your Wishlist
								</h2>
							</div>
							<div className="px-6 py-4">
								{user.wishlist?.length > 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
										{user.wishlist.slice(0, 4).map((item, index) => (
											<div key={index} className="group relative">
												<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
													<img
														src={item.image}
														alt={item.name}
														className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
													/>
												</div>
												<p className="mt-2 text-sm font-medium text-gray-900 truncate">
													{item.name}
												</p>
												<p className="text-sm text-gray-500">${item.price}</p>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-8">
										<svg
											className="mx-auto h-12 w-12 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
										<h3 className="mt-2 text-sm font-medium text-gray-900">
											No items in wishlist
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											Start saving items you love
										</p>
										<div className="mt-6">
											<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												Browse Products
											</button>
										</div>
									</div>
								)}
								{user.wishlist?.length > 4 && (
									<div className="mt-6 text-center">
										<button className="text-indigo-600 hover:text-indigo-800 font-medium">
											View all {user.wishlist.length} items
										</button>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="space-y-6">
						{/* Order History Card */}
						<div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
							<div className="px-6 py-5 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-900">
									<svg
										className="h-6 w-6 text-indigo-600 inline-block mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
										/>
									</svg>
									Recent Orders
								</h2>
							</div>
							<div className="px-6 py-4">
								{user.orders?.length > 0 ? (
									<ul className="divide-y divide-gray-200">
										{user.orders.slice(0, 3).map((order, index) => (
											<li key={index} className="py-4">
												<div className="flex items-center justify-between">
													<div>
														<p className="text-sm font-medium text-indigo-600">
															Order #{order.orderNumber}
														</p>
														<p className="text-sm text-gray-500">
															{formatDate(order.date)}
														</p>
													</div>
													<div className="text-right">
														<p className="text-sm font-medium text-gray-900">
															${order.total}
														</p>
														<p
															className={`text-xs font-medium ${
																order.status === "delivered"
																	? "text-green-600"
																	: order.status === "shipped"
																	? "text-blue-600"
																	: "text-yellow-600"
															}`}>
															{order.status.charAt(0).toUpperCase() +
																order.status.slice(1)}
														</p>
													</div>
												</div>
											</li>
										))}
									</ul>
								) : (
									<div className="text-center py-8">
										<svg
											className="mx-auto h-12 w-12 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1}
												d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
											/>
										</svg>
										<h3 className="mt-2 text-sm font-medium text-gray-900">
											No orders yet
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											Your order history will appear here
										</p>
										<div className="mt-6">
											<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												Start Shopping
											</button>
										</div>
									</div>
								)}
								{user.orders?.length > 3 && (
									<div className="mt-4 text-center">
										<button className="text-indigo-600 hover:text-indigo-800 font-medium">
											View all {user.orders.length} orders
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Account Security Card */}
						<div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
							<div className="px-6 py-5 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-900">
									<svg
										className="h-6 w-6 text-indigo-600 inline-block mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
									Account Security
								</h2>
							</div>
							<div className="px-6 py-4">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-medium">Password</h3>
											<p className="text-sm text-gray-500">
												Last changed 3 months ago
											</p>
										</div>
										<button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
											Change
										</button>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-medium">Two-Factor Authentication</h3>
											<p className="text-sm text-gray-500">
												{user.otpVerified ? "Active" : "Not active"}
											</p>
										</div>
										<button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
											{user.otpVerified ? "Manage" : "Enable"}
										</button>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-medium">Connected Devices</h3>
											<p className="text-sm text-gray-500">2 active sessions</p>
										</div>
										<button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
											View
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Membership Card */}
						<div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
							<div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600">
								<h2 className="text-xl font-semibold text-white">
									<svg
										className="h-6 w-6 text-white inline-block mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
									Your Membership
								</h2>
							</div>
							<div className="px-6 py-4">
								<div className="text-center">
									<h3 className="text-lg font-medium text-gray-900">
										{user.membership || "Standard Member"}
									</h3>
									<p className="mt-2 text-gray-600">
										{user.membership
											? "Enjoy your exclusive benefits!"
											: "Upgrade for exclusive benefits"}
									</p>
									<div className="mt-6">
										<button className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											{user.membership ? "Manage Membership" : "Upgrade Now"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Custom Animations */}
			<style jsx global>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-5px);
					}
				}
				.animate-float {
					animation: float 6s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
};

// Helper function to format dates
function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Default props with sample data
UserProfile.defaultProps = {
	user: {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		profilePhoto:
			"https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
		otpVerified: true,
		phone: "+1 (555) 123-4567",
		address: {
			street: "123 Main St",
			city: "New York",
			state: "NY",
			zip: "10001",
			country: "United States",
		},
		wishlist: [
			{
				id: "1",
				name: "Wireless Headphones",
				price: 199.99,
				image:
					"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			},
			{
				id: "2",
				name: "Smart Watch",
				price: 249.99,
				image:
					"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			},
		],
		orders: [
			{
				orderNumber: "ORD-12345",
				date: new Date(Date.now() - 86400000),
				total: 149.98,
				status: "delivered",
			},
			{
				orderNumber: "ORD-12344",
				date: new Date(Date.now() - 259200000),
				total: 89.99,
				status: "shipped",
			},
		],
		membership: "Premium",
	},
};

export default UserProfile;
