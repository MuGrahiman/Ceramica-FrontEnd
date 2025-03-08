import React, { useState } from "react";
import PropTypes from "prop-types"; // Ensure PropTypes is imported at the top
import InputField from "../../components/InputField";
import BreadCrumb from "../../components/BreadCrumb";
import TextArea from "../../components/TextArea";
import SelectField from "../../components/SelectField";
import ImageUploader from "../../components/ImageUploader";
import ColorField from "../../components/ColorField";
import useInventoryFormHandler from "../../hooks/useInventoryFormHandler";
import {
	CATEGORY_OPTIONS,
	SIZE_OPTIONS,
	STATUS_OPTIONS,
} from "../../constants/inventory";
import ListOptions from "../../components/ListOptions";
import { useForm } from "react-hook-form";
import useCoupon from "../../hooks/useCoupon";

//  InventoryForm component
const CouponForm = ({
	TITLE,
	BREAD_CRUMB_ITEMS,
	ON_SUBMIT,
	DEFAULT_VALUES,
	LOADING,
	DEFAULT_SUCCESS_VALUE,
}) => {

	const {
		register,
		errors,
		handleFormSubmit,
		validationRules,
		isSuccess,
		isSubmitting,
	} = useCoupon({ DEFAULT_SUCCESS_VALUE, DEFAULT_VALUES, ON_SUBMIT });
	// Form fields
	const formFields = [
		/* Coupon Title */
		{
			component: InputField,
			props: {
				NAME: "title",
				LABEL: "Title",
				TYPE: "text",
				PLACEHOLDER: "Enter Coupon Title",
			},
		},
		/* Limit */
		{
			component: InputField,
			props: {
				NAME: "usageLimit",
				LABEL: "Usage Limit",
				TYPE: "number",
				PLACEHOLDER: "Enter Usage Limit",
			},
		},
		/*Validity Start Date*/
		{
			component: InputField,
			props: {
				NAME: "validFrom",
				LABEL: "Valid From",
				TYPE: "date",
				PLACEHOLDER: "Enter Minimum Purchase Amount",
			},
		},
		/*Validity End Date*/
		{
			component: InputField,
			props: {
				NAME: "validUntil",
				LABEL: "Valid Until",
				TYPE: "date",
				PLACEHOLDER: "Enter Minimum Purchase Amount",
			},
		},
		/*Minimum Purchase Amount */
		{
			component: InputField,
			props: {
				NAME: "minimumPurchaseAmount",
				LABEL: "Minimum Purchase Amount",
				TYPE: "number",
				PLACEHOLDER: "Enter Minimum Purchase Amount",
			},
		},
		/*Minimum Purchase Amount */
		{
			component: InputField,
			props: {
				NAME: "discount",
				LABEL: "Discount",
				TYPE: "number",
				PLACEHOLDER: "Enter Discount",
			},
		},
		/* Status */
		{
			component: SelectField,
			props: {
				NAME: "status",
				LABEL: "Status",
				// TYPE: "bool",
				PLACEHOLDER: "Select status",
				OPTIONS: STATUS_OPTIONS,
			},
		},
		/* Description */
		{
			component: TextArea,
			props: {
				NAME: "description",
				LABEL: "Description",
				PLACEHOLDER: "Enter Description",
			},
		},
	];

	return (
		<>
			<BreadCrumb items={BREAD_CRUMB_ITEMS} />
			<div className="max-w-lg mt-12 mx-auto md:p-6 p-3 bg-gray-300 rounded-lg shadow-lg font-primary">
				<h2 className="text-2xl text-center font-extrabold font-serif text-gray-700 mb-8">
					{TITLE}
				</h2>
				<form
					className="max-w-sm mx-auto grid gap-4"
					onSubmit={handleFormSubmit}
					noValidate>
					{/* Iterate over formFields to render each component */}
					<ListOptions
						OPTIONS={formFields}
						RENDER_ITEM={({ component: Component, props }, index) => (
							<Component
								key={index}
								{...props}
								IS_SUCCESS={isSuccess[props.NAME] || false}
								ERRORS={errors}
								REGISTER={register}
								VALIDATION_RULES={validationRules}
							/>
						)}
					/>
					{/* Submit Button */}
					<div className="flex gap-1">
						<button
							disabled={isSubmitting || LOADING}
							type="submit"
							className="w-full my-8 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-lg text-lg px-5 py-2.5 text-center">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

// PropType validation for InventoryForm
CouponForm.propTypes = {
	TITLE: PropTypes.string.isRequired,
	BREAD_CRUMB_ITEMS: PropTypes.array.isRequired,
	ON_SUBMIT: PropTypes.func.isRequired,
	DEFAULT_VALUES: PropTypes.object,
	LOADING: PropTypes.bool.isRequired,
	DEFAULT_SUCCESS_VALUE: PropTypes.object.isRequired,
};

export default CouponForm;
