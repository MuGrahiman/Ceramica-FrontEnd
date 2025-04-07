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
import LoadingTemplate from "../../components/LoadingTemplate";
import useApiHandler from "../../hooks/useApiHandler";
import RecentActivity from "./RecentActivity";
import AuthProviderSection from "./AuthProviderSection";

const UserDetailPage = () => {
	const { id } = useParams();
	const {
		data,
		isLoading: fetchLoading,
		error: fetchError,
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

	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inquiries, please wait..." />
			</div>
		);
	}

	if (fetchError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching user. Please try again later.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto">
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

			<RecentActivity activities={currentUser.activityLog } />
		</div>
	);
};

export default UserDetailPage;
