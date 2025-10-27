import React, { useCallback, useMemo } from "react";
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
import { createDefaultState, submitHandler } from "../../utils/generals";
import { PROFILE_TABS_ARRAY } from "../../constants/profile";
import { USER_ROLES } from "../../constants/app";
import EditToggler from "./EditToggler";
import { TbShoppingBagCheck } from "react-icons/tb";
import useToggle from "../../hooks/useToggle";
import { PROFILE_TABS, PROFILE_EDIT_FIELDS } from "../../constants/toggle";

/**
 * ProfilePage - Comprehensive user profile management page with tabs for profile editing,
 * address management, order history, and wishlist.
 */
const ProfilePage = () => {
	// Helper functions for default states
	const setDefaultEditState = useCallback(
		(value) => createDefaultState(Object.values(PROFILE_EDIT_FIELDS), value),
		[]
	);

	const setDefaultTab = useCallback(
		(tab) =>
			createDefaultState(Object.values(PROFILE_TABS), false, {
				[tab]: true,
			}),
		[]
	);

	const { userId, currentUser } = useAuth(USER_ROLES.CLIENT);

	// User data and operations
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
		userRole: USER_ROLES.CLIENT,
	});

	// Address management
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

	// Wishlist data
	const { wishListItems, isWishListLoading } = useWishList();

	// Order history
	const { ordersData, isOrdersLoading } = useOrder(USER_ROLES.CLIENT);

	// Toggle states for editing modes and tabs
	const [setEditingMode, isEditingMode, resetEditingMode, editingModeStates] =
		useToggle(setDefaultEditState(false));

	const [, isSelectedTab, resetSelectedTab, selectedTabs] = useToggle(
		setDefaultTab(PROFILE_TABS.PROFILE)
	);

	// Derived states
	const isLoading = useMemo(
		() =>
			isUserLoading ||
			isAddressFetching ||
			isWishListLoading ||
			isOrdersLoading,
		[isUserLoading, isAddressFetching, isWishListLoading, isOrdersLoading]
	);

	const isEditing = useMemo(
		() => Object.values(editingModeStates).some(Boolean),
		[editingModeStates]
	);

	const activeTab = useMemo(
		() => Object.keys(selectedTabs).find(isSelectedTab),
		[selectedTabs, isSelectedTab]
	);

	const isInEditMode =
		isEditingMode(PROFILE_EDIT_FIELDS.PROFILE) ||
		isEditingMode(PROFILE_EDIT_FIELDS.ADDRESS);

	/**
	 * Handles tab selection with side effects
	 * @param {string} tab - Tab key to select
	 */
	const handleSelectTab = useCallback(
		(tab) => {
			const defaultState = setDefaultTab(tab);
			resetSelectedTab(defaultState);

			// Special handling for address tab
			if (tab === PROFILE_TABS.ADDRESS && addressList.length > 0) {
				onSelection(addressList[0]);
				setEditingMode(PROFILE_EDIT_FIELDS.ADDRESS, true);
				setEditingMode(PROFILE_EDIT_FIELDS.PROFILE, true);
			}
		},
		[setDefaultTab, resetSelectedTab, addressList, onSelection, setEditingMode]
	);

	/**
	 * Toggles global edit mode
	 */
	const handleEditing = useCallback(() => {
		resetEditingMode(setDefaultEditState(!isEditing));
		if (isEditing) {
			handleSelectTab(PROFILE_TABS.PROFILE);
		}
	}, [resetEditingMode, setDefaultEditState, isEditing, handleSelectTab]);

	/**
	 * Handles address edit state toggling
	 */
	const handleEditState = useCallback(() => {
		const isEditingAddress = isEditingMode(PROFILE_EDIT_FIELDS.ADDRESS);

		if (isEditingAddress) {
			handleSelectTab(PROFILE_TABS.PROFILE);
		}

		setEditingMode(PROFILE_EDIT_FIELDS.ADDRESS, !isEditingAddress);
		setEditingMode(PROFILE_EDIT_FIELDS.PROFILE, !isEditingAddress);
	}, [isEditingMode, handleSelectTab, setEditingMode]);
	
	/**
	 * Form submission handlers
	 */
	//Handles user profile update
	const handleUpdateUser = async (data) =>
		submitHandler(
			updateUser,
			data,
			"Account updated successfully ",
			"Failed to update your Account. Please try again."
		);

	// Handles password update
	const handleUpdatePassword = async (data) =>
		submitHandler(
			updatePassword,
			data,
			"Password updated successfully ",
			"Failed to update your Password. Please try again."
		);

	// Handles forgot password
	const handleForgotPassword = async () =>
		submitHandler(
			forgotPassword,
			{ email: currentUser.email },
			"Sent password reset link successfully ",
			"Failed to Sent password reset link. Please try again."
		);

	return (
		<LoadingErrorBoundary isLoading={isLoading}>
			<div className={"min-h-screen container mx-auto py-8 px-4"}>
				<div className={"max-w-6xl mx-auto"}>
					{/* Profile Header */}
					<ProfileHeader
						user={userData}
						isEditing={isEditing}
						onEditing={handleEditing}
						isAvatarEditing={isEditingMode(PROFILE_EDIT_FIELDS.IMAGE)}
						isAvatarUpdating={updateUserResult.isLoading}
						onAvatarEditing={() => setEditingMode(PROFILE_EDIT_FIELDS.IMAGE)}
						onAvatarSubmit={handleUpdateUser}
					/>

					{/* Main Content Grid */}
					<div
						className={
							"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
						}>
						{/* Left Column - Forms and Personal Info */}
						<div className="lg:col-span-2 order-2 md:order-1">
							{isInEditMode ? (
								<div
									className={
										"bg-white h-full rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg"
									}>
									<TabSwitcher
										tabs={PROFILE_TABS_ARRAY}
										activeTab={activeTab}
										onSelectTab={handleSelectTab}
									/>
									<div className={"px-6 py-4"}>
										{isSelectedTab(PROFILE_TABS.PROFILE) && (
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
										)}
										{isSelectedTab(PROFILE_TABS.ADDRESS) && (
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
								<InfoLayout
									leftComponent={
										<FaRegUser
											className={"h-6 w-6 text-indigo-600 inline-block mr-2"}
										/>
									}
									rightComponent={
										<EditToggler
											isEditing={isEditingMode(PROFILE_EDIT_FIELDS.PROFILE)}
											onClose={() =>
												setEditingMode(PROFILE_EDIT_FIELDS.PROFILE, false)
											}
											onEdit={handleEditState}
										/>
									}
									title="Personal Information">
									<UserDetails user={userData} address={addressList[0]} />
								</InfoLayout>
							)}
						</div>

						{/* Right Column - Address List */}
						<div className="col-span-1 md:col-span-1 lg:col-span-1 order-1 md:order-2">
							<InfoLayout
								title="Saved Addresses"
								leftComponent={
									<FaRegAddressCard
										className={"h-6 w-6 text-indigo-600 inline-block mr-2"}
									/>
								}
								rightComponent={
									<EditToggler
										isEditing={isEditingMode(PROFILE_EDIT_FIELDS.ADDRESS)}
										onClose={handleEditState}
										onEdit={() => handleSelectTab(PROFILE_TABS.ADDRESS)}
									/>
								}>
								<AddressList
									ADDRESS_LIST={addressList}
									IS_LOADING={isAddressLoading}
									ON_SELECTION={(address) =>
										!isEditingMode(PROFILE_EDIT_FIELDS.ADDRESS) ||
										onSelection(address)
									}
									ON_DELETE={deleteAddress}
									ADDRESS_ID={addressId}
									EDIT_MODE={
										isEditingMode(PROFILE_EDIT_FIELDS.ADDRESS) &&
										isSelectedTab(PROFILE_TABS.ADDRESS)
									}
								/>
							</InfoLayout>
						</div>
					</div>

					{/* Bottom Grid - Orders and Wishlist */}
					<div className={"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"}>
						<div className="col-span-1 w-full">
							<InfoLayout
								title="Recent Orders"
								rightComponent={
									<CustomLink linkedTo="/orders" linkText="View All" />
								}
								leftComponent={
									<TbShoppingBagCheck
										className={"h-6 w-6 text-indigo-600 inline-block mr-2"}
									/>
								}>
								<OrderDetails orders={ordersData} />
							</InfoLayout>
						</div>

						<div className="col-span-1 w-full">
							<InfoLayout
								title="Your Wishlist"
								rightComponent={
									<CustomLink linkedTo="/wishlist" linkText="View All" />
								}
								leftComponent={
									<FaRegHeart
										className={"h-6 w-6 text-indigo-600 inline-block mr-2"}
									/>
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
