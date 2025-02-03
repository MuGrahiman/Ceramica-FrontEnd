import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetInventoryItemByIdQuery,
	useUpdateInventoryMutation,
} from "../../redux/store";
import useToast from "../../hooks/useToast";
import Loading from "../../components/Loading";
import InventoryForm from "./InventoryForm";
import { createDefaultState } from "../../utils/generals";
import { getBreadCrumbItems } from "../../utils/inventory";

// Page Component: Handles updating a product in the inventory
const UpdateInventory = () => {
	const { id } = useParams();
	const { data, isLoading: fetchLoading } = useGetInventoryItemByIdQuery(id);
	const [updateInventory, { isLoading: updateLoading }] =
		useUpdateInventoryMutation();
	const showToast = useToast();
	const navigate = useNavigate();

	// Define constant strings
	const Title = "Update Inventory";

	// Default values for the form
	const defaultValues = {
		colorInput: data?.color.hex,
		file: data?.coverImage,
		files: data?.images,
		status: data?.status,
		...data,
	};

	// Create default success state
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
		true
	);

	// Handle form submission
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
			await updateInventory({ id, newData }).unwrap();
			showToast("Product updated successfully", "success");
			navigate("/dashboard/inventory");
		} catch (error) {
			console.error(error);
			showToast("Failed to update product. Please try again.", "error");
		}
	};

	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading message="Fetching inventory, please wait..." />
			</div>
		);
	}

	return (
		<InventoryForm
			LOADING={fetchLoading || updateLoading}
			ON_SUBMIT={onSubmit}
			BREAD_CRUMB_ITEMS={getBreadCrumbItems(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default UpdateInventory;
