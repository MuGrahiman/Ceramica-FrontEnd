import React, { useEffect, useState } from "react";
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
import ProfileHeader from "./ProfileHeader";
import useApiHandler from "../../hooks/useApiHandler";
import {
	useForgotPasswordMutation,
	useUpdateUserMutation,
	useUpdateUserPasswordMutation,
} from "../../redux/store";
import TabSwitcher from "../../components/TabSwitcher";
import useWishList from "../../hooks/useWishList";
import WishlistDetails from "./WishlistDetails";
import OrderDetails from "./OrderDetails";
import useOrder from "../../hooks/useOrder";

const ProfilePage = () => {
	const ROLE = "client";
	// Mock data with default values
	const { isAuthorized, currentUser } = useAuth(ROLE);
	const { wishListItems } = useWishList();

	const [userData, setUserData] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const TAB = { ADDRESS: "address", PROFILE: "profile" };
	const [selectedTab, setSelectedTab] = useState(TAB.PROFILE);
	const { ordersData } = useOrder(ROLE);
	const [handleMutation] = useApiHandler();
	const [
		updateUser,
		updateUserResult, //{isLoading,isError,isSuccess}
	] = handleMutation(useUpdateUserMutation);
	const [
		updatePassword,
		updatePasswordResult, //{isLoading,isError,isSuccess}
	] = handleMutation(useUpdateUserPasswordMutation);
	const [
		forgotPassword,
		forgotPasswordResult, //{isLoading,isError,isSuccess}
	] = handleMutation(useForgotPasswordMutation);
	const userId = currentUser ? currentUser._id : null;
	const { userDetails, isUserLoading, isUserFetching, userError } = useUser({
		userId,
	});

	useEffect(() => {
		if (userDetails?.success) {
			setUserData(userDetails.data);
		}
	}, [userDetails]);

	const {
		handleSubmit,
		editAddress,
		deleteAddress,
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
		setSelectedTab(TAB.PROFILE);
	};

	const handleUpdateUser = async (data) => {
		await updateUser(data, {
			onSuccess: () => "Account updated successfully ",
			onError: (err) =>
				err.data.message ||
				err.message ||
				"Failed to update your Account. Please try again.",
		});
		handleIsEditing();
	};

	const handleUpdatePassword = async (data) => {
		await updatePassword(data, {
			onSuccess: () => {
				handleIsEditing();
				return "Password updated successfully ";
			},
			onError: (err) =>
				err.data.message ||
				err.message ||
				"Failed to update your Password. Please try again.",
		});
	};

	const handleForgotPassword = async () => {
		await forgotPassword(
			{ email: currentUser.email },
			{
				onSuccess: () => "Sent password reset link successfully ",
				onError: (err) =>
					err.data.message ||
					err.message ||
					"Failed to Sent password reset link. Please try again.",
			}
		);
	};

	if (isUserLoading) {
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
				<ProfileHeader
					user={userData}
					isEditing={isEditing}
					onEditing={handleIsEditing}
					onSubmit={handleUpdateUser}
					isUpdating={updateUserResult.isLoading}
				/>
				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
					<div className=" lg:col-span-2 order-2 md:order-1 ">
						{isEditing ? (
							<div className=" bg-white h-full rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
								{/* Tab Switches  */}
								<TabSwitcher
									tabs={[
										{ label: "Profile Log", key: TAB.PROFILE },
										{ label: "Address Log", key: TAB.ADDRESS },
									]}
									activeTab={selectedTab}
									onSelectTab={(key) => setSelectedTab(key)}
								/>
								{/* Information Tabs  */}
								<div className="px-6 py-4">
									{selectedTab === TAB.PROFILE ? (
										<>
											<UserProfileForm
												user={userData}
												isUpdating={updateUserResult.isLoading}
												onSubmit={handleUpdateUser}
											/>
											<ChangePasswordForm
												isUpdating={updatePasswordResult.isLoading}
												onSubmit={handleUpdatePassword}
												handleForgotPassword={handleForgotPassword}
												isSendingResetLink={forgotPasswordResult.isLoading}
												isSendedResetLink={forgotPasswordResult.isSuccess}
											/>
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
								ON_DELETE={deleteAddress}
								ADDRESS_ID={addressId}
								EDIT_MODE={isEditing}
							/>
						</InfoLayout>
					</div>
				</div>

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
							<OrderDetails orders={ordersData} />
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
							<WishlistDetails wishListItems={wishListItems} />
						</InfoLayout>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
