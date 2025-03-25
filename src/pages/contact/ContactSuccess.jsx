import React from "react";

/**
 * ContactSuccess Component
 * - Displays after successful form submission
 * - Provides confirmation and next steps
 */
const ContactSuccess = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
			<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
				<svg
					className="h-6 w-6 text-green-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			<h2 className="text-2xl font-bold text-gray-900 mb-2">
				Thank you for your message!
			</h2>

			<p className="text-gray-600 mb-6">
				We've received your inquiry and our team will get back to you within 24
				hours.
			</p>

			<div className="bg-blue-50 p-4 rounded-md text-left">
				<h3 className="text-sm font-medium text-blue-800 mb-2">
					What to expect next:
				</h3>
				<ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
					<li>Confirmation email to your inbox</li>
					<li>Personalized response from our support team</li>
					<li>Option to track your ticket if you provided an email</li>
				</ul>
			</div>

			<div className="mt-8">
				<a
					href="/"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
					Back to Home
				</a>
			</div>
		</div>
	);
};

export default ContactSuccess;
