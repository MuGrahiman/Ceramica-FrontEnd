import React from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import LoadingTemplate from "../../components/LoadingTemplate";
import { COUPON_BREAD_CRUMB_ITEMS, COUPON_URL } from "../../constants/coupon";
import CouponCard from "./CouponCard";
import CouponUsersList from "./CouponUsersList";
import useCoupon from "../../hooks/useCoupon";
import PageTitle from "../../components/PageTitle";

const CouponDetailsPage = () => {
	const { id } = useParams();
	const { useSingleCoupon, useDeleteCoupon } = useCoupon();

	const { data, isLoading: fetchLoading } = useSingleCoupon(id);
	const [deleteCoupon, { isLoading: isDeletingCoupon }] = useDeleteCoupon(id);

	// const { deletdData, isLoading: isDeletingCoupon }
	// const [deleteCoupon, { isLoading: deleteLoading }] =
	// 	useDeleteCouponMutation();

	const onDeleteCoupon = async () => {
		await deleteCoupon(id, {
			onSuccess: () => "Coupon delete successfully",
			redirectPath: COUPON_URL,
			onError: (error) =>
				error.message || "Failed to delete coupon. Please try again.",
		});
	};

	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inventory, please wait..." />
			</div>
		);
	}
	if (!data || !data) <div>{`Sorry couldn't find any product `}</div>;
	return (
		<main className="max-w-5xl  mx-auto font-secondary ">
			<PageTitle title="Coupon Details"/>
			<BreadCrumb items={COUPON_BREAD_CRUMB_ITEMS(data._id)} />
			<div className="flex flex-col gap-8 mt-2">
				<CouponCard coupon={data} />
				<CouponUsersList users={data.redeemedBy} />
			</div>
			<div className="flex gap-6 mt-4">
				<button
					disabled={isDeletingCoupon}
					onClick={onDeleteCoupon}
					aria-label={`Edit ${data.title}`}
					className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition ease-in-out duration-200">
					Delete
				</button>
				<Link
					to={`/dashboard/update-coupon/${id}`}
					aria-label={`Edit ${data.title}`}
					className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200">
					Edit
				</Link>
			</div>
		</main>
	);
};

export default CouponDetailsPage;
