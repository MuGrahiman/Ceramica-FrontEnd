import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
	useResendOTPMutation,
	useSendOTPQuery,
	useVerifyOTPMutation,
} from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import useToast from "../../hooks/useToast";

// Constants
const OTP_LENGTH = 4;
const INITIAL_TIMER = 19;

const OTP = () => {
	// Hooks
	const { userId } = useParams();
	const { data, error, isLoading } = useSendOTPQuery(userId);
	const [verifyOTP, result] = useVerifyOTPMutation();
	const [resendOTP, resendResult] = useResendOTPMutation();
	const navigate = useNavigate();
	const showToast = useToast();

	// States
	const [value, setValue] = useState(Array(OTP_LENGTH).fill(""));
	const [time, setTime] = useState(INITIAL_TIMER);

	// Refs
	const buttonRef = useRef(null);
	const inputs = useRef([]);

	// Effects
	useEffect(() => {
		if (data) {
			const toastType = data.success ? "success" : "error";
			showToast(data.message, toastType);
		}
	}, [data]);

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
		try {
			const response = await resendOTP(data.otpId).unwrap();
			const toastType = response.success ? "success" : "error";
			showToast(response.message, toastType);
			if (response.success) setTime(INITIAL_TIMER);
		} catch (error) {
			console.error("Resend otp error:", error)
			showToast("Failed to resend OTP", "error");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const otpCode = value.join("");
		if (otpCode.length !== OTP_LENGTH) {
			showToast("Please enter a valid OTP", "warning");
			return;
		}

		try {
			const verified = await verifyOTP({ otpId: data.otpId, otp: otpCode }).unwrap();
			if (verified.success) {
				showToast(verified.message, "success");
				navigate("/login");
			} else throw new Error(verified.message);
		} catch (err) {
			showToast(err?.data?.message || "Verification failed", "error");
		}
	};

	if (isLoading) return <Loading />;

	return (
		<AuthLayout>
			<div className=" text-center">
				<header className="mb-8">
					<h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
					<p className="text-[15px] text-slate-500">
						Enter the 4-digit verification code.
					</p>
				</header>
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
							Verify Account
						</button>
					</div>
				</form>
				<div className="text-sm text-slate-500 mt-4">
					Didn't receive code?{" "}
					{time === 0 ? (
						<button
							disabled={resendResult.isLoading}
							onClick={handleResendOTP}
							className="font-medium text-indigo-500 hover:text-indigo-600">
							Resend
						</button>
					) : (
						<span className="font-bold text-indigo-500">
							{Math.floor(time / 60)}:{time % 60}s
						</span>
					)}
				</div>
			</div>
		</AuthLayout>
	);
};

export default OTP;
