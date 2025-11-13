import React from "react";
import { useParams } from "react-router-dom";
import { createDefaultState } from "../../utils/generals";
import {
	COUPON_BREAD_CRUMB_ITEMS,
	COUPON_FORM_FIELDS,
	COUPON_URL,
} from "../../constants/coupon";
import CouponForm from "./CouponForm";
import { setDateAsMonthDayYear } from "../../utils/date";
import useCoupon from "../../hooks/useCoupon";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";

const UpdateCoupon = () => {
	const Title = "Update Coupon";
	const { id } = useParams();
	const { useSingleCoupon, useUpdateCoupon } = useCoupon();
	const { data, isLoading: fetchLoading, isError, error } = useSingleCoupon(id);

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
					extractErrorMessage(
						error,
						"Failed to update coupon. Please try again."
					),
			}
		);
	};

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={isError}
			errorMessage={extractErrorMessage(
				error,
				"Failed to fetch coupon details "
			)}>
			<CouponForm
				LOADING={fetchLoading || updateLoading}
				ON_SUBMIT={handleSubmit}
				BREAD_CRUMB_ITEMS={COUPON_BREAD_CRUMB_ITEMS(Title)}
				TITLE={Title}
				DEFAULT_VALUES={defaultValues}
				DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
			/>
		</LoadingErrorBoundary>
	);
};

export default UpdateCoupon;
