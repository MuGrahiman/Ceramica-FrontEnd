import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImEye } from "react-icons/im";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import MiniLoader from "../../components/MiniLoader";
import demoData from "../demo/DemoData.json";
import useSortTable from "../../hooks/useSortTable";
import SortIcons from "../../components/SetIcons";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import useCoupon from "../../hooks/useCoupon";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";

// Coupon Component
const CouponPage = () => {
	const [id, setId] = useState(null);

	const { useGetCoupons, isUpdatingCouponStatus, useUpdateCouponStatus } =
		useCoupon();

	const { searchTerm, handleSearch, clearSearch } = useSearch();

	// Fetch Coupon items
	const {
		data,
		isLoading: fetchLoading,
		isError: isFetchError,
		error: fetchError,
	} = useGetCoupons(searchTerm);

	const [updateCouponStatus, { isLoading: patchLoading }] =
		useUpdateCouponStatus();

	const handleCouponStatus = async (coupon) => {
		const couponId = coupon._id;
		setId(couponId);
		const status = coupon.status === "active" ? "inActive" : "active";
		await updateCouponStatus(
			{ couponId, couponData: { status } },
			{
				onSuccess: () => "Coupon status has been successfully updated.",
				onError: (err) =>
					err.message ||
					"Failed to update the coupon status. Please try again.",
			}
		);
		setId(null);
	};

	// Table headers configuration
	const headers = [
		{
			label: "Name",
			render: (Coupon) => Coupon.title,
		},
		{
			label: "Code",
			render: (Coupon) => Coupon.couponCode,
		},
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
				return isUpdatingCouponStatus && id === Coupon._id && patchLoading ? (
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
	];

	const { updateConfig, sortedData } = useSortTable(data, headers);
	const { currentPage, pageNumbers, totalPages, handlePage, currentItems } =
		usePagination(sortedData, 5);

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={isFetchError}
			errorMessage={
				fetchError?.data?.message ||
				fetchError?.message ||
				"Failed to fetch coupons "
			}>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Coupons
				</h2>
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

			{/* Coupon Table */}
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
								DATA={currentItems}
								KEYFN={(data) => data.now}
							/>
							<Pagination
								pageNumbers={pageNumbers}
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePage}
							/>
						</>
					)}
				</div>
			</div>
		</LoadingErrorBoundary>
	);
};

export default CouponPage;
