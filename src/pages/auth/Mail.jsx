import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useForgotUserMutation } from "../../redux/store";
import useToast from "../../hooks/useToast";

const Mail = () => {
	// ** State and Hooks **
	const [email, setEmail] = useState("");
	const [forgotUser] = useForgotUserMutation();
	const navigate = useNavigate();
	const showToast = useToast();

	// ** Submit Handler **
	const submitFN = async (data) => {
		data.preventDefault();

		// Validation
		if (!email) {
			showToast("Please enter the credentials", "warning");
			return;
		}

		try {
			// API Call
			const { success, message, userId } = await forgotUser({ email }).unwrap();
			if (success) {
				showToast(message, "success");
				navigate(`/otp/${userId}`);
			} else {
				throw new Error(message);
			}
		} catch (error) {
			// Error Handling
			console.error(error);
			showToast(
				"Failed to sign up. Please try again. " +
					(error?.data?.message || error?.data || error)
			);
		}
	};

	// ** Component Render **
	return (
		<AuthLayout>
			<div className="text-center">
				<header className="mb-8">
					<h1 className="text-2xl font-bold mb-1">Enter your Mail</h1>
				</header>

				<form onSubmit={submitFN}>
					<div className="mb-4">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email Address"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
							enter
						</button>
					</div>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Mail;
