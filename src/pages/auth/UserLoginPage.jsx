import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../components/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";
import { USER_ROLES } from "../../constants/app";
import SocialSignInButton from "./SocialSignInButton";
import { useAuthActions } from "../../hooks/useAuthActions";

/**
 * UserLoginPage - Handles user authentication including email, Google, and Facebook login
 */
const UserLoginPage = () => {
	const navigate = useNavigate();
	const { isAuthorized } = useAuth(USER_ROLES.CLIENT);
	const { loginWithEmail, loginWithFaceBook, loginWithGoogle, loginLoading } =
		useAuthActions();

	/**
	 * Redirect to home if user is already authenticated
	 */
	useEffect(() => {
		if (isAuthorized) {
			navigate("/");
		}
	}, [isAuthorized, navigate]);

	return (
		<AuthLayout>
			<AuthHeader
				title="Login"
				description="Please enter your credentials to access your account."
			/>
			<AuthForm
				isLogging={true}
				onSubmit={loginWithEmail}
				btnText={"Login"}
				isLoading={loginLoading}
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
					onSocialSignIn={loginWithGoogle}
					socialIcon={FcGoogle}
					socialButtonLabel="Sign in with Google"
					isSigningIn={loginLoading}
				/>
				<SocialSignInButton
					onSocialSignIn={loginWithFaceBook}
					socialIcon={FaFacebook}
					socialButtonLabel="Sign in with Facebook"
					isSigningIn={loginLoading}
				/>
			</div>
		</AuthLayout>
	);
};

export default UserLoginPage;
