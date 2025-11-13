import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useForgotPasswordMutation } from "../../redux/store";
import AuthForm from "../../components/AuthForm";
import useApiHandler from "../../hooks/useApiHandler";
import PasswordResetNotification from "../../components/PasswordResetNotification";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";
import { extractErrorMessage } from "../../utils/errorHandlers";

const MailPage = () => {
	const [handleMutation] = useApiHandler();

	const [verifyEmail, { isLoading, isSuccess }] = handleMutation(
		useForgotPasswordMutation
	);
	const navigate = useNavigate();

	const handleForgotPassword = async (data) => {
		await verifyEmail(
			{ email: data.email },
			{
				onSuccess: () => "Email verified successfully ",
				onError: (err) =>
					extractErrorMessage(
						err,
						"Failed to Email verification. Please try again."
					),
			}
		);
	};

	return (
		<AuthLayout>
			<PasswordResetNotification
				isReset={isSuccess}
				onBackClick={() => navigate("/login")}>
				<>
					<AuthHeader
						title="Verify Your Email Address"
						description="Enter your email address for verification and sent the reset link."
					/>
					<AuthForm
						isMailing
						isLoading={isLoading}
						onSubmit={handleForgotPassword}
						btnText={"Submit"}
					/>
					<AuthRedirectMessage message="Remember your password ? " />
				</>
			</PasswordResetNotification>
		</AuthLayout>
	);
};

export default MailPage;
