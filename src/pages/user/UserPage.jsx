import React, { useCallback, useState } from "react";
import useSearch from "../../hooks/useSearch";
import FilterFormLayout from "../../components/FilterFormLayout";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import MiniLoader from "../../components/MiniLoader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";
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
import useToggle, { useMiniToggler } from "../../hooks/useToggle";
import { handleFileError } from "../../utils/fileHandler";

/**
 * User page for listing and managing user accounts on the admin side.
 */
const UserPage = () => {
	const [activeUserId, setActiveUserId] = useState(null);
	const [sort, setSort] = useState("");
	const [status, setStatus] = useState([]);
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const [isFilterToggled, toggleFilter, , closeFilter] = useMiniToggler();
	const PAGINATION_LIMIT = 5;
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
		usePagination(usersData || [], PAGINATION_LIMIT);

	/**
	 * Handles user status update
	 */
	const handleStatusUpdate = useCallback(
		async (userId, currentStatus) => {
			setActiveUserId(userId);
			await handleUpdateUserStatus(userId, currentStatus);
			setActiveUserId(null);
		},
		[handleUpdateUserStatus]
	);
	/**
	 * Handles filter form submission
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			if (data.sort) {
				setSort(data.sort);
			}
			if (data.status) {
				setStatus(data.status);
			}
			closeFilter();
		},
		[closeFilter]
	);
	/**
	 * Handles filter clearance
	 */
	const handleFilterClear = useCallback(() => {
		setSort("");
		setStatus([]);
		closeFilter();
	}, [closeFilter]);

	// Table headers configuration
	const headers = [
		{
			hide: true,
			label: "Image",
			render: (user) => (
				<img
					className="w-10 h-10 rounded-full"
					src={user?.profilePhoto?.url}
					alt={user?._id || "user Image"}
					onError={handleFileError}
					loading="lazy"
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
			render: (user) => {
				const isUpdating = isStatusUpdating && user?._id === activeUserId;
				const actionText = user?.status === "blocked" ? "Unblock" : "Block";
				return isUpdating ? (
					<span className="flex items-center justify-center">
						<MiniLoader />
					</span>
				) : (
					<Badge
						label={actionText}
						color={"gray"}
						onClick={() =>
							handleStatusUpdate(user?._id, actionText.toLowerCase())
						}
					/>
				);
			},
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
			errorMessage={extractErrorMessage(
				usersError,
				"Failed to fetch users data"
			)}>
			<React.Fragment>
				{/* Header Section */}
				<PageHeader title="Users" />
				{/* Filter and Search Section */}
				<FilterControlsWithSearch
					isOpen={isFilterToggled}
					onToggle={toggleFilter}
					onClearSearch={clearSearch}
					onSearch={handleSearch}
					isSearching={isUsersFetching && searchTerm}
				/>
				{/* Main Content with Filters and Table */}
				<FilterFormLayout
					isOpen={isFilterToggled}
					onSubmit={handleFilterSubmit}
					onClear={handleFilterClear}
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
