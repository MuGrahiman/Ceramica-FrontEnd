import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import useExtract from "../../hooks/useExtract";
import { useLoginUserMutation } from "../../redux/store";
import AuthForm from "../../components/AuthForm";
import Swal from "sweetalert2";
import AuthLayout from "../../components/AuthLayout";
import useToast from "../../hooks/useToast";

const Login = () => {
	const execute = useExtract();
	const { signInWithFaceBook, signInWithGoogle } = useAuth();

	const [loginUser,loginResult] = useLoginUserMutation();
	const navigate = useNavigate();

	const showToast = useToast();

	const submitFN = async (data) => {
		if (!data) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		try {
			const loginData = await loginUser({ provider: "mail", ...data }).unwrap();
			if (loginData.success) {
				showToast(loginData && loginData?.message, "success");
				navigate("/");
				return;
			}
			if (loginData.success) {
				throw new Error(loginData.message);
			}
		} catch (error) {
			console.error(error);
			showToast(
				`Google sign-in failed: ${
					error?.data?.message || error?.data || error?.message
				}`,
				"error"
			);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithGoogle);
			if (userData) {
				const loginData = await loginUser({
					provider: "google",
					...userData,
				}).unwrap();
				if (loginData.success) {
					showToast(loginData && loginData?.message, "success");
					navigate("/");
					return;
				}
				if (loginData.success) {
					throw new Error(loginData.message);
				}
			} else {
				throw new Error("No user data extracted!");
			}
		} catch (error) {
			console.error("Error details:", error);
			showToast(
				`Google sign-in failed: ${
					error?.data?.message || error?.data || error?.message
				}`,
				"error"
			);
		}
	};

	const handleFacebookSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithFaceBook);

			if (userData) {
				const loginData = await loginUser({
					provider: "facebook",
					...userData,
				}).unwrap();
				if (loginData.success) {
					showToast(loginData && loginData?.message, "success");
					navigate("/");
					return;
				}
				if (loginData.success) {
					throw new Error(loginData.message);
				}
			} else {
				throw new Error("No user data extracted!");
			}
		} catch (error) {
			console.error("Error details:", error);

			showToast(
				`FaceBook sign-in failed: ${
					error?.data?.message || error?.data || error?.message
				}`,
				"error"
			);
		}
	};

	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Login</h2>

			<AuthForm onSubmit={submitFN} btnText={"Login"} isLoading={loginResult.isLoading}/>

			<p className="align-baseline font-medium my-4 text-center text-sm">
				<Link to="/mail" className="text-blue-500 hover:text-blue-700">
					Forgotten Password ?
				</Link>
			</p>

			<p className="align-baseline font-medium mt-4 text-center text-sm">
				haven't an account? Please{" "}
				<Link  to="/register" className="text-blue-500 hover:text-blue-700">
					Register
				</Link>
			</p>

			{/* google sign in */}
			<div className="mt-4">
				<button
					onClick={handleGoogleSignIn}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
					<FcGoogle className="mr-2" />
					Sign in with Google
				</button>
			</div>

			{/* facebook sign in */}
			<div className="mt-4">
				<button
					onClick={handleFacebookSignIn}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
					<FaFacebook className="mr-2" />
					Sign in with FaceBook
				</button>
			</div>
		</AuthLayout>
	);
};

export default Login;
