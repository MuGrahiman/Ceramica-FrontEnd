import React, { useState } from "react";
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
import { handleAndShowError } from "../../utils/errorHandlers";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";

/**
 * Order Management Page: Displays a list of orders with sorting, pagination, and search functionality.
 */
const OrderPage = () => {
	const [isOpen, setIsOpen] = useState(false);

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
	} = useOrder("admin");

	const selectDropDownOptions = Object.values(ORDER_STATUSES);

	// Table headers configuration
	const headers = [
		{
			label: "Mail",
			render: (order) => order?.userId?.email,
		},
		{
			label: "Quantity",
			render: (order) => order.items.length,
			sortValue: (value) => value.items.length,
		},
		{
			hide: true,
			label: "Total Amount",
			render: (order) => order.totalAmount,
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
		usePagination(sortedOrders, 5);

	const onSubmit = (data) => {
		filterOrders(data);
		setIsOpen((prev) => !prev);
	};

	const onClear = () => {
		clearOrderFilters();
		setIsOpen((prev) => !prev);
	};

	return (
		<LoadingErrorBoundary
			isLoading={isOrdersLoading}
			isError={ordersFetchIsError}
			errorMessage={handleAndShowError(
				ordersFetchError,
				"Failed to fetch order data"
			)}>

			{/* Header Section */}
			<PageHeader title="Orders" />
			
			{/* Filter and Search Section */}
			<FilterControlsWithSearch
				isOpen={isOpen}
				onToggle={() => setIsOpen((prev) => !prev)}
				onClearSearch={onClearOrderSearch}
				onSearch={onOrderSearch}
				isSearching={isOrdersFetching}
			/>

			{/* Orders Table */}
			<FilterFormLayout
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClear={onClear}
				defaultValues={ORDER_FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={ORDER_FIELD_CONTENTS}>
				<Table
					CONFIG={getTableConfig(({ sortColumn, label, order, sort }) => (
						<div
							className="flex items-center gap-2"
							onClick={() => sortColumn(label)}>
							{label}
							<SortIcons label={label} order={order} sort={sort} />
						</div>
					))}
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
