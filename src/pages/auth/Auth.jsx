import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseUrl.js";
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";
import useToast from "../../hooks/useToast";
import { addUser, removeUser } from "../../redux/store";
import { useDispatch } from "react-redux";

const Auth = () => {
	const APP = "STORE-APP-USER";
	const showToast = useToast();
	const dispatch = useDispatch();

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
			console.log("🚀 ~ submitFN ~ auth:", auth)

			if (auth.user) {
				// Save token and set expiration timeout
				dispatch(addUser(auth.user));
				setTimeout(() => {
					dispatch(removeUser());
					alert("Token has expired! Please login again.");
					navigate("/");
				}, 3600 * 10000); // Token expires in 1 hour
			}

			navigate("/dashboard");
			showToast("Admin Login successful!", "success");
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
