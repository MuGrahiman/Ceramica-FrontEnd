import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import useSortTable from "../../hooks/useSortTable";
import SortIcons from "../../components/SetIcons";
import { setDateAsDayMonthYear } from "../../utils/date";
import usePagination from "../../hooks/usePagination";
import FilterFormLayout from "../../components/FilterFormLayout";
import SelectDropdown from "../../components/SelectDropdown";
import MiniLoader from "../../components/MiniLoader";
import useOrder from "../../hooks/useOrder";
import {
	ORDER_FIELD_CONTENTS,
	ORDER_FILTER_FORMS_DEFAULT_VALUES,
	ORDER_STATUSES,
} from "../../constants/order";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";
import { USER_ROLES } from "../../constants/app";
import { useMiniToggler } from "../../hooks/useToggle";
const PAGINATION_LIMIT = 5;

/**
 * Order Management Page: Displays a list of orders with sorting, pagination, and search functionality.
 */
const OrderPage = () => {
	const [isFilterToggled, toggleFilter, , closeFilter] = useMiniToggler();

	const {
		activeOrderId,
		ordersData,
		isOrdersLoading,
		isOrdersFetching,
		ordersFetchIsError,
		ordersFetchError,
		handleOrderStatusSelection,
		isOrderStatusUpdating,
		onOrderSearch,
		onClearOrderSearch,
		filterOrders,
		clearOrderFilters,
	} = useOrder(USER_ROLES.ADMIN);

	const selectDropDownOptions = Object.values(ORDER_STATUSES);

	// Table headers configuration
	const headers = [
		{
			label: "Mail",
			render: (order) => order?.userId?.email || "N/A",
		},
		{
			label: "Quantity",
			render: (order) => order.items.length,
			sortValue: (value) => value.items.length,
		},
		{
			hide: true,
			label: "Total Amount",
			render: (order) => `$${order.totalAmount?.toFixed(2) || "0.00"}`,
			sortValue: (value) => value.totalAmount,
			showValue: () => "lg:table-cell",
		},
		{
			hide: true,
			label: "Payed At",
			render: (order) => setDateAsDayMonthYear(order?.paymentId?.createTime),
			sortValue: (order) => order?.paymentId?.createTime,
			showValue: () => "md:table-cell",
		},
		{
			hide: true,
			label: "Order  Status",
			render: (order) =>
				isOrderStatusUpdating && activeOrderId === order._id ? (
					<MiniLoader />
				) : (
					<SelectDropdown
						keys={order._id}
						selectedValue={order.status}
						onChange={(event) =>
							handleOrderStatusSelection(order._id, event.target.value)
						}
						options={selectDropDownOptions}
					/>
				),
			showValue: () => "xl:table-cell",
		},
		{
			label: "Details",
			render: (order) => (
				<Link
					to={`/dashboard/order-detail/${order._id}`}
					aria-label={`Item ${order._id}`}>
					<ImEye
						className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
						aria-label="Details"
					/>
				</Link>
			),
		},
	];

	const { updateConfig: getTableConfig, sortedData: sortedOrders } =
		useSortTable(ordersData, headers);

	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(sortedOrders, PAGINATION_LIMIT);

	/**
	 * Handles filter form submission
	 * @param {Object} data - Form data containing orderStatus
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			filterOrders(data);
			closeFilter();
		},
		[filterOrders, closeFilter]
	);

	/**
	 * Clears filters and resets to default state
	 */
	const handleFilterClear = useCallback(() => {
		clearOrderFilters();
		closeFilter();
	}, [clearOrderFilters, closeFilter]);

	/**
	 * Renders table header with sort functionality
	 */
	const renderTableHeader = useCallback(
		({ sortColumn, label, order, sort }) => (
			<button
				type="button"
				className="flex items-center gap-2 "
				onClick={() => sortColumn(label)}
				aria-label={`Sort by ${label}`}>
				{label}
				<SortIcons label={label} order={order} sort={sort} />
			</button>
		),
		[]
	);

	return (
		<LoadingErrorBoundary
			isLoading={isOrdersLoading}
			isError={ordersFetchIsError}
			errorMessage={extractErrorMessage(
				ordersFetchError,
				"Failed to fetch order data"
			)}>
			{/* Header Section */}
			<PageHeader title="Orders" />

			{/* Filter and Search Section */}
			<FilterControlsWithSearch
				isOpen={isFilterToggled}
				onToggle={toggleFilter}
				onClearSearch={onClearOrderSearch}
				onSearch={onOrderSearch}
				isSearching={isOrdersFetching}
			/>

			{/* Orders Table */}
			<FilterFormLayout
				isOpen={isFilterToggled}
				onSubmit={handleFilterSubmit}
				onClear={handleFilterClear}
				defaultValues={ORDER_FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={ORDER_FIELD_CONTENTS}>
				<Table
					CONFIG={getTableConfig(renderTableHeader)}
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
		</LoadingErrorBoundary>
	);
};

export default OrderPage;
