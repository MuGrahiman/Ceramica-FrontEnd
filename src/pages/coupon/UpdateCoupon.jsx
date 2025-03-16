import React from "react";
import { useParams } from "react-router-dom";
import { createDefaultState } from "../../utils/generals";
import {
	COUPON_BREAD_CRUMB_ITEMS,
	COUPON_FORM_FIELDS,
	COUPON_URL,
} from "../../constants/coupon";
import CouponForm from "./CouponForm";
import LoadingTemplate from "../../components/LoadingTemplate";
import { setDateAsMonthDayYear } from "../../utils/date";
import useCoupon from "../../hooks/useCoupon";

const UpdateCoupon = () => {
	const Title = "Update Coupon";
	const { id } = useParams();
	const { useSingleCoupon, useUpdateCoupon } = useCoupon();
	const { data, isLoading: fetchLoading } = useSingleCoupon(id);

	const [UpdateCoupon, { isLoading: updateLoading }] = useUpdateCoupon();

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
		await UpdateCoupon(
			{ couponId: id, couponData: formData },
			{
				onSuccess: () => "Coupon updated successfully",
				redirectPath: COUPON_URL,
				onError: (error) =>
					error.message ||
					error.data.message ||
					"Failed to update coupon. Please try again.",
			}
		);
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
			LOADING={fetchLoading || updateLoading}
			ON_SUBMIT={handleSubmit}
			BREAD_CRUMB_ITEMS={COUPON_BREAD_CRUMB_ITEMS(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default UpdateCoupon;
