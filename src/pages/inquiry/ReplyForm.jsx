import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * ReplyForm - Form for sending responses to inquiries
 */
const ReplyForm = ({
	email,
	defaultSubject,
	onSubmit,
	isSuccess,
	isSending,
}) => {
	const [formState, setFormState] = useState({
		subject: defaultSubject,
		message: "",
	});
	const resetForm = () => {
		setFormState((prev) => ({
			...prev,
			subject: defaultSubject,
		}));
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		onSubmit(formState.message);
	};
	return (
		<div className="w-full  animate-slide-in-right">
			<div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
				<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Send Response
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Your reply will be sent to {email}
					</p>
				</div>

				<div className="px-4 py-5 sm:p-6">
					{isSuccess ? (
						<SuccessMessage onReset={resetForm} />
					) : (
						<ReplyFormFields
							formState={formState}
							onChange={handleChange}
							onSubmit={handleSubmit}
							isSending={isSending}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

ReplyForm.propTypes = {
	email: PropTypes.string.isRequired,
	defaultSubject: PropTypes.string.isRequired,
};

export default ReplyForm;

// Sub-components for better organization
const SuccessMessage = ({ onReset }) => (
	<div className="rounded-md bg-green-50 p-4 mb-4 animate-fade-in">
		<div className="flex">
			<div className="flex-shrink-0">
				<CheckIcon />
			</div>
			<div className="ml-3">
				<p className="text-sm font-medium text-green-800">
					Your response has been sent successfully!
				</p>
			</div>
		</div>
		{/* <button
      onClick={onReset}
      className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
      Send Another Response
    </button> */}
	</div>
);

const ReplyFormFields = ({ formState, onChange, onSubmit, isSending }) => (
	<form onSubmit={onSubmit} className="space-y-6">
		<FormField
			label="Subject *"
			name="subject"
			type="text"
			value={formState.subject}
			onChange={onChange}
			required
		/>

		<FormField
			label="Your Response"
			name="message"
			type="textarea"
			value={formState.message}
			onChange={onChange}
			required
			rows={4}
		/>

		<SubmitButton isSending={isSending} />
	</form>
);

const FormField = ({ label, type = "text", ...props }) => (
	<div className="mb-4">
		<label
			htmlFor={props.name}
			className="block text-sm font-medium text-gray-700 mb-1">
			{label}
		</label>
		<div className="mt-1">
			{type === "textarea" ? (
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
					{...props}
				/>
			) : (
				<input
					className="w-full px-3 py-2 border border-gray-300 rounded-md"
					type={type}
					{...props}
				/>
			)}
		</div>
	</div>
);

const SubmitButton = ({ isSending }) => (
	<div className="flex items-center justify-end">
		<button
			type="submit"
			disabled={isSending}
			className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
				isSending ? "opacity-75 cursor-not-allowed" : ""
			}`}>
			{isSending ? (
				<>
					<Spinner />
					Sending...
				</>
			) : (
				"Send Response"
			)}
		</button>
	</div>
);

const CheckIcon = () => (
	<svg
		className="h-5 w-5 text-green-400"
		viewBox="0 0 20 20"
		fill="currentColor">
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			clipRule="evenodd"
		/>
	</svg>
);

const Spinner = () => (
	<svg
		className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24">
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
	</svg>
);
