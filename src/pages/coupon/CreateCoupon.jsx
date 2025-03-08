import React from "react";
//import InventoryForm from "./InventoryForm";
import {
	useCreateCouponMutation,
} from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/generals";
import CouponForm from "./CouponForm";
import {
	COUPON_BREAD_CRUMB_ITEMS,
	COUPON_FORM_FIELDS,
} from "../../constants/coupon";

// Page Component: Handles adding a product to the inventory
const CreateCoupon = () => {
	const showToast = useToast();
	const navigate = useNavigate();
	const [createCoupon, { isLoading }] = useCreateCouponMutation();

	const Title = "Create Coupon";

	// Default values for the form
	const defaultValues = createDefaultState(COUPON_FORM_FIELDS, null);

	// Default success state for form validation
	const defaultSuccessValue = createDefaultState(COUPON_FORM_FIELDS, false);

	// Handles form submission and API call
	const handleSubmit = async (formData) => {
		try {
			const data = await createCoupon(formData).unwrap();
			showToast(" Coupon created successfully", "success");
			navigate("/dashboard/coupon");
		} catch (error) {
			showToast("Failed to create coupon . Please try again.", "error");
			console.error("Error adding product:", error);
		}
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
