import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
	useResendOTPMutation,
	useGetOTPQuery,
	useVerifyOTPMutation,
} from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import useApiHandler from "../../hooks/useApiHandler";
import MiniLoader from "../../components/MiniLoader";
import AuthHeader from "./AuthHeader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";

// Constants
const OTP_LENGTH = 4;
const INITIAL_TIMER = 19;

const OtpPage = () => {
	const { userId } = useParams();
	const { data, isLoading, isError, error } = useGetOTPQuery(userId);
	const navigate = useNavigate();
	const showToast = useToast();
	const [handleMutation] = useApiHandler();
	const [verifyOTP, verificationResult] = handleMutation(useVerifyOTPMutation);
	const [resendOTP, resendResult] = handleMutation(useResendOTPMutation);

	const [value, setValue] = useState(Array(OTP_LENGTH).fill(""));
	const [time, setTime] = useState(INITIAL_TIMER);

	const buttonRef = useRef(null);
	const inputs = useRef([]);

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime((prev) => (prev > 0 ? prev - 1 : prev));
			if (time === 0) clearInterval(timerId);
		}, 1000);
		return () => clearInterval(timerId);
	}, [time]);

	// Helper Methods
	const insertValue = (index, value) =>
		setValue((prev) => {
			const updatedValue = [...prev];
			updatedValue[index] = value;
			return updatedValue;
		});

	const removeValue = (index) =>
		setValue((prev) => {
			const updatedValue = [...prev];
			updatedValue[index] = "";
			return updatedValue;
		});

	// Event Handlers
	const handleKeyDown = (e, index) => {
		if (["Backspace", "Delete"].includes(e.key)) {
			if (inputs.current[index].value) removeValue(index);
			else if (index > 0) {
				inputs.current[index - 1].focus();
				removeValue(index - 1);
			}
		}
	};

	const handleInput = (e, index) => {
		if (e.target.value) {
			insertValue(index, e.target.value);
			if (index < OTP_LENGTH - 1) inputs.current[index + 1].focus();
			else buttonRef.current.focus();
		}
	};

	const handleFocus = (e) => e.target.select();

	const handlePaste = (e) => {
		e.preventDefault();
		const text = e.clipboardData.getData("text");
		if (!/^\d{4}$/.test(text)) return;
		text.split("").forEach((digit, i) => {
			if (inputs.current[i]) {
				inputs.current[i].value = digit;
				insertValue(i, digit);
			}
		});
		inputs.current[OTP_LENGTH - 1].focus();
	};

	const handleResendOTP = async () => {
		resendOTP(data.data.otpId, {
			onSuccess: (res) => {
				if (res.success) {
					showToast(res.message, "success");
					setTime(INITIAL_TIMER);
				} else throw new Error(res.message);
			},
			onError: (err) =>
				showToast(
					err.data.message || err.message || "Failed to resend OTP",
					"error"
				),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const otpCode = value.join("");
		if (otpCode.length !== OTP_LENGTH) {
			showToast("Please enter a valid OTP", "warning");
			return;
		}

		await verifyOTP(
			{
				otpId: data.data.otpId,
				otp: otpCode,
			},
			{
				onSuccess: (res) => {
					if (res.success) {
						showToast(res.message, "success");
						navigate("/login");
					} else throw new Error(res.message);
				},
				onError: (err) =>
					showToast(
						err?.data?.message || err.message || "OTP Verification failed",
						"error"
					),
			}
		);
	};

	const getBtnWithLoader = (text, isLoading) =>
		isLoading ? <MiniLoader /> : text;

	return (
		<LoadingErrorBoundary
			isLoading={isLoading}
			isError={isError}
			errorMessage={handleAndShowError(error, "Failed to check otp ")}>
			<AuthLayout>
				<div className=" text-center">
					<AuthHeader
						title="Verify Your Account"
						description="Enter the 4-digit OTP sent to your mail."
					/>
					<form id="otp-form">
						<div className="flex items-center justify-center gap-3">
							{Array.from({ length: OTP_LENGTH }).map((_, index) => (
								<input
									key={index}
									type="text"
									maxLength="1"
									ref={(el) => {
										if (el && !inputs.current.includes(el))
											inputs.current[index] = el;
									}}
									onKeyDown={(e) => handleKeyDown(e, index)}
									onInput={(e) => handleInput(e, index)}
									onFocus={handleFocus}
									onPaste={handlePaste}
									className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border ring-1 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
								/>
							))}
						</div>
						<div className="max-w-[260px] mx-auto mt-4">
							<button
								type="submit"
								ref={buttonRef}
								onClick={handleSubmit}
								className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
								{getBtnWithLoader(
									"Verify Account",
									verificationResult.isLoading
								)}
							</button>
						</div>
					</form>
					<div className="text-sm text-slate-500 mt-4">
						Didn't receive code?{" "}
						{time === 0 ? (
							<button
								disabled={
									resendResult.isLoading || verificationResult.isLoading
								}
								onClick={handleResendOTP}
								className="font-medium text-indigo-500 hover:text-indigo-600">
								{getBtnWithLoader("Resend", resendResult.isLoading)}
							</button>
						) : (
							<span className="font-bold text-indigo-500">
								{Math.floor(time / 60)}:{time % 60}s
							</span>
						)}
					</div>
				</div>
			</AuthLayout>
		</LoadingErrorBoundary>
	);
};

export default OtpPage;
