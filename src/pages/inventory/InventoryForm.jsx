import React from "react";
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

//  InventoryForm component
const InventoryForm = ({
	TITLE,
	BREAD_CRUMB_ITEMS,
	ON_SUBMIT,
	DEFAULT_VALUES,
	LOADING,
	DEFAULT_SUCCESS_VALUE,
}) => {
	// Destructuring hook values
	const {
		register,
		isSuccess,
		validationRules,
		fields,
		errors,
		imageField,
		fileLoading,
		colorData,
		isFormSubmitting,
		handleFormSubmit,
		onFileRemove,
		onFilesRemove,
		onColorAdd,
	} = useInventoryFormHandler({
		DEFAULT_VALUES,
		DEFAULT_SUCCESS_VALUE,
		ON_SUBMIT,
		LOADING,
	});

	// Form fields
	const formFields = [
		/* Image Upload */
		{
			component: ImageUploader,
			props: {
				NAME: "image",
				LABEL: "Image",
				MAX_LENGTH: 1,
				TYPE: "file",
				IS_LOADING: fileLoading["image"],
				HANDLE_FILE_REMOVE: onFileRemove,
				FIELDS: imageField,
				RENDER: (data) => data,
			},
		},
		/* Product Title */
		{
			component: InputField,
			props: {
				NAME: "title",
				LABEL: "Title",
				TYPE: "text",
				PLACEHOLDER: "Enter product title",
			},
		},
		/* Category */
		{
			component: SelectField,
			props: {
				NAME: "category",
				LABEL: "Category",
				PLACEHOLDER: "Select Category",
				OPTIONS: CATEGORY_OPTIONS,
			},
		},
		/* Shape */
		{
			component: InputField,
			props: {
				NAME: "shape",
				LABEL: "Shape",
				TYPE: "text",
				PLACEHOLDER: "Enter Shape",
			},
		},
		/* Color */
		{
			component: ColorField,
			props: {
				NAME: "colorInput",
				LABEL: "Color",
				TYPE: "text",
				PLACEHOLDER: "Enter color (HEX)",
				ON_ADD: onColorAdd,
				COLOR_DATA: colorData,
			},
		},
		/* Dimension */
		{
			component: InputField,
			props: {
				NAME: "dimension",
				LABEL: "Dimension",
				TYPE: "text",
				PLACEHOLDER: "Enter Dimension",
			},
		},
		/* Stock */
		{
			component: InputField,
			props: {
				NAME: "stock",
				LABEL: "Stock",
				TYPE: "number",
				PLACEHOLDER: "Enter Stock",
			},
		},
		/* Size */
		{
			component: SelectField,
			props: {
				NAME: "size",
				LABEL: "Size",
				PLACEHOLDER: "Select Size",
				OPTIONS: SIZE_OPTIONS,
			},
		},
		/* Price */
		{
			component: InputField,
			props: {
				NAME: "price",
				LABEL: "Price",
				TYPE: "number",
				PLACEHOLDER: "Enter Price",
			},
		},
		/* Status */
		{
			component: SelectField,
			props: {
				NAME: "status",
				LABEL: "Status",
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
		/* Images Upload */
		{
			component: ImageUploader,
			props: {
				NAME: "images",
				LABEL: "Images",
				MAX_LENGTH: 5,
				TYPE: "file",
				FIELDS: fields,
				IS_LOADING: fileLoading["images"],
				HANDLE_FILE_REMOVE: onFilesRemove,
				RENDER: (data) => data,
				multiple: true,
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
							disabled={isFormSubmitting}
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
InventoryForm.propTypes = {
	TITLE: PropTypes.string.isRequired,
	BREAD_CRUMB_ITEMS: PropTypes.array.isRequired,
	ON_SUBMIT: PropTypes.func.isRequired,
	DEFAULT_VALUES: PropTypes.object,
	LOADING: PropTypes.bool.isRequired,
	DEFAULT_SUCCESS_VALUE: PropTypes.object.isRequired,
};

export default InventoryForm;
