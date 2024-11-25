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

const Login = () => {
	const execute = useExtract();
	const { signInWithFaceBook, signInWithGoogle } = useAuth();

	const [loginUser] = useLoginUserMutation();
	const navigate = useNavigate();

	const showMessage = () =>
		Swal.fire({
			title: "Logged in successfully!",
			icon: "success",
			timer: 3000,
			timerProgressBar: true,
		});

	const submitFN = async (data) => {
		try {
			await loginUser({ provider: "mail", ...data }).unwrap();
			showMessage();
			navigate("/");
		} catch (error) {
			console.error(error);
			alert("Failed to Login. Please try again.");
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithGoogle);
			if (userData) {
				await loginUser({ provider: "google", ...userData }).unwrap();
				showMessage();
				navigate("/");
			} else {
				throw new Error("No user data extracted!");
			}
		} catch (error) {
			console.error("Error details:", error);
			alert(`Google sign-in failed: ${error.message}`);
		}
	};

	const handleFacebookSignIn = async () => {
		try {
			const userData = await execute.extractData(signInWithFaceBook);

			if (userData) {
				await loginUser({ provider: "facebook", ...userData }).unwrap();
				showMessage();
				navigate("/");
			} else {
				throw new Error("No user data extracted!");
			}
		} catch (error) {
			console.error("Error details:", error);
			alert(`FaceBook sign-in failed: ${error.message}`);
		}
	};

	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Login</h2>

			<AuthForm onSubmit={submitFN} btnText={"Login"} />

			<p className="align-baseline font-medium mt-4 text-sm">
				<Link to="/otp" className="text-blue-500 hover:text-blue-700">
					Forgotten Password ?
				</Link>
			</p>

			<p className="align-baseline font-medium mt-4 text-sm">
				haven't an account? Please{" "}
				<Link to="/register" className="text-blue-500 hover:text-blue-700">
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
