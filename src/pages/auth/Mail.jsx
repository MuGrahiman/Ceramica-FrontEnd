import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useForgotUserMutation } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

const Mail = () => {
	const [forgotUser] = useForgotUserMutation();
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const showToast = useToast();


	const submitFN = async (data) => {
		data.preventDefault();
		if (!email) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		try {
			const { success, message, userId } = await forgotUser({ email }).unwrap();
			console.log(
				"🚀 ~ submitFN ~ success, message, userId:",
				success,
				message,
				userId
			);

			if (success) showToast(message,'success');
			else throw new Error(message);

			navigate(`/otp/${userId}`);
		} catch (error) {
			console.error(error);
			showToast(
				"Failed to sign up. Please try again. " +
					(error?.data?.message || error?.data || error)
			);
		}
	};

	return (
		<AuthLayout>
			<div className=" text-center">
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
