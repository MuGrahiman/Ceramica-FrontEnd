import React, { useState } from "react";
import useSearch from "../../hooks/useSearch";
import FilterFormLayout from "../../components/FilterFormLayout";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import MiniLoader from "../../components/MiniLoader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";
import {
	USER_FILTER_FIELD_CONTENTS,
	USER_FILTER_FORMS_DEFAULT_VALUES,
	USER_STATUS_COLOR_MAP,
} from "../../constants/user";
import useUser from "../../hooks/useUser";
import { USER_ROLES } from "../../constants/app";
import Badge from "../../components/Badge";

/**
 * User page for listing and managing user accounts on the admin side.
 */
const UserPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(null);
	const [sort, setSort] = useState("");
	const [status, setStatus] = useState([]);
	const { searchTerm, handleSearch, clearSearch } = useSearch();

	const {
		usersData,
		isUsersLoading,
		usersError,
		isUsersError,
		isUsersFetching,
		isStatusUpdating,
		handleUpdateUserStatus,
	} = useUser({
		searchTerm,
		sort,
		status,
		userRole: USER_ROLES.ADMIN,
	});

	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(usersData || [], 5);

	const onSubmit = (data) => {
		if (data.sort) {
			setSort(data.sort);
		}
		if (data.status) {
			setStatus(data.status);
		}
		setIsOpen((prev) => !prev);
	};

	const onClear = () => {
		setSort("");
		setStatus([]);
		setIsOpen((prev) => !prev);
	};

	const handleUpdate = async (id, status) => {
		setId(id);
		await handleUpdateUserStatus(id, status);
		setId(null);
	};

	const headers = [
		{
			hide: true,
			label: "Image",
			render: (user) => (
				<img
					className="w-10 h-10 rounded-full"
					src={user?.profilePhoto?.url}
					alt={user?._id || "user Image"}
				/>
			),
			showValue: () => "lg:table-cell",
		},
		{
			label: "Name",
			render: (user) => `${user?.firstName} ${user?.lastName}`,
		},
		{
			hide: true,
			label: "Mail",
			render: (user) => `${user?.email}`,
			showValue: () => "md:table-cell",
		},
		{
			label: "Status",
			render: (user) => (
				<Badge
					label={user?.status}
					color={USER_STATUS_COLOR_MAP[user?.status] || "gray"}
				/>
			),
		},
		{
			label: "Action",
			render: (user) =>
				isStatusUpdating && user?._id === id ? (
					<span className="flex items-center justify-center">
						<MiniLoader />
					</span>
				) : (
					<Badge
						label={user?.status === "blocked" ? "UnBlock" : "Block"}
						color={"gray"}
						onClick={() =>
							handleUpdate(
								user?._id,
								user?.status === "blocked" ? "unBlock" : "block"
							)
						}
					/>
				),
		},
		{
			label: "Details",
			render: (user) => (
				<Link
					to={`/dashboard/client/${user?._id}`}
					aria-label={`Item ${user?._id}`}>
					<ImEye
						className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
						aria-label="Details"
					/>
				</Link>
			),
		},
	];

	return (
		<LoadingErrorBoundary
			isLoading={isUsersLoading}
			isError={isUsersError}
			errorMessage={handleAndShowError(
				usersError,
				"Failed to fetch users data"
			)}>
			<React.Fragment>
				{/* Header Section */}
				<PageHeader title="Orders" />
				{/* Filter and Search Section */}
				<FilterControlsWithSearch
					isOpen={isOpen}
					onToggle={() => setIsOpen((prev) => !prev)}
					onClearSearch={clearSearch}
					onSearch={handleSearch}
					isSearching={isUsersFetching && searchTerm}
				/>
				<FilterFormLayout
					isOpen={isOpen}
					onSubmit={onSubmit}
					onClear={onClear}
					defaultValues={USER_FILTER_FORMS_DEFAULT_VALUES}
					fieldContents={USER_FILTER_FIELD_CONTENTS}>
					<Table
						CONFIG={headers}
						DATA={currentItems}
						KEYFN={(user) => user._id}
					/>
					<Pagination
						pageNumbers={pageNumbers}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePage}
					/>
				</FilterFormLayout>
			</React.Fragment>
		</LoadingErrorBoundary>
	);
};

export default UserPage;
