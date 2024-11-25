import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";
import AuthLayout from "../../components/AuthLayout";

const Auth = () => {
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const submitFN = async (data) => {
		// console.log(data)
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
			console.log("🚀 ~ onSubmit ~ response:", response);
			const auth = response.data;
			console.log(auth);
			if (auth.token) {
				localStorage.setItem("token", auth.token);
				setTimeout(() => {
					localStorage.removeItem("token");
					alert("Token has been expired!, Please login again.");
					navigate("/");
				}, 3600 * 1000);
			}

			alert("Admin Login successful!");
			navigate("/dashboard");
		} catch (error) {
			setMessage("Please provide a valid email and password");
			console.error(error);
		}
	};

	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center">Admin Login </h2>

			<AuthForm onSubmit={submitFN} btnText={"Admin Login"} />
			{message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
			
		</AuthLayout>
	);
};

export default Auth;
