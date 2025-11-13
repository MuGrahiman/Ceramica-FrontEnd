import AuthForm from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import AuthLayout from "../../components/AuthLayout";
import useApiHandler from "../../hooks/useApiHandler";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../utils/errorHandlers";

const RegisterPage = () => {
	const { isAuthorized } = useAuth("client");
	const [handleMutation] = useApiHandler();
	const [registerUser, { isLoading }] = handleMutation(useRegisterUserMutation);
	const navigate = useNavigate();
	const {
		success: successToast,
		warn: warningToast,
	} = toast;

	const submitFN = async (formData) => {
		if (!formData) {
			warningToast("Please enter the credentials");
			return;
		}
		await registerUser(formData, {
			onSuccess: (res) => {
				if (res.success) {
					successToast(res.message);
					navigate(`/otp/${res.data._id}`);
				}
			},
			onError: (err) => extractErrorMessage(err, "Registration failed"),
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
