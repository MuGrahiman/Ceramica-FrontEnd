import React, { useState } from "react";
import { MdDelete, MdMode, MdOutlineAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ImEye, ImSpinner9 } from "react-icons/im";
import Table from "../../components/Table";
import LoadingTemplate from "../../components/LoadingTemplate";
import SearchBar from "../../components/SearchBar";
import FilterForm from "../../components/FilterForm";
import useInventory from "../../hooks/useInventory";
import { KeyFn } from "../../utils/generals";
import img from "../../assets/avatar.png";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import MiniLoader from "../../components/MiniLoader";
import demoData from "../demo/DemoData.json";
import useSortTable from "../../hooks/useSortTable";
import SortIcons from "../../components/SetIcons";
import {
	useGetCouponsQuery,
	useUpdateCouponStatusMutation,
} from "../../redux/store";
import usePagination from "../../hooks/usePagination";

// Inventory Component
const Coupon = () => {
	const navigate = useNavigate();
	const [id, setId] = useState(null);
    const [ search, setSearch ] = useState();

	// Fetch inventory items
	const {
		data,
		isLoading: fetchLoading,
		error: fetchError,
	} = useGetCouponsQuery(search);
	const [
		updateCouponStatus,
		{ isLoading: patchLoading, isError: patchError, isSuccess: patchSuccess },
	] = useUpdateCouponStatusMutation();
	const handleCouponStatus = async (coupon) => {
		const couponId = coupon._id;
		setId(couponId);
		const status = coupon.status === "active" ? "inActive" : "active";
		try {
			await updateCouponStatus({ couponId, couponData: { status } }).unwrap();
		} catch (error) {
			console.error("  handleCouponStatus ~ error:", error);
		} finally {
			setId(null);
		}
	};
    const handleSearch = ( { searchTerm } ) => { setSearch( searchTerm ) }
    const clearSearch = () => setSearch()

	// Table headers configuration
	const headers = [
		{
			// hide: true,
			label: "Name",
			render: (Coupon) => Coupon.title,
			// showValue: () => "lg:table-cell",
		},
		{
			// hide: true,
			label: "Code",
			render: (Coupon) => Coupon.couponCode,
			// showValue: () => "lg:table-cell",
		},
		// {
		// 	label: "Start Date",
		// 	render: (Coupon) => Coupon.startDate,
		// },
		// {
		// 	// hide: true,
		// 	label: "Expiry Date",
		// 	render: (Coupon) => Coupon.expiryDate,

		// 	// showValue: () => "md:table-cell",
		// },
		{
			hide: true,
			label: "Minimum Price",
			render: (Coupon) => Coupon.minimumPurchaseAmount,
			sortValue: (value) => value.minimumPurchaseAmount,
			showValue: () => "lg:table-cell",
		},
		{
			hide: true,
			label: "Discount",
			render: (Coupon) => Coupon.discount,
			sortValue: (value) => value.discount,
			showValue: () => "md:table-cell",
		},
		{
			hide: true,
			label: "Limit",
			render: (Coupon) => Coupon.usageLimit,
			sortValue: (value) => value.usageLimit,
			showValue: () => "xl:table-cell",
		},
		{
			label: "Status",
			render: (Coupon) => {
				return patchLoading && id === Coupon._id ? (
					<MiniLoader />
				) : (
					<Badge
						ON_CLICK={() => handleCouponStatus(Coupon)}
						LABEL={Coupon?.status}
						STATUS={Coupon?.status === "active" ? true : false}
					/>
				);
			},
		},
		{
					label: "Details",
					render: (Coupon) => (
						<Link
							to={`/dashboard/view-coupon/${Coupon._id}`}
							aria-label={`Item ${Coupon.title}`}>
							<ImEye
								className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
								aria-label="Details"
							/>
						</Link>
					),
				},
				// {
				// 	label: "Edit",
				// 	render: (inventory) => (
				// 		<Link
				// 			to={`/dashboard/update-inventory/${inventory._id}`}
				// 			aria-label={`Edit ${inventory.title}`}>
				// 			<MdMode className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
				// 		</Link>
				// 	),
				// },
				// {
				// 	label: "Delete",
				// 	render: (inventory) =>
						// deleteLoading && inventory._id === id ? (
						// 	<ImSpinner9
						// 		className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600"
						// 		aria-label="Deleting item..."
						// 	/>
						// ) : 
						// (
						// 	<MdDelete
						// 		id={inventory._id}
						// 		// onClick={() => handleDelete(inventory._id)}
						// 		className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-700"
						// 		aria-label={`Delete ${inventory.title}`}
						// 	/>
						// ),
				// },
	
	];

	const { updateConfig, sortedData } = useSortTable(data, headers);
	const { currentPage, totalPages, handlePage, currentItems } = usePagination(
		sortedData,
		5
	);
	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inventory, please wait..." />
			</div>
		);
	}

	// Handle error state
	if (fetchError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching inventory. Please try again later.</p>
			</div>
		);
	}

	return (
		<>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Coupons
				</h2>
				{/* <Link
					to="/dashboard/add-to-inventory"
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 
					px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 
					rounded-md shadow-md">
					<MdOutlineAdd className="h-6 w-6" />
					Add To Inventory
				</Link> */}
			</div>

			{/* Filter and Search Section */}
			<div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-4 gap-10">
				<Link
					to="/dashboard/create-coupon"
					type="button"
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 px-5 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md">
					Create Coupon
				</Link>
				<SearchBar
					INPUT_STYLE={`focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:ring-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 rounded-e-lg rounded-s-lg dark:text-white border border-gray-300 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-500`}
					BUTTON_STYLE={`p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800`}
					ON_SUBMIT={handleSearch}
					CLEAR_SEARCH={clearSearch}
				/>
			</div>

			{/* Inventory Table */}
			<div className="relative mb-12 min-h-screen">
				<div
					className={`w-full shadow-lg transition-all duration-700 ease-in-out `}>
					{demoData && (
						<>
							<Table
								CONFIG={updateConfig(({ sortColumn, label, order, sort }) => (
									<div
										className="flex items-center gap-2"
										onClick={() => sortColumn(label)}>
										{label}
										<SortIcons label={label} order={order} sort={sort} />
									</div>
								))}
								// onRowNavigate={(data) =>
								// 	navigate(`/dashboard/view-coupon/${data._id}`)
								// }
								DATA={currentItems}
								KEYFN={(data) => data.now}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePage}
							/>
						</>
						////<Table
						//DATA={sortedData}
						//CONFIG={updateConfig(({ sortColumn, label, order, sort }) => (
						//	<div
						//		className="flex items-center"
						//		onClick={() => sortColumn(label)}>
						//</Table>		{/* {label} why */}
						//</div>		<SortIcons label={label} order={order} sort={sort} />
						//	</div>
						// ))}
						// KEYFN={KeyFn}
						// CURRENT_PAGE={currentPage}
						// TOTAL_PAGES={totalPages}
						// HANDLE_PAGE_CHANGE={handlePage}
						// />
						/* <Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePage}
							/> */
						// </>
					)}
				</div>
			</div>
		</>
	);
};

export default Coupon;
