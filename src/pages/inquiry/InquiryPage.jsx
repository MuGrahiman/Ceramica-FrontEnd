import React, { useState } from "react";
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
import useApiHandler from "../../hooks/useApiHandler";
import Swal from "sweetalert2";
import MiniLoader from "../../components/MiniLoader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";

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
		isFetching,
		isError: fetchIsError,
		error: fetchError,
		refetch,
	} = useGetInquiriesQuery(
		{ searchTerm, sort, status },
		{ refetchOnMountOrArgChange: true }
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

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={fetchIsError}
			errorMessage={handleAndShowError(
				fetchError,
				"Failed to fetch inquiries"
			)}>
			<React.Fragment>
				{/* Header Section */}
				<PageHeader title="Inquiry" />

				{/* Filter and Search Section */}
				<FilterControlsWithSearch
					isOpen={isOpen}
					onToggle={() => setIsOpen((prev) => !prev)}
					onClearSearch={clearSearch}
					onSearch={handleSearch}
					isSearching={isFetching}
				/>
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
			</React.Fragment>
		</LoadingErrorBoundary>
	);
};

export default InquiryPage;
