import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { useResetPasswordMutation } from "../../redux/store";
import AuthForm from "../../components/AuthForm";
import useApiHandler from "../../hooks/useApiHandler";
import PasswordResetNotification from "../../components/PasswordResetNotification";
import AuthHeader from "./AuthHeader";
import AuthRedirectMessage from "./AuthRedirectMessage";
import { useMiniToggler } from "../../hooks/useToggle";
import { extractErrorMessage } from "../../utils/errorHandlers";

const PasswordPage = () => {
	const { token } = useParams();
	const [handleMutation] = useApiHandler();
	const [isMailLinkShown, , setMailLinkShown] = useMiniToggler();

	const [resetPassword, { isLoading, isError, isSuccess }] = handleMutation(
		useResetPasswordMutation
	);
	const navigate = useNavigate();

	const handleResetPassword = async (data) => {
		await resetPassword(
			{ token, passwords: data },
			{
				onSuccess: () => "Your password has been reset successfully!",
				onError: (err) => {
					if (err.data.error.name === "TokenExpiredError") setMailLinkShown();
					return extractErrorMessage(
						err,
						"Failed to reset Your password. Please try again."
					);
				},
			}
		);
	};

	return (
		<AuthLayout>
			<PasswordResetNotification
				isReset={isSuccess}
				onBackClick={() => navigate("/login")}
				buttonText="Now Login →"
				color="green"
				notification="Your password has been reset successfully!">
				<>
					<AuthHeader
						title="Reset Your Password"
						description="Enter your new password to reset your account password."
					/>
					<AuthForm
						isResetting
						isLoading={isLoading}
						onSubmit={handleResetPassword}
						btnText={"Reset Password"}
					/>
					{isMailLinkShown && isError && (
						<AuthRedirectMessage
							message="Your reset link has expired !"
							linkText=" Verify your email address."
							linkTo="/verify-mail"
							color="orange"
						/>
					)}
					<AuthRedirectMessage message="Remember your password ? " />
				</>
			</PasswordResetNotification>
		</AuthLayout>
	);
};

export default PasswordPage;
