import AuthForm from "../../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/store";
import Swal from "sweetalert2";

const Register = () => {
	const [registerUser] = useRegisterUserMutation();
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
			await registerUser(data).unwrap();
			showMessage();
			navigate("/");

		} catch (error) {
			console.error(error);
			alert("Failed to sign up. Please try again.");
		}
	};

	return (
    <div className="h-[calc(100vh-120px)]  flex justify-center items-center ">
    <div className="w-full max-w-md mx-auto bg-white  shadow-2xl shadow-black rounded-lg px-8 pt-6 pb-8 mb-4">
   
      <h2 className="text-xl font-semibold mb-4 text-center"> Register</h2>

				{/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        {message && (
          <p className="text-red-500 text-xs italic mb-3">{message}</p>
        )}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
            Register
          </button>
        </div>
      </form> */}

				<AuthForm onSubmit={submitFN} btnText={"Register"} />

				<p className="align-baseline font-medium mt-4 text-sm">
					Have an account? Please {' '}
					<Link to="/login" className="text-blue-500 hover:text-blue-700">
						Login
					</Link>
				</p>

				<p className="mt-5 text-center text-gray-500 text-xs">
					©2025 Book Store. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Register;
