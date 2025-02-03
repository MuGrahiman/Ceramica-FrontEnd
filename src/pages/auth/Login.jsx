import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { addUser, useLoginUserMutation } from "../../redux/store";
import useExtract from "../../hooks/useExtract";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";

const Login  = () => {
	// ** Hooks and State **
	const { signInWithFaceBook, signInWithGoogle } = useAuth();
	const [loginUser, loginResult] = useLoginUserMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showToast = useToast();
	const execute = useExtract();

	// ** Email Login Handler **
	const submitFN = async (data) => {
		if (!data) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		try {
			const loginData = await loginUser({ provider: "mail", ...data }).unwrap();
			if (loginData.success) {
				dispatch(addUser(loginData?.user));
				showToast(loginData?.message, "success");
				navigate("/");
			} else {
				throw new Error(loginData.message);
			}
		} catch (error) {
			console.error(error);
			showToast(
				`User sign-in failed: ${
					error?.data?.message || error?.data || error?.message
				}`,
				"error"
			);
		}
	};

	// ** Google Login Handler **
	const handleGoogleSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithGoogle);
			if (!userData) throw new Error("No user data extracted!");

			const loginData = await loginUser({
				provider: "google",
				...userData,
			}).unwrap();

			if (loginData.success) {
				dispatch(addUser(loginData?.user));
				showToast(loginData?.message, "success");
				navigate("/");
			} else {
				throw new Error(loginData.message);
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

	// ** Facebook Login Handler **
	const handleFacebookSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithFaceBook);
			if (!userData) throw new Error("No user data extracted!");

			const loginData = await loginUser({
				provider: "facebook",
				...userData,
			}).unwrap();
			if (loginData.success) {
				dispatch(addUser(loginData?.user));
				showToast(loginData?.message, "success");
				navigate("/");
			} else {
				throw new Error(loginData.message);
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

	// ** Component Render **
	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Login</h2>

			<AuthForm
				onSubmit={submitFN}
				btnText={"Login"}
				isLoading={loginResult.isLoading}
			/>

			<p className="align-baseline font-medium my-4 text-center text-sm">
				<Link to="/mail" className="text-blue-500 hover:text-blue-700">
					Forgotten Password ?
				</Link>
			</p>

			<p className="align-baseline font-medium mt-4 text-center text-sm">
				haven't an account? Please{" "}
				<Link to="/register" className="text-blue-500 hover:text-blue-700">
					Register
				</Link>
			</p>

			{/* Google Sign-In */}
			<div className="mt-4">
				<button
					onClick={handleGoogleSignIn}
					className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
					<FcGoogle className="mr-2" />
					Sign in with Google
				</button>
			</div>

			{/* Facebook Sign-In */}
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

export default Login ;
