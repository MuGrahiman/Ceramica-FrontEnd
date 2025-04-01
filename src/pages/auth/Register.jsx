import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import AuthLayout from "../../components/AuthLayout";
import useToast from "../../hooks/useToast";
import useApiHandler from "../../hooks/useApiHandler";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const Register = () => {
	// Hooks and State Management
	const { isAuthorized } = useAuth("client");
	const [handleMutation] = useApiHandler();
	const [registerUser, { isLoading }] = handleMutation(useRegisterUserMutation);
	const navigate = useNavigate();
	const showToast = useToast();

	// Submission Handler
	const submitFN = async (formData) => {
		if (!formData) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		// API call to register the user
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

	// Redirect if already logged in
    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized, navigate]); // Adding dependencies for useEffect


	// Render Component
	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Register </h2>

			{/* Registration Form */}
			<AuthForm
				isRegistering
				onSubmit={submitFN}
				btnText="Register"
				isLoading={isLoading}
			/>

			{/* Link to Login */}
			<p className="align-baseline font-medium mt-4 text-center text-sm">
				Have an account? Please{" "}
				<Link to="/login" className="text-blue-500 hover:text-blue-700">
					Login
				</Link>
			</p>
		</AuthLayout>
	);
};

export default Register;
