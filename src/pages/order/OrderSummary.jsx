import React from "react";
import PropTypes from "prop-types";
import { formatToLocaleDateString } from "../../utils/date";

/**
 * Order Summary Component: Displays the summary details for an order.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.summary - The summary object containing details like order ID, status, total amount, and order date.
 */
const OrderSummary = ({ summary = {} }) => {
	if (!summary) {
		return (
			<p className="text-gray-600 text-center py-4">
				Order summary not available.
			</p>
		);
	}

	return (
		<React.Fragment>
			<p className="text-gray-600">Order ID: {summary?._id}</p>
			<p className="text-gray-600">Status: {summary?.status}</p>
			<p className="text-gray-600">Total Amount: ${summary?.totalAmount}</p>
			<p className="text-gray-600">
				Order Date:
				{formatToLocaleDateString(summary?.createdAt)}
			</p>
		</React.Fragment>
	);
};

OrderSummary.propTypes = {
	summary: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		totalAmount: PropTypes.number.isRequired,
		createdAt: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
	}).isRequired,
};

export default React.memo(OrderSummary);
