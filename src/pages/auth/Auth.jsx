import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";

const Auth = () => {
	// ** State and Hooks **
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	// ** Submit Handler **
	const submitFN = async (data) => {
		try {
			const response = await axios.post(
				`${getBaseUrl()}/api/admin/sign-in`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const auth = response.data;
			console.log(auth);

			if (auth.token) {
				// Save token and set expiration timeout
				localStorage.setItem("token", auth.token);
				setTimeout(() => {
					localStorage.removeItem("token");
					alert("Token has expired! Please login again.");
					navigate("/");
				}, 3600 * 1000); // Token expires in 1 hour
			}

			alert("Admin Login successful!");
			navigate("/dashboard");
		} catch (error) {
			setMessage("Please provide a valid email and password");
			console.error("Login Error:", error);
		}
	};

	// ** Component Render **
	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
			<AuthForm onSubmit={submitFN} btnText={"Admin Login"} />
			{message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
		</AuthLayout>
	);
};

export default Auth;
