import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useSuccessManager from "../../hooks/useSuccessManager";
import { createDefaultState } from "../../utils/generals";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import ListOptions from "../../components/ListOptions";
import AuthPasswordComponent from "./AuthPasswordComponent";
import FormSubmitButton from "./FormSubmitButton";

const ChangePasswordForm = ({
	onSubmit,
	isUpdating = false,
	handleForgotPassword,
	isSendingResetLink = false,
	isSendedResetLink = false,
}) => {
	const defaultPasswordValue = [
		"currentPassword",
		"newPassword",
		"confirmPassword",
	];
	const defaultFormValue = createDefaultState(defaultPasswordValue, "");
	const [showForgotFlow, setShowForgotFlow] = useState(isSendedResetLink);
	useEffect(() => {
		setShowForgotFlow(isSendedResetLink);
	}, [isSendedResetLink]);

	const {
		handleSubmit,
		getValues,
		clearErrors,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({ defaultValues: defaultFormValue });
	const [isSuccess, setSuccess] = useSuccessManager(
		createDefaultState(defaultPasswordValue, false)
	);

	const formFields = [
		{
			component: AuthPasswordComponent,
			props: {
				NAME: "currentPassword",
				LABEL: "Current Password",
				TYPE: "text",
				PLACEHOLDER: "Enter Current Password",
				isResetAlerted: showForgotFlow,
				onClickForgotPassword: handleForgotPassword,
				isSending: isSendingResetLink,
				resetCurrentPassword: () => setShowForgotFlow(false),
			},
		},
		{
			component: InputField,
			props: {
				NAME: "newPassword",
				LABEL: "New Password",
				TYPE: "text",
				PLACEHOLDER: "Enter New Password",
			},
		},
		{
			component: InputField,
			props: {
				NAME: "confirmPassword",
				LABEL: "Confirm Password",
				TYPE: "text",
				PLACEHOLDER: "Enter Confirm Password",
			},
		},
	];

	const validationRules = {
		currentPassword: {
			required: "Current Password is required.",
			minLength: {
				value: 6,
				message: "Current Password must be at least 6 characters long.",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("currentPassword");
				setSuccess(
					"currentPassword",
					value.length >= 6 && !errors["currentPassword"]
				);
			},
		},
		newPassword: {
			required: "New Password is required.",
			minLength: {
				value: 6,
				message: "New Password must be at least 6 characters long.",
			},
			validate: (value) => {
				const { currentPassword } = getValues();
				return value !== currentPassword || "Please Enter New Password.";
			},
			// minLength: {
			// 	value: 8,
			// 	message: "Password must be at least 8 characters", 
			//   },
			//   pattern: {
			// 	value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
			// 	message:
			// 	  "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
			//   },
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("newPassword");
				setSuccess("newPassword", value.length >= 6 && !errors["newPassword"]);
			},
		},
		confirmPassword: {
			required: "Confirm Password is required.",
			validate: (value) => {
				const { newPassword } = getValues();
				return value === newPassword || "Passwords do not match.";
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("confirmPassword");
				setSuccess(
					"confirmPassword",
					value === getValues("newPassword") && !errors["confirmPassword"]
				);
			},
		},
	};
	// Handle form submission
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
							IS_SUCCESS={isSuccess[props.NAME] || false}
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
