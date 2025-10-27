import React, { useCallback, useState } from "react";
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
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import useApiHandler from "../../hooks/useApiHandler";
import Swal from "sweetalert2";
import MiniLoader from "../../components/MiniLoader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";
import { useMiniToggler } from "../../hooks/useToggle";
import {
	INQUIRY_FIELD_CONTENTS,
	INQUIRY_FILTER_FORMS_DEFAULT_VALUES,
	INQUIRY_SWAL_CONFIG,
} from "../../constants/inquiry";

const InquiryPage = () => {
	const [activeInquiryId, setActiveInquiryId] = useState(null);
	const [sort, setSort] = useState(null);
	const [status, setStatus] = useState(null);
	const [handleMutation] = useApiHandler();
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const [isFilterToggled, toggleFilter, , closeFilter] = useMiniToggler();

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

	const [deleteInquiry, { isLoading: deleteLoading }] = handleMutation(
		useDeleteInquiryMutation
	);

	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(ordersData || [], 5);

	/**
	 * Handles filter form submission
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			if (data.sort) setSort(data.sort);

			if (data.status) setStatus(data.status);

			refetch();
			closeFilter();
		},
		[refetch, closeFilter]
	);

	/**
	 * Handles filter clearance
	 */
	const handleFilterClear = useCallback(() => {
		setSort(null);
		setStatus(null);
		closeFilter();
	}, [closeFilter]);

	/**
	 * Handles inquiry deletion with confirmation and error handling
	 */
	const handleDelete = useCallback(
		async (inquiryId) => {
			setActiveInquiryId(inquiryId);

			const result = await Swal.fire(INQUIRY_SWAL_CONFIG);

			if (!result.isConfirmed) return setActiveInquiryId(null);
			await deleteInquiry(inquiryId, {
				onSuccess: () => "Inquiry deleted successfully",
				onError: (err) =>
					err.message || "Failed to delete the product. Please try again",
				onFinally: () => setActiveInquiryId(null),
			});
		},
		[deleteInquiry]
	);

	const headers = [
		{
			label: "Name",
			render: (inquiry) => inquiry.name,
		},
		{
			hide: true,
			label: "Mail",
			render: (inquiry) => inquiry.email || "N/A",
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
						aria-label="View inquiry details"
					/>
				</Link>
			),
		},
		{
			label: "Delete",
			render: (inquiry) =>
				deleteLoading && inquiry._id === activeInquiryId ? (
					<MiniLoader />
				) : (
					<button
						type="button"
						onClick={() => handleDelete(inquiry._id)}
						className="text-gray-500 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
						aria-label={`Delete inquiry from ${inquiry.name}`}>
						<MdDelete className="h-6 w-6" />
					</button>
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
				<PageHeader title="Inquiries"  />

				{/* Filter and Search Section */}
				<FilterControlsWithSearch
					isOpen={isFilterToggled}
					onToggle={toggleFilter}
					onClearSearch={clearSearch}
					onSearch={handleSearch}
					isSearching={isFetching}
				/>
				<FilterFormLayout
					isOpen={isFilterToggled}
					onSubmit={handleFilterSubmit}
					onClear={handleFilterClear}
					defaultValues={INQUIRY_FILTER_FORMS_DEFAULT_VALUES}
					fieldContents={INQUIRY_FIELD_CONTENTS}>
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
