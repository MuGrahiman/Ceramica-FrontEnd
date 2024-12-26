import React, { useState } from "react";
import InputField from "../../components/InputField";
import BreadCrumb from "../../components/BreadCrumb";
import TextArea from "../../components/TextArea";
import SelectField from "../../components/SelectField";
import ImageUploader from "../../components/ImageUploader";
import ColorDisplay from "../../components/ColorDisplay";
import useInventoryFormHandler from "../../hooks/useInventoryFormHandler";
import { CATEGORY_OPTIONS, SIZE_OPTIONS } from "../../constants/inventory";

const InventoryForm = ({
	TITLE,
	BREAD_CRUMB_ITEMS,
	ON_SUBMIT,
	DEFAULT_VALUES,
	LOADING,
	DEFAULT_SUCCESS_VALUE,
}) => {
	const [showColor, setShowColor] = useState(false);
	const {
		register,
		isSuccess,
		validationRules,
		fields,
		errors,
		imageField,
		fileLoading,
		colorValue,
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
	const ColorComponent = (props) => (
		<div className="mb-2">
			<InputField {...props} />
			{showColor && (
				<ColorDisplay
					ON_LOADING={colorValue.colorLoading}
					IMAGE_URL={colorValue.image}
					COLOR_NAME={colorValue.name}
					HEX_VALUE={colorValue.hex}
					ON_ADD={onColorAdd}
				/>
			)}
		</div>
	);

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
				// IS_SUCCESS: isSuccess["image"],
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
				// IS_SUCCESS: isSuccess["title"],
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
				// IS_SUCCESS: isSuccess["category"],
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
				// IS_SUCCESS: isSuccess["shape"],
			},
		},
		/* Color */
		{
			component: ColorComponent,
			props: {
				NAME: "colorInput",
				LABEL: "Color",
				TYPE: "text",
				PLACEHOLDER: "Enter color (HEX)",
				onFocus: () => setShowColor(true),
				// IS_SUCCESS: isSuccess["colorInput"],
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
				// IS_SUCCESS: isSuccess["dimension"],
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
				// IS_SUCCESS: isSuccess["stock"],
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
				// IS_SUCCESS: isSuccess["size"],
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
				// IS_SUCCESS: isSuccess["price"],
			},
		},
		/* Description */
		{
			component: TextArea,
			props: {
				NAME: "description",
				LABEL: "Description",
				PLACEHOLDER: "Enter Description",
				// IS_SUCCESS: isSuccess["description"],
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
				// IS_SUCCESS: isSuccess["images"],
			},
		},
	];

	return (
		<section className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
			<BreadCrumb items={BREAD_CRUMB_ITEMS} />
			<div className="max-w-lg mt-12 mx-auto md:p-6 p-3 bg-gray-300 rounded-lg shadow-lg">
				<h2 className="text-2xl text-center font-extrabold font-serif text-gray-700 mb-8">
					{TITLE}
				</h2>
				<form
					className="max-w-sm mx-auto"
					onSubmit={handleFormSubmit}
					noValidate>
					{formFields.map(({ component: Component, props }, index) => (
						<Component
							key={index}
							{...props}
							IS_SUCCESS={isSuccess[props.NAME]}
							ERRORS={errors}
							REGISTER={register}
							VALIDATION_RULES={validationRules}
						/>
					))}
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
		</section>
	);
};

export default InventoryForm;

{
	/* return (
	<section className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
		<BreadCrumb items={BREAD_CRUMB_ITEMS} />
		<div className="max-w-lg mt-12 mx-auto md:p-6 p-3 bg-gray-300 rounded-lg shadow-lg">
			<h2 className="text-2xl text-center font-extrabold font-serif text-gray-700 mb-8">
				{TITLE}
			</h2>
			<form
				className="max-w-sm mx-auto"
				onSubmit={handleFormSubmit}
				noValidate>
				{/* Image Upload */
}
// 				<ImageUploader
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Product Title */}
// 				<InputField
// 					LABEL="Title"
// 					NAME="title"
// 					TYPE="text"
// 					PLACEHOLDER="Enter product title"
// 					IS_SUCCESS={isSuccess["title"]}
// 					ERRORS={errors}
// 					REGISTER={register}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Category */}
// 				<SelectField
// 					NAME="category"
// 					LABEL="Category"
// 					PLACEHOLDER="Select Category"
// 					IS_SUCCESS={isSuccess["category"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 					OPTIONS={CATEGORY_OPTIONS}
// 				/>

// 				{/* Shape */}
// 				<InputField
// 					NAME="shape"
// 					LABEL="Shape"
// 					PLACEHOLDER="Enter Shape"
// 					TYPE="text"
// 					IS_SUCCESS={isSuccess["shape"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Color */}
// 				<div className="mb-2">
// 					<InputField
// 						NAME="colorInput"
// 						LABEL="Color"
// 						PLACEHOLDER="Enter color (HEX)"
// 						TYPE="text"
// 						REGISTER={register}
// 						onFocus={() => setShowColor(true)}
// 						ERRORS={errors}
// 						IS_SUCCESS={isSuccess["colorInput"]}
// 						VALIDATION_RULES={validationRules}
// 					/>
// 					{showColor && (
// 						<ColorDisplay
// 							ON_LOADING={colorValue.colorLoading}
// 							IMAGE_URL={colorValue.image}
// 							COLOR_NAME={colorValue.name}
// 							HEX_VALUE={colorValue.hex}
// 							ON_ADD={onColorAdd}
// 						/>
// 					)}
// 				</div>

// 				{/* Dimension */}
// 				<InputField
// 					NAME="dimension"
// 					LABEL="Dimension"
// 					PLACEHOLDER="Enter Dimension"
// 					TYPE="text"
// 					IS_SUCCESS={isSuccess["dimension"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Stock */}
// 				<InputField
// 					NAME="stock"
// 					LABEL="Stock"
// 					PLACEHOLDER="Enter the Stock"
// 					TYPE="number"
// 					IS_SUCCESS={isSuccess["stock"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Size */}
// 				<SelectField
// 					NAME="size"
// 					LABEL="Size"
// 					PLACEHOLDER="Select Size"
// 					IS_SUCCESS={isSuccess["size"]}
// 					OPTIONS={SIZE_OPTIONS}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Price */}
// 				<InputField
// 					NAME="price"
// 					LABEL="Price"
// 					PLACEHOLDER="Enter price"
// 					TYPE="number"
// 					IS_SUCCESS={isSuccess["price"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Description */}
// 				<TextArea
// 					LABEL="Description"
// 					PLACEHOLDER="Enter product description"
// 					IS_SUCCESS={isSuccess["description"]}
// 					NAME="description"
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Images */}
// 				<ImageUploader
// 					LABEL="Images"
// 					MAX_LENGTH={5}
// 					TYPE="file"
// 					HANDLE_FILE_REMOVE={onFilesRemove}
// 					IS_LOADING={fileLoading["images"]}
// 					FIELDS={fields}
// 					RENDER={(data) => data}
// 					multiple
// 					NAME="images"
// 					IS_SUCCESS={isSuccess["images"]}
// 					REGISTER={register}
// 					ERRORS={errors}
// 					VALIDATION_RULES={validationRules}
// 				/>

// 				{/* Submit Button */}
// 				<div className="flex gap-1">
// 					<button
// 						disabled={isFormSubmitting}
// 						type="submit"
// 						className="w-full my-8 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-lg text-lg px-5 py-2.5 text-center">
// 						Submit
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	</section>
// ); */}
