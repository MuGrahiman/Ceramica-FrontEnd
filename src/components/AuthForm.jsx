import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import MiniLoader from "./MiniLoader";

/**
 * AuthForm - A reusable authentication form component for login and registration
 *
 * Features:
 * - Handles both login and registration flows
 * - Built-in form validation
 * - Loading state support
 * - Reusable input fields
 *
 * @param {function} onSubmit - Form submission handler
 * @param {string} btnText - Submit button text
 * @param {boolean} isLoading - Loading state flag
 * @param {boolean} isRegistering - Registration mode flag
 */
const AuthForm = ({ onSubmit, btnText, isLoading, isRegistering = false }) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const fieldConfigurations = [
		{
			showWhen: isRegistering,
			label: "First Name",
			name: "firstName",
			type: "text",
			placeholder: "Enter your first name",
			validation: {
				required: "First name is required",
				minLength: {
					value: 3,
					message: "First name must be at least 3 characters",
				},
			},
		},
		{
			showWhen: isRegistering,
			label: "Last Name",
			name: "lastName",
			type: "text",
			placeholder: "Enter your last name",
			validation: {
				required: "Last name is required",
				minLength: {
					value: 3,
					message: "Last name must be at least 3 characters",
				},
			},
		},
		{
			showWhen: true, 
			label: "Email",
			name: "email",
			type: "email",
			placeholder: "Enter your email address",
			validation: {
				required: "Email is required",
				pattern: {
					value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
					message: "Please enter a valid email address",
				},
			},
		},
		{
			showWhen: true, 
			label: "Password",
			name: "password",
			type: "text",
			placeholder: "Enter your password",
			validation: {
				required: "Password is required",
				// minLength: {
				// 	value: 10,
				// 	message: "Password must be at least 10 characters",
				// },
				// pattern: {
				// 	value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
				// 	message: "Must contain a number and special character",
				// },
			},
		},
		{
			showWhen: isRegistering,
			label: "Confirm Password",
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm your password",
			validation: {
				required: "Please confirm your password",
				validate: (value) =>
					value === getValues("password") || "Passwords do not match",
			},
		},
	];

	/**
	 * FormInput - Reusable controlled input component with validation
	 *
	 * @param {string} label - Input label text
	 * @param {string} name - Input name attribute
	 * @param {string} type - Input type attribute
	 * @param {string} placeholder - Input placeholder text
	 * @param {object} validation - Validation rules object
	 */
	const FormInput = ({ label, name, type, placeholder, validation }) => (
		<div className="mb-4">
			<label
				className="block text-gray-700 text-sm font-bold mb-2"
				htmlFor={name}>
				{label}
			</label>
			<input
				{...register(name, validation)}
				type={type}
				id={name}
				placeholder={placeholder}
				className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
					errors[name] ? "border-red-500" : ""
				}`}
			/>
			{errors[name] && (
				<p className="text-red-500 text-xs italic mt-1">
					{errors[name].message}
				</p>
			)}
		</div>
	);

	FormInput.propTypes = {
		label: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		validation: PropTypes.object.isRequired,
	};

	/**
	 * SubmitButton - Form submission button with loading state
	 */
	const SubmitButton = () => (
		<button
			type="submit"
			disabled={isLoading}
			className={`w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${
				isLoading ? "opacity-75 cursor-not-allowed" : ""
			}`}>
			{isLoading ? (
				<>
					<MiniLoader/>Processing...
				</>
			) : (
				btnText
			)}
		</button>
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{fieldConfigurations.map(
				(field) =>
					field.showWhen && (
						<FormInput
							key={field.name}
							label={field.label}
							name={field.name}
							type={field.type}
							placeholder={field.placeholder}
							validation={field.validation}
						/>
					)
			)}

			<SubmitButton />
		</form>
	);
};

AuthForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	btnText: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isRegistering: PropTypes.bool,
};

export default AuthForm;
