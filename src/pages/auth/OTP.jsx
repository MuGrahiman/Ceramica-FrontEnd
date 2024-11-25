import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../components/AuthLayout";

const OTP = () => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(59);

	const inputs = useRef([]);
	const buttonRef = useRef(null);
	const length = 4;

	useEffect(() => {
		const timerId = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds === 0) {
					if (minutes === 0) {
						clearInterval(timerId);
						return 0;
					}
					setMinutes((prevMinutes) => prevMinutes - 1);
					return 59;
				}
				return prevSeconds - 1;
			});
		}, 1000);

		return () => clearInterval(timerId);
	}, [minutes]);

	useEffect(() => {
		const currentInputs = inputs.current;
		const handleKeyDown = (e) => {
			const index = currentInputs.indexOf(e.target);
			if (
				!/^[0-9]{1}$/.test(e.key) &&
				e.key !== "Backspace" &&
				e.key !== "Delete" &&
				e.key !== "Tab" &&
				!e.metaKey
			) {
				e.preventDefault();
			}

			if (e.key === "Delete" || e.key === "Backspace") {
				if (index > 0) {
					if (currentInputs[index].value) {
						currentInputs[index].focus();
					} else {
						currentInputs[index - 1].focus();
					}
				}
			}
		};

		const handleInput = (e) => {
			const index = currentInputs.indexOf(e.target);
			if (e.target.value) {
				if (index < length - 1) {
					currentInputs[index + 1].focus();
				} else {
					buttonRef.current.focus();
				}
			}
		};

		const handleFocus = (e) => {
			e.target.select();
		};

		const handlePaste = (e) => {
			e.preventDefault();
			const text = e.clipboardData.getData("text");
			if (!new RegExp(`^[0-9]{${length}}$`).test(text)) {
				return;
			}
			const digits = text.split("");
			digits.forEach((digit, index) => {
				if (currentInputs[index]) {
					currentInputs[index].value = digit;
				}
			});
			currentInputs[length - 1].focus();
		};

		currentInputs.forEach((input) => {
			input.addEventListener("keydown", handleKeyDown);
			input.addEventListener("input", handleInput);
			input.addEventListener("focus", handleFocus);
			input.addEventListener("paste", handlePaste);
		});

		return () => {
			if (currentInputs[0]) {
				currentInputs.forEach((input) => {
					input.removeEventListener("keydown", handleKeyDown);
					input.removeEventListener("input", handleInput);
					input.removeEventListener("focus", handleFocus);
					input.removeEventListener("paste", handlePaste);
				});
			}
		};
	}, []);

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
						{Array.from({ length }).map((_, index) => (
							<input
								key={index}
								type="text"
								pattern="\d*"
								maxLength="1"
								ref={(el) => (inputs.current[index] = el)}
								className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border ring-1 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
							/>
						))}
					</div>
					<div className="max-w-[260px] mx-auto mt-4">
						<button
							type="submit"
							ref={buttonRef}
							className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
							Verify Account
						</button>
					</div>
				</form>
				<div className="text-sm text-slate-500 mt-4">
					Didn't receive code?{" "}
					{minutes === 0 && seconds === 0 ? (
						<a
							className="font-medium text-indigo-500 hover:text-indigo-600"
							href="#0">
							Resend
						</a>
					) : (
						<small className="font-bold text-indigo-500">
							{minutes} : {seconds} s
						</small>
					)}
				</div>
			</div>
		</AuthLayout>
	);
};

export default OTP;
