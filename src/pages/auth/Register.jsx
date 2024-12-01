import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import AuthLayout from "../../components/AuthLayout";
import useToast from "../../hooks/useToast";

const Register = () => {
	const [registerUser, registerResult] = useRegisterUserMutation();
	const navigate = useNavigate();
	const showToast = useToast();

	const submitFN = async (data) => {
		if (!data) {
			showToast("Please enter the credentials", "warning");
			return;
		}
		try {
			const { success, message, userId } = await registerUser(data).unwrap();
			console.log(
				"🚀 ~ submitFN ~ success, message, userId:",
				success,
				message,
				userId
			);

			if (!success) throw new Error(message);

			showToast(message, "success");
			navigate(`/otp/${userId}`);
		} catch (error) {
			console.error(error);
			showToast(error?.data?.message || error?.data || error?.message, "error");
		}
	};

	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Register</h2>

			<AuthForm
				onSubmit={submitFN}
				btnText={"Register"}
				isLoading={registerResult.isLoading}
			/>

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
