import React from "react";
import PropTypes from "prop-types";

/**
 * Order Payment Component: Displays the payment details for an order.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.payment - The payment object containing details like status, transaction ID, and amount.
 */
const OrderPayment = ({ payment }) => {
	return (
		<div className="w-full h-full bg-white shadow-md rounded-lg p-4">
			<h2 className="text-2xl font-bold mb-4">Payment Details</h2>
			{payment ? (
				<>
					{" "}
					<p className="text-gray-600">Payment Status: {payment.status}</p>
					<p className="text-gray-600">
						Transaction ID: {payment.transactionId}
					</p>
					{/* Uncomment if needed: <p className="text-gray-600">Amount: ${payment.amount.value} {payment.amount.currencyCode}</p> */}
				</>
			) : (
				<p className="text-gray-600 text-center py-4">
					Payment details not available.
				</p>
			)}
		</div>
	);
};

OrderPayment.propTypes = {
	payment: PropTypes.object.isRequired,
};

export default OrderPayment;
