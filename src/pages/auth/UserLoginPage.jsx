import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useContextAuth } from "../../context/AuthContext";
import { addUser, useLoginUserMutation } from "../../redux/store";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";
import useApiHandler from "../../hooks/useApiHandler";
import { useAuth } from "../../hooks/useAuth";
import useExtract from "../../hooks/useExtract";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";

const UserLoginPage = () => {
	const { isAuthorized } = useAuth("client");
	const { signInWithFaceBook, signInWithGoogle } = useContextAuth();
	const [handleLoginMutation] = useApiHandler();
	const [loginUser, { isLoading }] = handleLoginMutation(useLoginUserMutation);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showToast = useToast();
	const execute = useExtract();

	// Redirect if already logged in
	useEffect(() => {
		if (isAuthorized) {
			navigate("/");
		}
	}, [isAuthorized, showToast, navigate]);

	// Handle form submission
	const handleLogin = async (formData, provider) => {
		if (!provider) {
			console.error("Provider is not provided");
			return;
		}
		if (!formData) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		await loginUser(
			{
				provider,
				...formData,
			},
			{
				onSuccess: (res) => {
					if (res.success) {
						dispatch(addUser(res.data));
						showToast(res.message, "success");
						navigate("/");
					}
				},
				onError: (err) =>
					showToast(
						err.data?.message || err?.message || "User sign-in failed",
						"error"
					),
			}
		);
	};

	// Handle social sign-ins (facebook / google)
	const handleSocialSignIn = async (signInFunction, provider) => {
		try {
			const userData = await execute.extractData(signInFunction);

			if (!userData) throw new Error("No user data extracted!");
			await handleLogin(userData, provider);
		} catch (error) {
			showToast(error.message || "Sign-in failed", "error");
		}
	};

	return (
		<AuthLayout>
			<AuthHeader
				title="Login"
				description="Please enter your credentials to access your account."
			/>
			<AuthForm
				isLogging
				onSubmit={(data) => handleLogin(data, "local")}
				btnText={"Login"}
				isLoading={isLoading}
			/>
			<AuthRedirectMessage
				linkText="Forgotten Password?"
				linkTo="/verify-mail"
			/>
			<AuthRedirectMessage
				message="Haven't an account? Please "
				linkText="Register"
				linkTo="/register"
			/>

			<div className="mt-4">
				<button
					onClick={() => handleSocialSignIn(signInWithGoogle, "google")}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
					<FcGoogle className="mr-2" />
					Sign in with Google
				</button>
			</div>
			<div className="mt-4">
				<button
					onClick={() => handleSocialSignIn(signInWithFaceBook, "facebook")}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
					<FaFacebook className="mr-2" />
					Sign in with Facebook
				</button>
			</div>
		</AuthLayout>
	);
};

export default UserLoginPage;
