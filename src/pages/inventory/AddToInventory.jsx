import React from "react";
import { useForm } from "react-hook-form";
import InventoryForm from "./InventoryForm";

const AddToInventory = () => {
	const Title = "Add To Inventory";
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log( data.files.every(({ file })=>["image/jpeg", "image/png", "image/jpg"].includes(file.type)));
		return;
	};
		const breadcrumbItems = [
		{ label: "Inventory", to: "/dashboard/inventory" },
		{ label: Title }, // No `to` for the current page
	];
	const defaultValues = {
		select: "",
		input: "",
	  }
	  
	return (
		<InventoryForm
			ON_SUBMIT={onSubmit}
			BREAD_CRUMB_ITEMS={breadcrumbItems}
			TITLE={Title}
		/>
	);
};

export default AddToInventory;
