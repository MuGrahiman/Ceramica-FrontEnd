import React from "react";
import PropTypes from "prop-types";

/**
 * StatusBadge - Visual indicator for inquiry status
 */
const getStatusBadge = ( status ) =>
	status === "pending" ? (
		<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-bold bg-yellow-100 text-yellow-800">
		{status}
		</span>
	) : (
		<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-bold bg-green-100 text-green-800">
			{status}
		</span>
	);

/**
 * InquiryHeader - Displays page title and status badge
 */
const InquiryHeader = ({ title, status }) => (
	<div className="mb-8 text-center animate-fade-in">
		<h1 className="text-3xl font-bold text-gray-900">{title}</h1>
		<p className="mt-2 text-sm text-gray-600">{getStatusBadge(status)}</p>
	</div>
);

InquiryHeader.propTypes = {
	title: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
};

export default InquiryHeader;
