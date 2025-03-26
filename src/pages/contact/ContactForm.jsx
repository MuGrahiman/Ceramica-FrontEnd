import React, { useState } from "react";
import PropTypes from "prop-types";
import MiniLoader from "../../components/MiniLoader";
/**
 * ContactForm Component
 * - Handles form state and validation
 * - Manages submission to backend
 */
const ContactForm = ({ onFormSubmit, isLoading = false }) => {
	// Form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		orderId: "",
		subject: "general",
		message: "",
	});

	// Validation errors
	const [errors, setErrors] = useState({});

	// Form subjects
	const SUBJECT_OPTIONS = [
		{ value: "feedback", label: "Feed Back" },
		{ value: "general", label: "General Inquiry" },
		{ value: "order", label: "Order Support" },
		{ value: "returns", label: "Returns & Refunds" },
		{ value: "wholesale", label: "Wholesale Inquiry" },
	];

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when field is edited
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Validate form fields
	const validateForm = () => {
		const newErrors = {};
		const messageLength = formData.message.trim().length;

		// Validate name
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (formData.name.trim().length < 2) {
			newErrors.name = "Name must be at least 2 characters long";
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		// Validate order ID if subject is 'order'
		if (formData.subject === "order" && !formData.orderId.trim()) {
			newErrors.orderId = "Order ID is required for order support";
		}

		// Validate message
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (messageLength < 200) {
			newErrors.message = "Message must be at least 200 characters long.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			onFormSubmit(formData);
		}
	};

	return isLoading ? (
		<div className="min-h-full min-w-full flex justify-center items-center">
			<MiniLoader />
		</div>
	) : (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Send us a message
			</h2>

			{errors.submit && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
					{errors.submit}
				</div>
			)}

			<form onSubmit={handleSubmit} noValidate>
				{/* Name Field */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1">
						Full Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md ${
							errors.name ? "border-red-500" : "border-gray-300"
						}`}
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? "name-error" : undefined}
					/>
					{errors.name && (
						<p id="name-error" className="mt-1 text-sm text-red-600">
							{errors.name}
						</p>
					)}
				</div>

				{/* Email Field */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-1">
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md ${
							errors.email ? "border-red-500" : "border-gray-300"
						}`}
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>
					{errors.email && (
						<p id="email-error" className="mt-1 text-sm text-red-600">
							{errors.email}
						</p>
					)}
				</div>

				{/* Subject Field */}
				<div className="mb-4">
					<label
						htmlFor="subject"
						className="block text-sm font-medium text-gray-700 mb-1">
						Subject *
					</label>
					<select
						id="subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md">
						{SUBJECT_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* Order ID Field (conditionally shown) */}
				{formData.subject === "order" && (
					<div className="mb-4">
						<label
							htmlFor="orderId"
							className="block text-sm font-medium text-gray-700 mb-1">
							Order ID *
						</label>
						<input
							type="text"
							id="orderId"
							name="orderId"
							value={formData.orderId}
							onChange={handleChange}
							className={`w-full px-3 py-2 border rounded-md ${
								errors.orderId ? "border-red-500" : "border-gray-300"
							}`}
							aria-invalid={!!errors.orderId}
							aria-describedby={errors.orderId ? "orderId-error" : undefined}
						/>
						{errors.orderId && (
							<p id="orderId-error" className="mt-1 text-sm text-red-600">
								{errors.orderId}
							</p>
						)}
					</div>
				)}

				{/* Message Field */}
				<div className="mb-4">
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700 mb-1">
						Message *
					</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						value={formData.message}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md ${
							errors.message ? "border-red-500" : "border-gray-300"
						}`}
						aria-invalid={!!errors.message}
						aria-describedby={errors.message ? "message-error" : undefined}
					/>
					{errors.message && (
						<p id="message-error" className="mt-1 text-sm text-red-600">
							{errors.message}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
					Send Message
				</button>
			</form>
		</div>
	);
};
ContactForm.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
export default ContactForm;
