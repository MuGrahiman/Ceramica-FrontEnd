import React from "react";
import { useParams } from "react-router-dom";
import {
	useGetInventoryItemByIdQuery,
	useUpdateInventoryMutation,
} from "../../redux/store";
import InventoryForm from "./InventoryForm";
import { createDefaultState } from "../../utils/generals";
import {
	INVENTORY_BREAD_CRUMB_ITEMS,
	INVENTORY_URL,
} from "../../constants/inventory";
import useApiHandler from "../../hooks/useApiHandler";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";

// Page Component: Handles updating a product in the inventory
const UpdateInventory = () => {
	const { id } = useParams();
	const [handleMutation] = useApiHandler();

	const {
		data,
		isLoading: fetchLoading,
		isError,
		error,
	} = useGetInventoryItemByIdQuery(id);
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

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={isError}
			errorMessage={
				error?.data?.message ||
				error?.message ||
				"Failed to fetch product details"
			}>
			<InventoryForm
				LOADING={fetchLoading || updateLoading}
				ON_SUBMIT={onSubmit}
				BREAD_CRUMB_ITEMS={INVENTORY_BREAD_CRUMB_ITEMS(Title)}
				TITLE={Title}
				DEFAULT_VALUES={defaultValues}
				DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
			/>
		</LoadingErrorBoundary>
	);
};

export default UpdateInventory;
