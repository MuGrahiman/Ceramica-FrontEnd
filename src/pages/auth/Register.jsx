import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import Swal from "sweetalert2";
import AuthLayout from "../../components/AuthLayout";

const Register = () => {
	const [registerUser] = useRegisterUserMutation();
	const navigate = useNavigate();

	const showMessage = (message) =>
		Swal.fire({
			title: message,
			icon: "success",
			timer: 3000,
			timerProgressBar: true,
		});

	const submitFN = async (data) => {
		try {
			const { success, message, userId } = await registerUser(data).unwrap();
			console.log(
				"🚀 ~ submitFN ~ success, message, userId:",
				success,
				message,
				userId
			);

			if (!success) throw new Error(message);

			showMessage(message);
			navigate(`/otp/${userId}`);
		} catch (error) {
			console.error(error);
			alert(
				"Failed to sign up. Please try again. " +
					(error?.data?.message || error?.data || error)
			);
		}
	};

	return (
		<AuthLayout>
			<h2 className="text-xl font-semibold mb-4 text-center"> Register</h2>

			<AuthForm onSubmit={submitFN} btnText={"Register"} />

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
