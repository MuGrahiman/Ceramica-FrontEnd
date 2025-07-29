import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";
import InfoCard from "./InfoCard";
import UserInfoSection from "./UserInfoSection";
import {
	useFetchUserByIdQuery,
	useUpdateUserStatusMutation,
} from "../../redux/store";
import useApiHandler from "../../hooks/useApiHandler";
import RecentActivity from "./RecentActivity";
import AuthProviderSection from "./AuthProviderSection";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";

const UserDetailPage = () => {
	const { id } = useParams();
	const {
		data,
		isLoading: fetchLoading,
		error: fetchError,
		isError: fetchIsError,
	} = useFetchUserByIdQuery(id);
	const [handleMutation] = useApiHandler();

	const [updateStatus, { isLoading: isUpdating }] = handleMutation(
		useUpdateUserStatusMutation
	);

	const [currentUser, setCurrentUser] = useState({});
	useEffect(() => {
		if (data && data.success) {
			setCurrentUser({ ...data.data });
		}
	}, [data]);

	const handleStatusChange = async (status) => {
		await updateStatus(
			{ id, status },
			{
				onSuccess: () => "Updated successfully",
				onError: (err) =>
					err?.data?.message ||
					err?.message ||
					"Failed to update user status. Please try again",
			}
		);
	};

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={fetchIsError}
			errorMessage={handleAndShowError(
				fetchError,
				"Failed to fetch user details"
			)}>
			<div className="container mx-auto ">
				<PageTitle title="User Details" />
				<BreadCrumb
					items={[{ label: "Users", to: "/dashboard/clients" }, { label: id }]}
				/>

				<UserProfileHeader
					user={currentUser}
					isUpdating={isUpdating}
					onStatusChange={handleStatusChange}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<InfoCard title="User Information">
						<UserInfoSection user={currentUser} />
					</InfoCard>

					<InfoCard title="Authentication Methods">
						<AuthProviderSection authProvider={currentUser.authProviders} />
					</InfoCard>
				</div>

				<RecentActivity activities={currentUser.activityLog} />
			</div>
		</LoadingErrorBoundary>
	);
};

export default UserDetailPage;
