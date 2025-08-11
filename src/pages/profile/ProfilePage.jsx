import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserDetails from "./UserDetails";
import InfoLayout from "../../components/InfoLayout";
import AddressList from "../address/AddressList";
import useAddress from "../../hooks/useAddress";
import AddressForm from "../address/AddressForm";
import UserProfileForm from "./UserProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useAuth } from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import ProfileHeader from "./ProfileHeader";
import TabSwitcher from "../../components/TabSwitcher";
import useWishList from "../../hooks/useWishList";
import WishlistDetails from "./WishlistDetails";
import OrderDetails from "./OrderDetails";
import useOrder from "../../hooks/useOrder";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { FaRegAddressCard, FaRegHeart, FaRegUser } from "react-icons/fa";
import CustomLink from "../../components/CustomLink";
import { createDefaultState } from "../../utils/generals";
import { PROFILE_EDIT_FIELDS, PROFILE_TAB } from "../../constants/profile";
import { USER_ROLES } from "../../constants/app";
import { handleAndShowError } from "../../utils/errorHandlers";
import EditToggler from "./EditToggler";
import { TbShoppingBagCheck } from "react-icons/tb";

const ProfilePage = () => {
	const setDefaultState = (value) =>
		createDefaultState(Object.values(PROFILE_EDIT_FIELDS), value);

	const [selectedTab, setSelectedTab] = useState(PROFILE_TAB.PROFILE);
	const [editState, setEditState] = useState(setDefaultState(false));

	const toggleEditMode = useCallback((field, value = false) => {
		setEditState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	}, []);

	const { currentUser } = useAuth(USER_ROLES.CLIENT);
	const userId = currentUser ? currentUser._id : null;

	const {
		userData,
		isUserLoading,
		updateUser,
		updateUserResult,
		updatePassword,
		updatePasswordResult,
		forgotPassword,
		forgotPasswordResult,
	} = useUser({
		userId,
	});

	const {
		handleSubmit,
		editAddress,
		deleteAddress,
		register,
		errors,
		reset,
		addressId,
		addressList,
		isAddressLoading,
		isAddressFetching,
		onSelection,
	} = useAddress();

	const { wishListItems, isWishListLoading } = useWishList();

	const { ordersData, isOrdersLoading } = useOrder(USER_ROLES.CLIENT);

	useEffect(() => {
		const isEditingAddress = editState.isEditAddress;

		setSelectedTab(
			isEditingAddress ? PROFILE_TAB.ADDRESS : PROFILE_TAB.PROFILE
		);

		if (isEditingAddress && addressList.length > 0) {
			onSelection(addressList[0]);
		}
	}, [editState.isEditAddress, addressList]);

	const handleIsEditAddress = () => {
		toggleEditMode(PROFILE_EDIT_FIELDS.ADDRESS, !editState.isEditAddress);
		toggleEditMode(PROFILE_EDIT_FIELDS.PROFILE, !editState.isEditAddress);
	};

	const handleSelectTab = (key) => {
		if (key === PROFILE_TAB.ADDRESS) {
			toggleEditMode(PROFILE_EDIT_FIELDS.ADDRESS, true);
			// toggleEditMode(PROFILE_EDIT_FIELDS.PROFILE, true);
			// setSelectedTab(PROFILE_TAB.ADDRESS);
		}
		setSelectedTab(key);
	};

	const submitHandler = async (mutateFn, data, successMsg, errorMsg) => {
		await mutateFn(data, {
			onSuccess: () => successMsg,
			onError: (err) => handleAndShowError(err, errorMsg),
		});
	};

	const handleUpdateUser = async (data) =>
		submitHandler(
			updateUser,
			data,
			"Account updated successfully ",
			"Failed to update your Account. Please try again."
		);

	const handleUpdatePassword = async (data) =>
		submitHandler(
			updatePassword,
			data,
			"Password updated successfully ",
			"Failed to update your Password. Please try again."
		);

	const handleForgotPassword = async () =>
		submitHandler(
			forgotPassword,
			{ email: currentUser.email },
			"Sent password reset link successfully ",
			"Failed to Sent password reset link. Please try again."
		);

	const isLoading = useMemo(
		() =>
			isUserLoading ||
			isAddressFetching ||
			isWishListLoading ||
			isOrdersLoading,
		[isUserLoading, isAddressFetching, isWishListLoading, isOrdersLoading]
	);

	const isEditing = useMemo(
		() => Object.values(editState).some((value) => value === true),
		[editState]
	);

	return (
		<LoadingErrorBoundary isLoading={isLoading}>
			<div className="min-h-screen  container mx-auto py-8 px-4 ">
				<div className="max-w-6xl mx-auto">
					{/* Profile Header with Floating Animation */}
					<ProfileHeader
						user={userData}
						isEditing={isEditing}
						isAvatarEditing={editState.isEditImage}
						isAvatarUpdating={updateUserResult.isLoading}
						onEditing={() => setEditState(setDefaultState(!isEditing))}
						onAvatarEditing={() =>
							toggleEditMode(PROFILE_EDIT_FIELDS.IMAGE, !editState.isEditImage)
						}
						onAvatarSubmit={handleUpdateUser}
					/>
					{/* Main Content */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
						<div className=" lg:col-span-2 order-2 md:order-1 ">
							{editState.isEditProfile ? (
								<div className=" bg-white h-full rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
									{/* Tab Switches  */}
									<TabSwitcher
										tabs={[
											{ label: "Profile Log", key: PROFILE_TAB.PROFILE },
											{ label: "Address Log", key: PROFILE_TAB.ADDRESS },
										]}
										activeTab={selectedTab}
										onSelectTab={handleSelectTab}
									/>
									{/* Information Tabs  */}
									<div className="px-6 py-4">
										{selectedTab === PROFILE_TAB.PROFILE ? (
											<React.Fragment>
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
											</React.Fragment>
										) : (
											<AddressForm
												key={addressId}
												EDIT_ADDRESS={editAddress}
												register={register}
												ADDRESS_ID={addressId}
												HANDLE_SUBMIT={handleSubmit}
												RESET={reset}
												ERRORS={errors}
												IS_LOADING={isAddressLoading}
											/>
										)}
									</div>
								</div>
							) : (
								// {/* Personal Information */}
								<InfoLayout
									leftComponent={
										<FaRegUser className="h-6 w-6  text-indigo-600 inline-block mr-2" />
									}
									rightComponent={
										<EditToggler
											isEditing={editState.isEditProfile}
											onClose={() =>
												toggleEditMode(PROFILE_EDIT_FIELDS.PROFILE, false)
											}
											onEdit={() =>
												toggleEditMode(PROFILE_EDIT_FIELDS.PROFILE, true)
											}
										/>
									}
									title="Personal Information">
									<UserDetails user={userData} address={addressList[0]} />
								</InfoLayout>
							)}
						</div>
						{/* Address List Card */}
						<div className="col-span-1 md:col-span-1 lg:col-span-1 order-1 md:order-2 ">
							<InfoLayout
								title="Saved Addresses"
								leftComponent={
									<FaRegAddressCard className="h-6 w-6  text-indigo-600 inline-block mr-2" />
								}
								rightComponent={
									<EditToggler
										isEditing={editState.isEditAddress}
										onClose={handleIsEditAddress}
										onEdit={handleIsEditAddress}
									/>
								}>
								<AddressList
									ADDRESS_LIST={addressList}
									IS_LOADING={isAddressLoading}
									ON_SELECTION={(address) =>
										!editState.isEditAddress || onSelection(address)
									}
									ON_DELETE={deleteAddress}
									ADDRESS_ID={addressId}
									EDIT_MODE={editState.isEditAddress}
								/>
							</InfoLayout>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-6 ">
						{/* Order History Card */}
						<div className="col-span-1  w-full">
							<InfoLayout
								title="Recent Orders"
								rightComponent={
									<CustomLink linkedTo="/orders" linkText="View All" />
								}
								leftComponent={
									<TbShoppingBagCheck className="h-6 w-6 text-indigo-600 inline-block mr-2" />
								}>
								<OrderDetails orders={ordersData} />
							</InfoLayout>
						</div>

						{/* Wishlist Card */}
						<div className="col-span-1	w-full">
							<InfoLayout
								title="Your Wishlist"
								rightComponent={
									<CustomLink linkedTo="/wishlist" linkText="View All" />
								}
								showLink
								leftComponent={
									<FaRegHeart className="h-6 w-6 text-indigo-600 inline-block mr-2" />
								}>
								<WishlistDetails wishListItems={wishListItems} />
							</InfoLayout>
						</div>
					</div>
				</div>
			</div>
		</LoadingErrorBoundary>
	);
};

export default ProfilePage;
