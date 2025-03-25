import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Table from "../../components/Table";
import LoadingTemplate from "../../components/LoadingTemplate";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import useSortTable from "../../hooks/useSortTable";
import SortIcons from "../../components/SetIcons";
import { useAuth } from "../../hooks/useAuth";
import {
	useGetOrdersQuery,
	useUpdateOrderStatusMutation,
} from "../../redux/store";
import { setDateAsDayMonthYear } from "../../utils/date";
import usePagination from "../../hooks/usePagination";
import { FILTER_FORMS_COMPONENTS } from "../../constants/filter-form";
import FilterFormLayout from "../../components/FilterFormLayout";
import SelectDropdown from "../../components/SelectDropdown";
import useApiHandler from "../../hooks/useApiHandler";
import useToast from "../../hooks/useToast";
import MiniLoader from "../../components/MiniLoader";

/**
 * Order Management Page: Displays a list of orders with sorting, pagination, and search functionality.
 */
const OrderPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(null);
	const [handleMutation] = useApiHandler();
	const showToast = useToast();

	const { currentUser } = useAuth();
	const {
		data: ordersData,
		isLoading: fetchLoading,
		error: fetchError,
	} = useGetOrdersQuery(currentUser.role);

	const [
		updateOrderStatus,
		{ isLoading: isStatusUpdating },
	] = handleMutation(useUpdateOrderStatusMutation);

	const [orderData, setOrderData] = useState(null);

	// Update order data when fetched
	useEffect(() => {
		if (ordersData) {
			setOrderData(ordersData);
		}
	}, [ordersData]);

	/**
	 * Handle search functionality.
	 * @param {Object} search - The search term.
	 */
	const onSearch = ({ searchTerm }) => {
		const filteredOrders = ordersData.filter((order) => {
			const orderString = JSON.stringify(order).toLowerCase();
			return orderString.includes(searchTerm.toLowerCase());
		});
		setOrderData(filteredOrders || ordersData);
	};

	/**
	 * Clear the search and reset the order data.
	 */
	const onClearSearch = () => setOrderData(ordersData);

	const selectDropDownOptions = [
		"processing",
		"shipped",
		"delivered",
		"cancelled",
	];
	const handleSelection = async (id, value) => {
		setId(id);
		const updatedOrder = await updateOrderStatus(
			{ orderId: id, orderStatus: value },
			{
				onSuccess: () => "updated order status successfully",
				onError: (err) =>
					showToast(
						err.data.message || err.message || "Coupon not found",
						"error"
					),
				onFinally: () => setId(null),
			}
		);
		return updatedOrder.status
	};


	// Table headers configuration
	const headers = [
		{
			label: "Mail",
			render: (order) => order.userId.email,
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
				isStatusUpdating && id === order._id  ? (
					<MiniLoader />
				) : (
					<SelectDropdown
						keys={order._id}
						selectedValue={order.status}
						options={selectDropDownOptions}
						onChange={(event) => handleSelection(order._id, event.target.value)}
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
		useSortTable(orderData, headers);

	const { pageNumbers, currentPage, totalPages, handlePage, currentItems } =
		usePagination(sortedOrders, 5);

	const FieldContents = [
		{
			title: "Filter by Order Status",
			type: FILTER_FORMS_COMPONENTS.CHECKBOX,
			props: {
				name: "orderStatus",
				options: ["processing", "shipped", "delivered", "cancelled"],
			},
		},
		{
			title: "Filter by Payment Status",
			type: FILTER_FORMS_COMPONENTS.CHECKBOX,
			props: {
				name: "paymentStatus",
				options: [
					"Created",
					"Saved",
					"Approved",
					"Voided",
					"Completed",
					"PayerActionRequired",
				],
			},
		},
		{
			title: "Filter by Date",
			type: FILTER_FORMS_COMPONENTS.INPUT,
			props: {
				name: "date",
				options: [
					{ name: "startDate", label: "Start Date", type: "date" },
					{ name: "endDate", label: "End Date", type: "date" },
				],
			},
		},
		{
			title: "Filter by Price",
			type: FILTER_FORMS_COMPONENTS.INPUT,
			props: {
				name: "price",
				options: [
					{ name: "minPrice", label: "Minimum Price", type: "numbers" },
					{ name: "maxPrice", label: "Maximum Price", type: "numbers" },
				],
			},
		},
	];
	const FILTER_FORMS_DEFAULT_VALUES = {
		paymentStatus: [],
		StartDate: "",
		endDate: "",
		minPrice: "",
		maxPrice: "",
	};
	function filterOrders(criteria) {
		return ordersData.filter((order) => {
			const paymentStatusMatch = criteria.paymentStatus
				.map((status) => status.toLowerCase())
				.includes(order?.paymentId?.status?.toLowerCase());
			const orderStatusMatch = criteria.orderStatus
				?.map((status) => status.toLowerCase())
				.includes(order?.status?.toLowerCase());
			const minPriceMatch = order?.totalAmount >= parseFloat(criteria.minPrice);
			const maxPriceMatch = order?.totalAmount <= parseFloat(criteria.maxPrice);
			const startDateMatch = criteria.startDate;
			new Date(order?.createdAt) >= new Date(criteria.startDate);
			const endDateMatch =
				new Date(order?.createdAt) <= new Date(criteria.endDate);

			// All criteria must match
			return (
				paymentStatusMatch ||
				orderStatusMatch ||
				minPriceMatch ||
				maxPriceMatch ||
				startDateMatch ||
				endDateMatch
			);
		});
	}

	const onSubmit = (data) => {
		const filterData = filterOrders(data);
		setOrderData(filterData);
		setIsOpen((prev) => !prev);
	};
	const onClear = () => {
		setOrderData(ordersData);
		setIsOpen((prev) => !prev);
	};

	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching orders, please wait..." />
			</div>
		);
	}

	// Handle error state
	if (fetchError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching orders. Please try again later.</p>
			</div>
		);
	}

	return (
		<>
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
					ON_SUBMIT={onSearch}
					CLEAR_SEARCH={onClearSearch}
				/>
			</div>

			{/* Orders Table */}
			<FilterFormLayout
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClear={onClear}
				defaultValues={FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={FieldContents}>
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
		</>
	);
};

export default OrderPage;
