import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import {
	useDeleteInquiryMutation,
	useGetInquiriesQuery,
} from "../../redux/store";
import useSearch from "../../hooks/useSearch";
import FilterFormLayout from "../../components/FilterFormLayout";
import Table from "../../components/Table";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Badge from "../../components/Badge";
import { FILTER_FORMS_COMPONENTS } from "../../constants/filter-form";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import LoadingTemplate from "../../components/LoadingTemplate";
import useApiHandler from "../../hooks/useApiHandler";
import Swal from "sweetalert2";
import MiniLoader from "../../components/MiniLoader";

const InquiryPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(null);
	const [sort, setSort] = useState(null);
	const [status, setStatus] = useState(null);
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const [handleMutation] = useApiHandler();

	// RTK Query hook with all filter parameters
	const {
		data: ordersData,
		isLoading: fetchLoading,
		error: fetchError,
		isFetching,
		refetch,
	} = useGetInquiriesQuery(
		{ searchTerm, sort, status },
		{ refetchOnMountOrArgChange: true } // Add this option
	);

	// Mutation for deleting inventory item
	const [deleteInquiry, { isLoading: deleteLoading }] = handleMutation(
		useDeleteInquiryMutation
	);

	// Pagination hook now works directly with API data
	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(ordersData || [], 5);

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
		setSort(null);
		setStatus(null);
		setIsOpen((prev) => !prev);
	};

	const handleDelete = async (id) => {
		setId(id);
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b10202",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		});

		if (!result.isConfirmed) return setId(null);

		await deleteInquiry(id, {
			onSuccess: () => "Deleted successfully",
			onError: (err) =>
				err.message || "Failed to delete the product. Please try again",
		});
		setId(null);
	};

	const FILTER_FORMS_DEFAULT_VALUES = {
		status: [],
		sort: "",
	};

	const FieldContents = [
		{
			title: "Filter by status",
			type: FILTER_FORMS_COMPONENTS.RADIO,
			props: {
				name: "status",
				options: [
					{ value: "pending", label: "Pending query" },
					{ value: "resolved", label: "Resolved query" },
				],
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

	const headers = [
		{
			label: "Name",
			render: (inquiry) => inquiry.name,
		},
		{
			hide: true,
			label: "Mail",
			render: (inquiry) => `${inquiry.email}`,
			showValue: () => "md:table-cell",
		},
		{
			label: "Status",
			render: (inquiry) => (
				<Badge
					LABEL={inquiry?.status}
					STATUS={inquiry?.status === "resolved"}
				/>
			),
		},
		{
			label: "Details",
			render: (inquiry) => (
				<Link
					to={`/dashboard/inquiry-item/${inquiry._id}`}
					aria-label={`Item ${inquiry.name}`}>
					<ImEye
						className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
						aria-label="Details"
					/>
				</Link>
			),
		},
		{
			label: "Delete",
			render: (inquiry) =>
				deleteLoading && inquiry._id === id ? (
					<MiniLoader />
				) : (
					<MdDelete
						id={inquiry._id}
						onClick={() => handleDelete(inquiry._id)}
						className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-700"
						aria-label={`Delete ${inquiry.name}`}
					/>
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
				/>
			</div>

			<FilterFormLayout
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClear={onClear}
				defaultValues={FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={FieldContents}>
				{isFetching ? (
					<div className="flex items-center justify-center h-screen">
						<LoadingTemplate message="Fetching inquiries, please wait..." />
					</div>
				) : (
					<>
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
					</>
				)}
			</FilterFormLayout>
		</>
	);
};

export default InquiryPage;
