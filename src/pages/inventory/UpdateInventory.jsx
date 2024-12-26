import React from "react";
import { useForm } from "react-hook-form";
import InventoryForm from "./InventoryForm";
import {
	useAddToInventoryMutation,
	useGetInventoryItemByIdQuery,
	useUpdateInventoryMutation,
} from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import Loading from "../../components/Loading";
import { createDefaultState } from "../../utils/defaultSuccess";

const UpdateInventory = () => {
	const { id } = useParams();
	const { data, isLoading: fetchLoading } = useGetInventoryItemByIdQuery(id);
	const [updateInventory, { isLoading: updateLoading }] =
		useUpdateInventoryMutation();

	const showToast = useToast();
	const navigate = useNavigate();

	const Title = "Update Inventory";
	const breadcrumbItems = [
		{ label: "Inventory", to: "/dashboard/inventory" },
		{ label: Title },
	];

	const defaultValues = {
		colorInput: data?.color.hex,
		file: data?.coverImage,
		files: data?.images,
		...data,
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
		true
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
			await updateInventory({ id, newData }).unwrap();
			showToast("Product updated successfully", "success");
			navigate("/dashboard/inventory");
		} catch (error) {
			console.error(error);
			alert("Failed to add book. Please try again.");
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
			BREAD_CRUMB_ITEMS={breadcrumbItems}
			TITLE={Title}
			DEFAULT_VALUES={defaultValues}
			DEFAULT_SUCCESS_VALUE={defaultSuccessValue}
		/>
	);
};

export default UpdateInventory;
