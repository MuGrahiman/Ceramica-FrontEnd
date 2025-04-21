import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import AuthLayout from "../../components/AuthLayout";
import useToast from "../../hooks/useToast";
import useApiHandler from "../../hooks/useApiHandler";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";

const RegisterPage = () => {
	const { isAuthorized } = useAuth("client");
	const [handleMutation] = useApiHandler();
	const [registerUser, { isLoading }] = handleMutation(useRegisterUserMutation);
	const navigate = useNavigate();
	const showToast = useToast();

	const submitFN = async (formData) => {
		if (!formData) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		await registerUser(formData, {
			onSuccess: (res) => {
				if (res.success) {
					showToast(res.message, "success");
					navigate(`/otp/${res.data._id}`);
				}
			},
			onError: (err) =>
				showToast(
					err?.data?.message || err.message || "Registration failed",
					"error"
				),
		});
	};

	useEffect(() => {
		if (isAuthorized) {
			navigate("/");
		}
	}, [isAuthorized, navigate]); 

	return (
		<AuthLayout>
			<AuthHeader
				title="Create Your Account"
				description="Fill in the details below to register for a new account."
			/>
			<AuthForm
				isRegistering
				onSubmit={submitFN}
				btnText="Register"
				isLoading={isLoading}
			/>
			<AuthRedirectMessage message="Have an account? Please " />
		</AuthLayout>
	);
};

export default RegisterPage;
