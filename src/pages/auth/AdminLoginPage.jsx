import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../../utils/baseUrl.js";
import AuthLayout from "../../components/AuthLayout";
import AuthForm from "../../components/AuthForm";
import { useUserSlice } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth.js";
import AuthHeader from "./AuthHeader.jsx";
import { useMiniToggler } from "../../hooks/useToggle.js";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
	const { loading } = useSelector((state) => state.auth);
	const { isAuthorized } = useAuth("admin");
	const { success: successToast } = toast;

	const { addUser } = useUserSlice();
	const [message, setMessage] = useState("");
	const [isLoading, , startLoading, stopLoading] = useMiniToggler();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthorized) navigate("/dashboard");
	}, [isAuthorized, navigate]);

	const submitFN = async (data) => {
		startLoading();
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
				successToast("Admin Login successful!");
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
			stopLoading();
		}
	};

	return (
		<AuthLayout>
			<AuthHeader
				title="Admin Login"
				description="Enter your admin credentials to manage the platform."
			/>
			<AuthForm
				isLogging
				isLoading={isLoading || loading}
				onSubmit={submitFN}
				btnText={"Admin Login"}
			/>
			{message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
		</AuthLayout>
	);
};

export default AdminLoginPage;
