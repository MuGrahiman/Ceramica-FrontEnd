import React from "react";
import PropTypes from "prop-types";  
import { useForm } from "react-hook-form";

/**
 * AuthForm Component
 * A reusable form for authentication (login/signup).
 * 
 * @param {function} onSubmit - Function to handle form submission.
 * @param {string} btnText - Text to display on the submit button.
 * @param {boolean} isLoading - Boolean flag to disable the button during loading state.
 */
const AuthForm = ({ onSubmit, btnText, isLoading }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Email Input */}
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="email">
					Email
				</label>
				<input
					{...register("email", { required: "Email is required" })}
					type="email"
					name="email"
					id="email"
					placeholder="Email Address"
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
				/>
				{errors.email && (
					<small className="text-red-500 text-xs italic mb-3">
						{errors.email.message}
					</small>
				)}
			</div>

			{/* Password Input */}
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="password">
					Password
				</label>
				<input
					{...register("password", { required: "Password is required" })}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
				/>
				{/* Error Message */}
				{errors.password && (
					<small className="text-red-500 text-xs italic mb-3">
						{errors.password.message}
					</small>
				)}
			</div>

			{/* Submit Button */}
			<div>
				<button
					disabled={isLoading}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
					{isLoading ? "Loading..." : btnText}
				</button>
			</div>
		</form>
	);
};

// Prop validation for AuthForm
AuthForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,     // onSubmit should be a function
	btnText: PropTypes.string.isRequired,    // btnText should be a string
	isLoading: PropTypes.bool.isRequired,    // isLoading should be a boolean
};

export default AuthForm;
