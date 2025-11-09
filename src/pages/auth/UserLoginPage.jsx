import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContextAuth } from "../../context/AuthContext";
import { useLoginUserMutation, useUserSlice } from "../../redux/store";
import useToast from "../../hooks/useToast";
import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";
import useApiHandler from "../../hooks/useApiHandler";
import { useAuth } from "../../hooks/useAuth";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";
import { USER_ROLES } from "../../constants/app";
import { handleAndShowError } from "../../utils/errorHandlers";
import { useMiniToggler } from "../../hooks/useToggle";
import SocialSignInButton from "./SocialSignInButton";

const UserLoginPage = () => {
	const { isAuthorized } = useAuth(USER_ROLES.CLIENT);
	const { signInWithFaceBook, signInWithGoogle } = useContextAuth();
	const [handleLoginMutation, handleApiCall] = useApiHandler();
	const [loginUser, { isLoading }] = handleLoginMutation(useLoginUserMutation);
	const [socialLoading, , startSocialLoading, closeSocialLoading] =
		useMiniToggler(false);
	const navigate = useNavigate();
	const showToast = useToast();
	const { addUser } = useUserSlice();
	// Redirect if already logged in
	useEffect(() => {
		if (isAuthorized) {
			navigate("/");
		}
	}, [isAuthorized]);
	
	const handleLoginSuccess = (res) => {
		if (res.success) addUser(res.data);

		return res.message;
	};
	const handleLoginError = (err) =>
		handleAndShowError(err, "User sign-in failed");

	// Handle form submission
	const handleLogin = async (formData, provider) => {
		if (!provider) return console.error("Provider is not provided");

		if (!formData) return showToast("Please enter the credentials", "warning");

		await loginUser(
			{
				provider,
				...formData,
			},
			{
				onSuccess: handleLoginSuccess,
				redirectPath: "/",
				onError: handleLoginError,
			}
		);
	};

	// Handle social sign-ins (facebook / google)
	const handleSocialSignIn = async (signInFunction, provider) => {
		startSocialLoading();
		await handleApiCall(signInFunction, null, {
			onSuccess: async (res) => {
				const email =
					res?.user?.email ||
					res?.user?.providerData?.[0]?.email;
				const uid = res?.user?.uid;

				await handleLogin({ email, uid }, provider);
			},
			onError: handleLoginError,
			onFinally: closeSocialLoading,
		});
	};

	return (
		<AuthLayout>
			<AuthHeader
				title="Login"
				description="Please enter your credentials to access your account."
			/>
			<AuthForm
				isLogging
				onSubmit={(data) => handleLogin(data, "local")}
				btnText={"Login"}
				isLoading={isLoading || socialLoading}
			/>
			<AuthRedirectMessage
				linkText="Forgotten Password?"
				linkTo="/verify-mail"
			/>
			<AuthRedirectMessage
				message="Haven't an account? Please "
				linkText="Register"
				linkTo="/register"
			/>

			<div className="mt-4">
				<SocialSignInButton
					onSocialSignIn={handleSocialSignIn}
					socialSignInMethod={signInWithGoogle}
					socialPlatform="google"
					socialIcon={FcGoogle}
					socialButtonLabel="Sign in with Google"
					isSigningIn={isLoading || socialLoading}
				/>
				<SocialSignInButton
					onSocialSignIn={handleSocialSignIn}
					socialSignInMethod={signInWithFaceBook}
					socialPlatform="facebook"
					socialIcon={FaFacebook}
					socialButtonLabel="Sign in with Facebook"
					isSigningIn={isLoading || socialLoading}
				/>
			</div>
		</AuthLayout>
	);
};

export default UserLoginPage;
