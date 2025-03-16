import React from "react";
import { useParams } from "react-router-dom";
import {
	useGetInventoryItemByIdQuery,
	useUpdateInventoryMutation,
} from "../../redux/store";
import InventoryForm from "./InventoryForm";
import { createDefaultState } from "../../utils/generals";
import LoadingTemplate from "../../components/LoadingTemplate";
import {
	INVENTORY_BREAD_CRUMB_ITEMS,
	INVENTORY_URL,
} from "../../constants/inventory";
import useApiHandler from "../../hooks/useApiHandler";

// Page Component: Handles updating a product in the inventory
const UpdateInventory = () => {
	const { id } = useParams();
	const [handleMutation, handleApiCall] = useApiHandler();

	const { data, isLoading: fetchLoading } = useGetInventoryItemByIdQuery(id);
	const [updateInventory, { isLoading: updateLoading }] = handleMutation(
		useUpdateInventoryMutation
	);

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
		await updateInventory(
			{ id, newData },
			{
				onSuccess: () => "Product updated successfully",
				onError: (err) =>
					err.message || "Failed to update product. Please try again.",
				redirectPath: INVENTORY_URL,
			}
		);
	};

	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inventory, please wait..." />
			</div>
		);
	}

	return (
		<InventoryForm
			LOADING={fetchLoading || updateLoading}
			ON_SUBMIT={onSubmit}
			BREAD_CRUMB_ITEMS={INVENTORY_BREAD_CRUMB_ITEMS(Title)}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default UpdateInventory;
