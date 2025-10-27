import { useEffect } from "react";
import PropTypes from "prop-types";
import { createDefaultState } from "../../utils/generals";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import ListOptions from "../../components/ListOptions";
import AuthPasswordComponent from "./AuthPasswordComponent";
import FormSubmitButton from "./FormSubmitButton";
import useToggle, { useMiniToggler } from "../../hooks/useToggle";
import { PASSWORD_NAME_FIELDS } from "../../constants/toggle";
import {
	DEFAULT_FORM_VALUE,
	PASSWORD_NAME_FIELDS_ARRAY,
} from "../../constants/profile";

/**
 * Handles the change password form with validation and forgot password flow.
 * @param {function} onSubmit - The function to handle form submission.
 * @param {boolean} [isUpdating=false] - Indicates whether the form is updating.
 * @param {function} handleForgotPassword - The function to handle forgot password.
 * @param {boolean} [isSendingResetLink=false] - Indicates whether the reset link is being sent.
 * @param {boolean} [isSendedResetLink=false] - Indicates whether the reset link has been sent.
 * @returns {JSX} - The change password form.
 */
const ChangePasswordForm = ({
	onSubmit,
	isUpdating = false,
	handleForgotPassword,
	isSendingResetLink = false,
	isSendedResetLink = false,
}) => {
	const [showForgotFlow, setShowForgotFlow, , closeShowForgotFlow] =
		useMiniToggler(isSendedResetLink);
	useEffect(() => {
		setShowForgotFlow(isSendedResetLink);
	}, [isSendedResetLink, setShowForgotFlow]);

	const {
		handleSubmit,
		getValues,
		clearErrors,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({ defaultValues: DEFAULT_FORM_VALUE });

	const [setSuccess, isSuccess] = useToggle(
		createDefaultState(PASSWORD_NAME_FIELDS_ARRAY, false)
	);

	const formFields = [
		{
			component: AuthPasswordComponent,
			props: {
				NAME: PASSWORD_NAME_FIELDS.CURRENT_PASSWORD,
				LABEL: "Current Password",
				TYPE: "text",
				PLACEHOLDER: "Enter Current Password",
				isResetAlerted: showForgotFlow,
				onClickForgotPassword: handleForgotPassword,
				isSending: isSendingResetLink,
				resetCurrentPassword: closeShowForgotFlow,
			},
		},
		{
			component: InputField,
			props: {
				NAME: PASSWORD_NAME_FIELDS.NEW_PASSWORD,
				LABEL: "New Password",
				TYPE: "text",
				PLACEHOLDER: "Enter New Password",
			},
		},
		{
			component: InputField,
			props: {
				NAME: PASSWORD_NAME_FIELDS.CONFIRM_PASSWORD,
				LABEL: "Confirm Password",
				TYPE: "text",
				PLACEHOLDER: "Enter Confirm Password",
			},
		},
	];

	const validationRules = {
		[PASSWORD_NAME_FIELDS.CURRENT_PASSWORD]: {
			required: "Current Password is required.",
			minLength: {
				value: 6,
				message: "Current Password must be at least 6 characters long.",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors(PASSWORD_NAME_FIELDS.CURRENT_PASSWORD);
				setSuccess(
					PASSWORD_NAME_FIELDS.CURRENT_PASSWORD,
					value.length >= 6 && !errors[PASSWORD_NAME_FIELDS.CURRENT_PASSWORD]
				);
			},
		},
		[PASSWORD_NAME_FIELDS.NEW_PASSWORD]: {
			required: "New Password is required.",
			// minLength: {
			// 	value: 6,
			// 	message: "New Password must be at least 6 characters long.",
			// },
			validate: (value) => {
				const { currentPassword } = getValues();
				return value !== currentPassword || "Please Enter New Password.";
			},
			minLength: {
				value: 8,
				message: "Password must be at least 8 characters",
			},
			pattern: {
				value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
				message:
					"Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors(PASSWORD_NAME_FIELDS.NEW_PASSWORD);
				setSuccess(
					PASSWORD_NAME_FIELDS.NEW_PASSWORD,
					value.length >= 6 && !errors[PASSWORD_NAME_FIELDS.NEW_PASSWORD]
				);
			},
		},
		[PASSWORD_NAME_FIELDS.CONFIRM_PASSWORD]: {
			required: "Confirm Password is required.",
			validate: (value) => {
				const { newPassword } = getValues();
				return value === newPassword || "Passwords do not match.";
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors(PASSWORD_NAME_FIELDS.CONFIRM_PASSWORD);
				setSuccess(
					PASSWORD_NAME_FIELDS.CONFIRM_PASSWORD,
					value === getValues(PASSWORD_NAME_FIELDS.NEW_PASSWORD) &&
						!errors[PASSWORD_NAME_FIELDS.CONFIRM_PASSWORD]
				);
			},
		},
	};

	const handleForm = (data) => {
		if (isDirty && isValid) {
			return onSubmit(data);
		}
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium text-gray-900 mb-3">
				Change Password
			</h3>

			<form
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4"
				onSubmit={handleSubmit(handleForm)}>
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
				<FormSubmitButton
					isLoading={isSubmitting || isUpdating}
					text={"Change Password"}
				/>
			</form>
		</div>
	);
};

ChangePasswordForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	isUpdating: PropTypes.bool.isRequired,
	handleForgotPassword: PropTypes.func.isRequired,
	isSendingResetLink: PropTypes.bool.isRequired,
	isSendedResetLink: PropTypes.bool.isRequired,
};
export default ChangePasswordForm;
