import React from "react";
import { createDefaultState } from "../../utils/generals";
import CouponForm from "./CouponForm";
import {
	COUPON_BREAD_CRUMB_ITEMS,
	COUPON_FORM_FIELDS,
	COUPON_URL,
} from "../../constants/coupon";
import useCoupon from "../../hooks/useCoupon";

const CreateCoupon = () => {
	const Title = "Create Coupon";
	const { useCreateCoupon } = useCoupon();
	const [createCoupon, { isLoading }] = useCreateCoupon();

	// Default values for the form
	const defaultValues = createDefaultState(COUPON_FORM_FIELDS, null);

	// Default success state for form validation
	const defaultSuccessValue = createDefaultState(COUPON_FORM_FIELDS, false);

	// Handles form submission and API call
	const handleSubmit = async (formData) => {
		await createCoupon(formData, {
			onSuccess: () => "Coupon created successfully",
			redirectPath: COUPON_URL,
			onError: (error) =>
				error.message || "Failed to create coupon. Please try again.",
		});
	};

	return (
		<CouponForm
			LOADING={isLoading}
			ON_SUBMIT={handleSubmit}
			BREAD_CRUMB_ITEMS={COUPON_BREAD_CRUMB_ITEMS(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default CreateCoupon;
