import React, { useEffect, useState } from "react";
import { formatToLocaleDateString } from "../../utils/date";
import UserDetails from "./UserDetails";
import InfoLayout from "../../components/InfoLayout";
import AddressList from "../address/AddressList";
import useAddress from "../../hooks/useAddress";
import AddressForm from "../address/AddressForm";
import UserProfileForm from "./UserProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useAuth } from "../../hooks/useAuth";
import LoadingTemplate from "../../components/LoadingTemplate";
import useUser from "../../hooks/useUser";
import { ImPencil2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
const dummyImage =
	"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
const ProfilePage = ({ user }) => {
	const { currentUser, isAuthorized } = useAuth("client");
	const [userData, setUserData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [isIMGEditing, setIsIMGEditing] = useState(false);
	const TAB = { ADDRESS: "address", PROFILE: "profile" };
	const [tab, setTab] = useState(TAB.PROFILE);
	const { userDetails, isUserLoading, userError } = useUser({
		userId: isAuthorized ? currentUser._id : null,
	});
	useEffect(() => {
		if (userDetails?.success) {
			setUserData(userDetails.data);
		}
	}, [userDetails]);

	const {
		handleSubmit,
		editAddress,
		register,
		errors,
		reset,
		addressId,
		addressList,
		addressDetails,
		isLoading,
		onSelection,
	} = useAddress();
	useEffect(() => {
		if (addressList && addressList.length) {
			onSelection(addressList[0]);
		}
	}, [addressList, isEditing]);

	const handleIsEditing = () => {
		setIsEditing(!isEditing);
		setTab(TAB.PROFILE);
	};

	if (isLoading || isUserLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching user details, please wait..." />
			</div>
		);
	}

	// Handle error state
	if (userError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching user detail. Please try again later.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen  container mx-auto py-8 px-4 ">
			<div className="max-w-6xl mx-auto">
				{/* Profile Header with Floating Animation */}
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-float mb-6">
					<div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
						<div className="absolute -bottom-16 left-6">
							<div className="relative group">
								<img
									className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl "
									src={userData.profilePhoto || dummyImage}
									alt={`
										${userData.firstName || "N/A"} 
										${userData.lastName || "N/A"}
										`}
								/>
								{/* Editing Badge */}
								<div
									onClick={() => setIsIMGEditing(!isIMGEditing)}
									className={`absolute bottom-0 right-0 rounded-full p-2 border-2  
										 ${isIMGEditing ? "bg-emerald-500 " : "bg-blue-500"}
											 border-white animate-pulse cursor-pointer`}>
									{isIMGEditing ? (
										<FaCheck className=" text-white text-center" />
									) : (
										<ImPencil2 className=" text-white text-center" />
									)}
								</div>
							</div>
						</div>
						<div className="absolute bottom-4 right-6">
							<button
								onClick={handleIsEditing}
								className="px-4 py-2 bg-white/90 text-indigo-600 rounded-full shadow-md hover:bg-white transition-all duration-200">
								{isEditing ? "Cancel" : "Edit Profile"}
							</button>
						</div>
					</div>

					<div className="pt-20 px-6 pb-6">
						<div className="flex flex-col items-center sm:items-start gap-2">
							<h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
								{userData.firstName || "N/A"} {userData.lastName || "N/A"}
							</h1>
							<p className="text-gray-600 mt-2">{userData.email || "N/A"}</p>
							{userData.otpVerified && (
								<span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
									Verified Account
								</span>
							)}
							{/* <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
									{userData.membership || "Standard Member"}
								</span>
								{userData.otpVerified && (
									<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
										Verified Account
									</span>
								)}
							</div> */}
						</div>
					</div>
				</div>

				{/* Main Content */}
				{/* Left Column - Profile Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
					{/* Personal Information Card */}
					<div className=" lg:col-span-2 order-2 md:order-1 ">
						{isEditing ? (
							<div className=" bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
								{/* Tab Switches  */}
								<div className="border-b border-gray-200">
									<nav className="flex -mb-px">
										<button
											onClick={() => setTab(TAB.PROFILE)}
											className={`w-1/2 py-4 px-1 text-center border-b-2 text-md font-semibold mt-3
											${
												tab === TAB.PROFILE
													? "border-blue-500 text-blue-600"
													: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
											}
											`}>
											Profile Log
										</button>
										<button
											onClick={() => setTab(TAB.ADDRESS)}
											className={`w-1/2 py-4 px-1 text-center border-b-2 text-md font-semibold mt-3
												${
													tab === TAB.ADDRESS
														? "border-blue-500 text-blue-600"
														: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
												}
												`}>
											Address Log
										</button>
									</nav>
								</div>
								{/* Information Tabs  */}
								<div className="px-6 py-4">
									{tab === TAB.PROFILE ? (
										<>
											<UserProfileForm user={userData} />
											<ChangePasswordForm />
										</>
									) : (
										<AddressForm
											key={addressId}
											EDIT_ADDRESS={editAddress}
											register={register}
											ADDRESS_ID={addressId}
											HANDLE_SUBMIT={handleSubmit}
											RESET={reset}
											ERRORS={errors}
											IS_LOADING={isLoading}
										/>
									)}
								</div>
							</div>
						) : (
							// {/* Personal Information */}
							<InfoLayout
								icon={() => (
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
								)}
								title="Personal Information">
								<UserDetails user={userData} address={addressDetails} />
							</InfoLayout>
						)}
					</div>
					{/* Address List Card */}
					<div className="col-span-1 md:col-span-1 lg:col-span-1 order-1 md:order-2 ">
						<InfoLayout title="Saved Addresses">
							<AddressList
								ADDRESS_LIST={addressList}
								IS_LOADING={isLoading}
								ON_SELECTION={(address) => !isEditing || onSelection(address)}
								ADDRESS_ID={addressId}
							/>
						</InfoLayout>
					</div>
				</div>

				{/* Right Column */}
				<div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-6 ">
					{/* Order History Card */}
					<div className="col-span-1  w-full">
						<InfoLayout
							title="Recent Orders"
							icon={() => (
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
							)}>
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
															{formatToLocaleDateString(order.date)}
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
						</InfoLayout>
					</div>

					{/* Wishlist Card */}
					<div className="col-span-1	w-full">
						<InfoLayout
							title="Your Wishlist"
							icon={() => (
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
							)}>
							<div className="px-6 py-4">
								{user.wishlist?.length > 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
										{user.wishlist.slice(0, 4).map((item, index) => (
											<div key={index} className="group relative">
												<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg ">
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
						</InfoLayout>
					</div>
				</div>
			</div>
		</div>
	);
};
// Default props with sample data
ProfilePage.defaultProps = {
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

export default ProfilePage;
