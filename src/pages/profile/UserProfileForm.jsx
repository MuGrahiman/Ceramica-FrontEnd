import React from "react";
import PropTypes from "prop-types";
import InputField from "../../components/InputField";
import ListOptions from "../../components/ListOptions";
import { useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";
import { createDefaultState } from "../../utils/generals";
import FormSubmitButton from "./FormSubmitButton";
import useToggle from "../../hooks/useToggle";
import { PROFILE_USER_NAME_FIELDS } from "../../constants/toggle";

/**
 * Handles the user profile form with validation and success state management.
 * @param {Object} user - The user object containing details.
 * @param {function} onSubmit - The function to handle form submission.
 * @param {boolean} [isUpdating=false] - Indicates whether the form is updating.
 * @returns {JSX} - The user profile form.
 */
const UserProfileForm = ({ user = {}, onSubmit, isUpdating = false }) => {
	const showToast = useToast();

	const initialUserNames = createDefaultState(Object.values(PROFILE_USER_NAME_FIELDS), null, {
		[PROFILE_USER_NAME_FIELDS.FIRST_NAME]: user?.firstName || null,
		[PROFILE_USER_NAME_FIELDS.LAST_NAME]: user?.lastName || null,
	});
	const userNamesKeysArray = Object.keys(initialUserNames);
	const userNamesToggleState = createDefaultState(userNamesKeysArray, false);
	const [setSuccess, isSuccess] = useToggle(userNamesToggleState);
	
	const {
		handleSubmit,
		clearErrors,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({ defaultValues: initialUserNames });

	const formFields = [
		{
			component: InputField,
			props: {
				NAME: PROFILE_USER_NAME_FIELDS.FIRST_NAME,
				LABEL: "First Name",
				TYPE: "text",
				PLACEHOLDER: "Enter First Name",
			},
		},
		{
			component: InputField,
			props: {
				NAME: PROFILE_USER_NAME_FIELDS.LAST_NAME,
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
				clearErrors(PROFILE_USER_NAME_FIELDS.FIRST_NAME);
				setSuccess(PROFILE_USER_NAME_FIELDS.FIRST_NAME, value.length >= 3 && !errors[PROFILE_USER_NAME_FIELDS.FIRST_NAME]);
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
				clearErrors(PROFILE_USER_NAME_FIELDS.LAST_NAME);
				setSuccess(PROFILE_USER_NAME_FIELDS.LAST_NAME, value.length >= 1 && !errors[PROFILE_USER_NAME_FIELDS.LAST_NAME]);
			},
		},
	};

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
							IS_SUCCESS={isSuccess(props.NAME)}
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
