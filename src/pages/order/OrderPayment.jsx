import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/generals";

/**
 * Displays payment details for an order
 * @param {Object} props - Component props
 * @param {Object} props.paymentDetails - Payment information
 * @param {string} props.paymentDetails.status - Payment status
 * @param {string} props.paymentDetails.transactionId - Transaction identifier
 * @param {Object} props.paymentDetails.amount - Payment amount details
 */
const OrderPayment = ({ paymentDetails = {} }) => {
	if (!paymentDetails) {
		return (
			<p className="text-gray-600 text-center py-4">
				Payment details not available.
			</p>
		);
	}

	const { status, transactionId, amount } = paymentDetails;
	return (
		<div className="space-y-3 text-sm text-gray-600">
			<h3 className="font-medium text-gray-800">PayPal Transaction</h3>

			<dl className="grid grid-cols-2 gap-2">
				<dt className="col-span-1 font-medium">Transaction ID:</dt>
				<dd className="col-span-1 font-mono truncate">
					{transactionId || "N/A"}
				</dd>

				<dt className="col-span-1 font-medium">Amount:</dt>
				<dd className="col-span-1">
					{amount &&
						formatCurrency(Number(amount?.value), amount?.currencyCode)}
				</dd>

				<dt className="col-span-1 font-medium">Status:</dt>
				<dd className="col-span-1">
					<span className={`capitalize `}>{status?.toLowerCase()}</span>
				</dd>
			</dl>
		</div>
	);
};

OrderPayment.propTypes = {
	paymentDetails: PropTypes.shape({
		status: PropTypes.string,
		transactionId: PropTypes.string,
		amount: PropTypes.shape({
			currencyCode: PropTypes.string,
			value: PropTypes.string,
		}),
	}),
};

export default React.memo(OrderPayment);
