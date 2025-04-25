import React from "react";
import PropTypes from "prop-types";
import PasswordResetNotification from "../../components/PasswordResetNotification";

/**
 * Displays a password input field with a forgot password link and conditional styling.
 * @param {string} LABEL - The label for the password input.
 * @param {string} NAME - The name attribute for the password input.
 * @param {string} TYPE - The type attribute for the password input.
 * @param {function} REGISTER - The function to register the input field with form validation.
 * @param {string} PLACEHOLDER - The placeholder text for the password input.
 * @param {object} ERRORS - The object containing validation errors.
 * @param {object} VALIDATION_RULES - The object containing validation rules.
 * @param {boolean} IS_SUCCESS - Whether the input is in a success state.
 * @param {boolean} DISABLED - Whether the input is disabled.
 * @param {boolean} isResetAlerted - Whether the reset alert is displayed.
 * @param {function} onClickForgotPassword - The function to handle the forgot password link click.
 * @param {function} resetCurrentPassword - The function to reset the current password.
 * @param {boolean} isSending - Whether the forgot password link is being sent.
 * @returns {JSX} - The password input field with a forgot password link.
 */
const AuthPasswordComponent = ({
	LABEL = "Current Password",
	NAME = "currentPassword",
	TYPE = "text",
	REGISTER,
	PLACEHOLDER,
	ERRORS,
	VALIDATION_RULES,
	IS_SUCCESS,
	DISABLED,
	onClickForgotPassword,
	resetCurrentPassword,
	isResetAlerted = false,
	isSending = false,
	...REST
}) => {

	   /**
     * Returns the appropriate input class based on validation state.
     * @returns {string} - The Tailwind CSS class for the input field.
     */
	const getInputClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		} else {
			return "border-gray-300 text-gray-700 dark:text-gray-600";
		}
	};

   /**
     * Returns the appropriate input class based on validation state.
     * @returns {string} - The Tailwind CSS class for the input field.
     */
	const labelClass = ERRORS[NAME]
		? "text-red-700 dark:text-red-500"
		: IS_SUCCESS
		? "text-green-700 dark:text-green-600"
		: "text-gray-700 dark:text-gray-600";

	return (
		<PasswordResetNotification
			isReset={isResetAlerted}
			buttonText="← Back to change password"
			onBackClick={resetCurrentPassword}>
			<div className="mb-4 col-span-full">
				<label
					htmlFor={NAME}
					className={`block text-sm font-medium mb-1 ${labelClass}`}>
					{LABEL}
				</label>
				<div className="relative">
					<input
						className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none 
                         ${getInputClass()}`}
						{...REGISTER(NAME, VALIDATION_RULES[NAME])}
						type={TYPE}
						id={NAME}
						disabled={DISABLED}
						aria-invalid={ERRORS[NAME] ? "true" : "false"}
						placeholder={PLACEHOLDER || `Enter ${NAME}`}
						{...REST}
					/>
					<button
						type="button"
						disabled={isSending}
						onClick={onClickForgotPassword}
						className="absolute right-2 top-2 text-base hover:font-medium text-blue-600 hover:text-blue-800 focus:outline-none">
						{isSending ? "Sending..." : "Forgot ?"}
					</button>
				</div>
				{ERRORS[NAME] && (
					<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
						{ERRORS[NAME].message}
					</small>
				)}
			</div>
		</PasswordResetNotification>
	);
};

AuthPasswordComponent.propTypes = {
	LABEL: PropTypes.string,
	NAME: PropTypes.string,
	TYPE: PropTypes.string,
	REGISTER: PropTypes.func.isRequired,
	PLACEHOLDER: PropTypes.string,
	ERRORS: PropTypes.object.isRequired,
	VALIDATION_RULES: PropTypes.object.isRequired,
	IS_SUCCESS: PropTypes.bool,
	DISABLED: PropTypes.bool,
	isResetAlerted: PropTypes.bool,
	onClickForgotPassword: PropTypes.func.isRequired,
	resetCurrentPassword: PropTypes.func.isRequired,
	isSending: PropTypes.bool.isRequired,
};

export default AuthPasswordComponent;
