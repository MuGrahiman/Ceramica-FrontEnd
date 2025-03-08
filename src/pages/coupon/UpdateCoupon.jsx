import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetInventoryItemByIdQuery,
	useGetSingleCouponQuery,
	useUpdateCouponMutation,
	useUpdateInventoryMutation,
} from "../../redux/store";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/generals";
import {
	COUPON_BREAD_CRUMB_ITEMS,
	COUPON_FORM_FIELDS,
} from "../../constants/coupon";
import { handleAndShowError } from "../../utils/errorHandlers";
import CouponForm from "./CouponForm";
import LoadingTemplate from "../../components/LoadingTemplate";
import { setDateAsMonthDayYear } from "../../utils/date";

// Page Component: Handles updating a product in the inventory
const UpdateCoupon = () => {
	const { id } = useParams();
	const { data, isLoading: fetchLoading } = useGetSingleCouponQuery(id);
	const [UpdateCoupon, { isLoading: updateLoading }] =
		useUpdateCouponMutation();
	const showToast = useToast();
	const navigate = useNavigate();

	// Define constant strings
	const Title = "Update Coupon";

	// Default values for the form
	const defaultValues = createDefaultState(COUPON_FORM_FIELDS, null, {
		...data,
		validFrom: data?.validFrom && setDateAsMonthDayYear(data?.validFrom),
		validUntil: data?.validUntil && setDateAsMonthDayYear(data?.validUntil),
	});

	// Create default success state
	const defaultSuccessValue = createDefaultState(COUPON_FORM_FIELDS, true);

	// Handles form submission and API call
	const handleSubmit = async (formData) => {
		try {
			const data = await UpdateCoupon({
				couponId: id,
				couponData: formData,
			}).unwrap();
			showToast(" Coupon updated successfully", "success");
			navigate("/dashboard/coupon");
		} catch (error) {
			handleAndShowError(
				error,
				"Failed to update coupon. Please try again.",
				showToast
			);
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

	return (
		<CouponForm
			LOADING={fetchLoading}
			ON_SUBMIT={handleSubmit}
			BREAD_CRUMB_ITEMS={COUPON_BREAD_CRUMB_ITEMS(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default UpdateCoupon;
