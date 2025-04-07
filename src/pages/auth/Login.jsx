import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
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

	// Handle social sign-ins
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
			<h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
			<AuthForm
				onSubmit={(data)=>handleLogin(data,"local")}
				btnText={"Login"}
				isLoading={isLoading}
			/>
			<p className="align-baseline font-medium my-4 text-center text-sm">
				<Link to="/mail" className="text-blue-500 hover:text-blue-700">
					Forgotten Password?
				</Link>
			</p>
			<p className="align-baseline font-medium mt-4 text-center text-sm">
				Haven't an account? Please{" "}
				<Link to="/register" className="text-blue-500 hover:text-blue-700">
					Register
				</Link>
			</p>
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

export default Login;
