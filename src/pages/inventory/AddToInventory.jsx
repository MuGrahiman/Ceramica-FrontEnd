import React from "react";
import InventoryForm from "./InventoryForm";
import { useAddToInventoryMutation } from "../../redux/store";
import { createDefaultState } from "../../utils/generals";
import {
	INVENTORY_BREAD_CRUMB_ITEMS,
	INVENTORY_URL,
} from "../../constants/inventory";
import useApiHandler from "../../hooks/useApiHandler";

// Page Component: Handles adding a product to the inventory
const AddToInventory = () => {
    const [ handleMutation ] = useApiHandler();
	const [addToInventory, { isLoading }] = handleMutation(useAddToInventoryMutation);

	const Title = "Add To Inventory";

	// Default values for the form
	const defaultValues = {
		file: null,
		image: null,
		title: "",
		category: "",
		shape: "",
		colorInput: "",
		color: { image: null, name: "", hex: "" },
		dimension: "",
		size: "",
		stock: "",
		status: null,
		price: "",
		description: "",
		images: null,
		files: [],
	};

	// Default success state for form validation
	const defaultSuccessValue = createDefaultState(
		[
			"image",
			"title",
			"category",
			"shape",
			"colorInput",
			"dimension",
			"stock",
			"size",
			"price",
			"status",
			"description",
			"images",
		],
		false
	);

	// Handles form submission and API call
	const handleSubmit = async (formData) => {
		const { image, images, colorInput, file, files, ...rest } = formData;
		const newData = { ...rest, coverImage: file, images: files };
		await addToInventory( newData, {
			onSuccess:()=> "Product added to inventory successfully",
			onError: (err) =>
				err.message || "Failed to add product. Please try again.",
			redirectPath: INVENTORY_URL,
		});
	};
	return (
		<InventoryForm
			LOADING={isLoading}
			ON_SUBMIT={handleSubmit}
			BREAD_CRUMB_ITEMS={INVENTORY_BREAD_CRUMB_ITEMS(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default AddToInventory;
