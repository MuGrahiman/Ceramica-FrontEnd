import React from "react";
import { useForm } from "react-hook-form";
import InventoryForm from "./InventoryForm";
import { useAddToInventoryMutation } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/defaultSuccess";

const AddToInventory = () => {
	const showToast = useToast();
	const navigate = useNavigate();
	const [addToInventory, { isLoading }] = useAddToInventoryMutation();

	const Title = "Add To Inventory";
	const breadcrumbItems = [
		{ label: "Inventory", to: "/dashboard/inventory" },
		{ label: Title },
	];

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
		price: "",
		description: "",
		images: null,
		files: [],
	};
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
			"description",
			"images",
		],
		false
	);
	const onSubmit = async ({
		image,
		images,
		colorInput,
		file,
		files,
		...rest
	}) => {
		const newData = {
			...rest,
			coverImage: file,
			images: files,
		};
		try {
			await addToInventory(newData).unwrap();
			showToast("Product added to inventory successfully", "success");
			navigate("/dashboard/inventory");
		} catch (error) {
			console.error(error);
			alert("Failed to add book. Please try again.");
		}
	};

	return (
		<InventoryForm
			LOADING={isLoading}
			ON_SUBMIT={onSubmit}
			BREAD_CRUMB_ITEMS={breadcrumbItems}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default AddToInventory;