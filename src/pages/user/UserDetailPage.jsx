import React from "react";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";
import InfoCard from "./InfoCard";
import UserInfoSection from "./UserInfoSection";
import RecentActivity from "./RecentActivity";
import AuthProviderSection from "./AuthProviderSection";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import useUser from "../../hooks/useUser";

/**
 * User detail page displaying comprehensive user information on the admin side.
 */
const UserDetailPage = () => {
	const { id } = useParams();
	const {
		userData,
		isUserLoading,
		userError,
		isUserError,
		handleUpdateUserStatus,
		isStatusUpdating,
	} = useUser({
		userId: id,
	});

	return (
		<LoadingErrorBoundary
			isLoading={isUserLoading}
			isError={isUserError}
			errorMessage={handleAndShowError(
				userError,
				"Failed to fetch user details"
			)}>
			<div className="container mx-auto ">
				<PageTitle title="User Details" />
				<BreadCrumb
					items={[{ label: "Users", to: "/dashboard/clients" }, { label: id }]}
				/>

				<UserProfileHeader
					user={userData}
					isUpdating={isStatusUpdating}
					onStatusChange={handleUpdateUserStatus}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<InfoCard title="User Information">
						<UserInfoSection user={userData} />
					</InfoCard>

					<InfoCard title="Authentication Methods">
						<AuthProviderSection authProvider={userData.authProviders} />
					</InfoCard>
				</div>

				<RecentActivity activities={userData.activityLog} />
			</div>
		</LoadingErrorBoundary>
	);
};

export default UserDetailPage;
