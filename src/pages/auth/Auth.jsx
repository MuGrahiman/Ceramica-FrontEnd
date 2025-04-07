import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseUrl.js";
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";
import useToast from "../../hooks/useToast";
import { useUserSlice } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth.js";

const Auth = () => {
	// ** State and Hooks **
	const { loading } = useSelector((state) => state.auth);
	const { isAuthorized } = useAuth("admin");
	
	const showToast = useToast();
	const { addUser } = useUserSlice();
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	
	useEffect(() => {
		if (isAuthorized) navigate("/dashboard");
	}, [isAuthorized, navigate]);

	// ** Submit Handler **
	const submitFN = async (data) => {
		setIsLoading(true);
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
			if (auth.user) {
				addUser(auth.user);
				showToast("Admin Login successful!", "success");
			}
		} catch (error) {
			setMessage(
				error?.response?.data?.message ||
					error?.data?.message ||
					error?.message ||
					"Please provide a valid email and password"
			);
			console.error("Login Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// ** Component Render **
	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
			<AuthForm
				isLoading={isLoading || loading}
				onSubmit={submitFN}
				btnText={"Admin Login"}
			/>
			{message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
		</AuthLayout>
	);
};

export default Auth;
