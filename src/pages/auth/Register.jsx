import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import AuthLayout from "../../components/AuthLayout";
import useToast from "../../hooks/useToast";

const Register = () => {
	// Hooks and State Management
	const [registerUser, registerResult] = useRegisterUserMutation();
	const navigate = useNavigate();
	const showToast = useToast();

	// Submission Handler
	const submitFN = async (data) => {
		if (!data) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		try {
			// API call to register the user
			const { success, message, userId } = await registerUser(data).unwrap();
			if (!success) throw new Error(message);

			// Success handling
			showToast(message, "success");
			navigate(`/otp/${userId}`);
		} catch (error) {
			// Error handling
			console.error(error);
			showToast(error?.data?.message || error?.data || error?.message, "error");
		}
	};

	// Render Component
	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Register </h2>

			{/* Registration Form */}
			<AuthForm
				onSubmit={submitFN}
				btnText="Register"
				isLoading={registerResult.isLoading}
			/>

			{/* Link to Login */}
			<p className="align-baseline font-medium mt-4 text-sm">
				Have an account? Please{" "}
				<Link to="/login" className="text-blue-500 hover:text-blue-700">
					Login
				</Link>
			</p>
		</AuthLayout>
	);
};

export default Register;
