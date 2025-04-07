import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import {
	useFetchAllUsersQuery,
	useUpdateUserStatusMutation,
} from "../../redux/store";
import useSearch from "../../hooks/useSearch";
import FilterFormLayout from "../../components/FilterFormLayout";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import { FILTER_FORMS_COMPONENTS } from "../../constants/filter-form";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import LoadingTemplate from "../../components/LoadingTemplate";
import useApiHandler from "../../hooks/useApiHandler";
import Swal from "sweetalert2";
import MiniLoader from "../../components/MiniLoader";
import { CgBlock, CgUnblock } from "react-icons/cg";

const UserPage = () => {
	const [userData, setUserData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(null);
	const [sort, setSort] = useState("");
	const [status, setStatus] = useState([]);
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const [handleMutation] = useApiHandler();

	// RTK Query hook with all filter parameters
	const {
		data,
		isLoading: fetchLoading,
		error: fetchError,
		isFetching,
		refetch,
	} = useFetchAllUsersQuery(
		{ searchTerm, sort, status },
		{ refetchOnMountOrArgChange: true }
	);

	useEffect(() => {
		if (data && data.success) setUserData(data.data);
	}, [data]);

	// Mutation for deleting inventory item
	const [updateStatus, { isLoading: isUpdating }] = handleMutation(
		useUpdateUserStatusMutation
	);

	// Pagination hook now works directly with API data
	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(userData || [], 5);

	const onSubmit = (data) => {
		if (data.sort) {
			setSort(data.sort);
		}
		if (data.status) {
			setStatus(data.status);
		}
		refetch();
		setIsOpen((prev) => !prev);
	};

	const onClear = () => {
		setSort("");
		setStatus([]);
		setIsOpen((prev) => !prev);
	};

	const handleUpdate = async (id, status) => {
		setId(id);
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
		setId(null);
	};

	const FILTER_FORMS_DEFAULT_VALUES = {
		status: [],
		sort: "",
	};

	const FieldContents = [
		{
			title: "Filter by status",
			type: FILTER_FORMS_COMPONENTS.CHECKBOX,
			props: {
				name: "status",
				options: ["pending", "registered", "verified", "blocked"],
			},
		},
		{
			title: "Sort",
			type: FILTER_FORMS_COMPONENTS.RADIO,
			props: {
				name: "sort",
				options: [
					{ value: "newest", label: "Newest query" },
					{ value: "oldest", label: "Oldest query" },
				],
			},
		},
	];

	const getColor = (color) => {
		return `border border-${color}-500 dark:border-${color}-500 hover:ring-${color}-800 text-${color}-900 dark:text-${color}-800 hover:text-${color}-300 placeholder-${color}-700 dark:placeholder-${color}-500 bg-${color}-50 dark:bg-gray-100 hover:bg-${color}-900 `;
	};

	const headers = [
		{
			hide: true,
			label: "Image",
			render: (user) => (
				<img
					className="w-10 h-10 rounded-full"
					src={user.profilePhoto}
					alt={user._id || "user Image"}
				/>
			),
			showValue: () => "lg:table-cell",
		},
		{
			label: "Name",
			render: (user) => user.firstName + " " + user.lastName,
		},
		{
			hide: true,
			label: "Mail",
			render: (user) => `${user.email}`,
			showValue: () => "md:table-cell",
		},
		{
			label: "Status",
			render: (user) => (
				<span
					className={`inline-flex items-center px-2 py-1 me-2 text-sm font-medium cursor-pointer rounded ${getColor(
						user?.status === "registered"
							? "blue"
							: user?.status === "verified"
							? "green"
							: user?.status === "pending"
							? "yellow"
							: user?.status === "blocked"
							? "red"
							: "gray"
					)}`}>
					{user?.status?.toUpperCase()}
				</span>
			),
		},
		{
			label: "Action",
			render: (user) =>
				isUpdating && user._id === id ? (
					<MiniLoader />
				) : user.status === "blocked" ? (
					<CgUnblock
						id={user._id}
						onClick={() => handleUpdate(user._id, "unBlock")}
						className="h-7 w-7 text-gray-500 cursor-pointer hover:text-red-700"
						aria-label={`Update ${user._id}`}
					/>
				) : (
					<CgBlock
						id={user._id}
						onClick={() => handleUpdate(user._id, "block")}
						className="h-7 w-7 text-gray-500 cursor-pointer hover:text-red-700"
						aria-label={`Update ${user.name}`}
					/>
				),
		},
		{
			label: "Details",
			render: (user) => (
				<Link
					to={`/dashboard/client/${user._id}`}
					aria-label={`Item ${user._id}`}>
					<ImEye
						className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
						aria-label="Details"
					/>
				</Link>
			),
		},
	];

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
				<p>Error fetching inquiries. Please try again later.</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Orders
				</h2>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-4 gap-10">
				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 px-5 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md">
					Filter
				</button>
				<SearchBar
					INPUT_STYLE="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:ring-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 rounded-e-lg rounded-s-lg dark:text-white border border-gray-300 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-500"
					BUTTON_STYLE="p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800"
					ON_SUBMIT={handleSearch}
					CLEAR_SEARCH={clearSearch}
					IS_LOADING={isFetching}
				/>
			</div>

			<FilterFormLayout
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClear={onClear}
				defaultValues={FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={FieldContents}>
				<Table
					CONFIG={headers}
					DATA={currentItems}
					KEYFN={(order) => order._id}
				/>
				<Pagination
					pageNumbers={pageNumbers}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePage}
				/>
			</FilterFormLayout>
		</>
	);
};

export default UserPage;
