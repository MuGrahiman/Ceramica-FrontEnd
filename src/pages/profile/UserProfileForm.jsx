import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../../components/InputField";
import ListOptions from "../../components/ListOptions";
import { useForm } from "react-hook-form";
import useSuccessManager from "../../hooks/useSuccessManager";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/generals";
import useErrorManager from "../../hooks/useErrorManager";
import FormSubmitButton from "./FormSubmitButton";

const UserProfileForm = ({ user = {}, onSubmit, isUpdating = false }) => {
	const showToast = useToast();
	const defaultUserValue = {
		firstName: user?.firstName || null,
		lastName: user?.lastName || null,
	};

	const defaultValue = ["firstName", "lastName"];
	const defaultBoolValue = createDefaultState(defaultValue, false);

	const [isSuccess, setSuccess] = useSuccessManager(defaultBoolValue);
	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		setError,
		clearErrors,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({ defaultValues: defaultUserValue });

	const formFields = [
		{
			component: InputField,
			props: {
				NAME: "firstName",
				LABEL: "First Name",
				TYPE: "text",
				PLACEHOLDER: "Enter First Name",
			},
		},
		{
			component: InputField,
			props: {
				NAME: "lastName",
				LABEL: "Last Name",
				TYPE: "text",
				PLACEHOLDER: "Enter Last Name",
			},
		},
	];

	const validationRules = {
		firstName: {
			required: "First Name is required.",
			minLength: {
				value: 3,
				message: "First Name must be at least 3 characters long.",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("firstName");
				setSuccess("firstName", value.length >= 3 && !errors["firstName"]);
			},
		},
		lastName: {
			required: "Last Name is required.",
			minLength: {
				value: 1,
				message: "Last Name must be at least 1 characters long.",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("lastName");
				setSuccess("lastName", value.length >= 1 && !errors["lastName"]);
			},
		},
	};

	// Handle form submission
	const handleForm = (data) => {
		if (isDirty && isValid) {
			return onSubmit(data);
		} else {
			return showToast("Please make any changes", "warning");
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(handleForm)} noValidate>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Email
				</label>
				<input
					type="email"
					value={user?.email}
					className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
					disabled
				/>
			</div>
			<FormSubmitButton
				isLoading={isSubmitting || isUpdating}
				text={"Save Changes"}
			/>
 		</form>
	);
};

// Define PropTypes for the component
UserProfileForm.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
	onSubmit: PropTypes.func.isRequired,
	isUpdating: PropTypes.bool.isRequired,
};

export default UserProfileForm;
