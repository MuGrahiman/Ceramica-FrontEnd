import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
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

/**
 * Order Management Page: Displays a list of orders with sorting, pagination, and search functionality.
 */
const OrderPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		activeOrderId,
		ordersData,
		isOrdersLoading,
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
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Orders
				</h2>
			</div>
			{/* Filter and Search Section */}
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
					ON_SUBMIT={onOrderSearch}
					CLEAR_SEARCH={onClearOrderSearch}
				/>
			</div>
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
