import React from "react";
import PropTypes from "prop-types";

/**
 * Order Summary Component: Displays the summary details for an order.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.summary - The summary object containing details like order ID, status, total amount, and order date.
 */
const OrderSummary = ({ summary }) => {
	return (
		<div className="w-full h-full bg-white shadow-md rounded-lg p-4">
			<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
			{summary ? (
				<>
					{" "}
					<p className="text-gray-600">Order ID: {summary._id}</p>
					<p className="text-gray-600">Status: {summary.status}</p>
					<p className="text-gray-600">Total Amount: ${summary.totalAmount}</p>
					<p className="text-gray-600">
						Order Date: {new Date(summary.createdAt).toLocaleString()}
					</p>
				</>
			) : (
				<p className="text-gray-600 text-center py-4">
					Order summary not available.
				</p>
			)}
		</div>
	);
};

OrderSummary.propTypes = {
	summary: PropTypes.object.isRequired,
};

export default OrderSummary;
