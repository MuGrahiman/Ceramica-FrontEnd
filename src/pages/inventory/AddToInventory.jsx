import React from "react";
import InventoryForm from "./InventoryForm";
import { useAddToInventoryMutation } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/generals";
import { getBreadCrumbItems } from "../../utils/inventory";

// Page Component: Handles adding a product to the inventory
const AddToInventory = () => {
	const showToast = useToast();
	const navigate = useNavigate();
	const [addToInventory, { isLoading }] = useAddToInventoryMutation();

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

		try {
			await addToInventory(newData).unwrap();
			showToast("Product added to inventory successfully", "success");
			navigate("/dashboard/inventory");
		} catch (error) {
			showToast("Failed to add product. Please try again.", "error");
			console.error("Error adding product:", error);
		}
	};
	return (
		<InventoryForm
			LOADING={isLoading}
			ON_SUBMIT={handleSubmit}
			BREAD_CRUMB_ITEMS={getBreadCrumbItems(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default AddToInventory;
