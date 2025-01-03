import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AuthForm = ({ onSubmit, btnText, isLoading }) => {
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		watch,
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
					{...register("email", { required: true })}
					type="email"
					name="email"
					id="email"
					placeholder="Email Address"
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
				/>
			</div>

			{/* Password Input */}
			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="password">
					Password
				</label>
				<input
					{...register("password", { required: true })}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
				/>
			</div>

			{/* Error Message */}
			{message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

			{/* Submit Button */}
			<div>
				<button
					disabled={isLoading}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
					{btnText}
				</button>
			</div>
		</form>
	);
};

export default AuthForm;
