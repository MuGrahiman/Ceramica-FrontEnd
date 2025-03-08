import React from "react";
import {
	useDeleteCouponMutation,
	useGetInventoryItemByIdQuery,
	useGetSingleCouponQuery,
} from "../../redux/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductPanel from "../../components/ProductPanel";
import BreadCrumb from "../../components/BreadCrumb";
import LoadingTemplate from "../../components/LoadingTemplate";
import { COUPON_BREAD_CRUMB_ITEMS } from "../../constants/coupon";
import CouponCard from "./CouponCard";
import CouponUsersList from "./CouponUsersList";
import useToast from "../../hooks/useToast";

const ViewCoupon = () => {
	const { id } = useParams();
	const showToast = useToast(); // Custom toast notification
	const navigate = useNavigate();

	const { data, isLoading: fetchLoading } = useGetSingleCouponQuery(id);
	const [
		deleteCoupon,
		{
			isLoading: deleteLoading,
			isError: deleteError,
			isSuccess: deleteSuccess,
		},
	] = useDeleteCouponMutation();

	const onDeleteCoupon = async () => {
		try {
			const res = await deleteCoupon(id).unwrap();
			showToast(res.message, res.success ? "success" : "error");
			navigate("/dashboard/coupon");
		} catch (error) {
			console.error(" onDeleteCoupon ~ error:", error);
		} finally {
			// setId(null);
		}
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
			<BreadCrumb items={COUPON_BREAD_CRUMB_ITEMS(data.title)} />
			<div className="  mt-4 p-5  gap-3 ">
				<CouponCard coupon={data} />
				<CouponUsersList users={data.redeemedBy} />
			</div>
			<div className="flex gap-6 mt-4">
				<button
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

export default ViewCoupon;
