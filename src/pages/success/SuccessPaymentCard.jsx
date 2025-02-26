import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";

const SuccessPaymentCard = ({
	totalAmount,
	transactionId,
	userName,
	additionalMessage,
	paymentMail,
	createTime,
}) => {
	const navigate = useNavigate();

	function maskEmail(email) {
		if (!email) return;
		// Split the email into local part and domain
		const [localPart, domain] = email.split("@");

		// Mask the local part (keeping the first character and last character)
		const maskedLocalPart =
			localPart.length > 2
				? localPart[0] +
				  "*".repeat(localPart.length - 2) +
				  localPart[localPart.length - 1]
				: localPart[0] + "*".repeat(localPart.length - 1);

		// Return the masked email
		return `${maskedLocalPart}@${domain}`;
	}

	const paymentDetails = [
		{ label: "Total Amount", value: `$ ${totalAmount}` },
		{ label: "Payment Mail", value: maskEmail(paymentMail) },
		{ label: "Transaction ID", value: transactionId },
		{ label: "Created At", value: createTime },
	];
	const renderItems = ({ label, value }) => (
		<div className="flex justify-between gap-3 p-3 bg-gray-50 rounded-lg text-nowrap">
			<span className="font-semibold">{label}:</span>
			<span className="text-gray-700 truncate">{value}</span>
		</div>
	);
	return (
		<div className="mt-6 flex items-center justify-center">
			<div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-500 animate-fade-in-up">
				{/* Circular Icon with FaCheck and Spin Animation */}
				<div className="flex justify-center">
					<div className="w-20 h-20 animate-pulse shadow-2xl shadow-black bg-green-500 rounded-full flex items-center justify-center">
						<FaCheck className="text-white text-4xl" />
					</div>
				</div>

				{/* Success Message */}
				<h1 className="text-3xl font-bold mt-4 text-gray-800 text-center animate-slide-in">
					Payment Successful!
				</h1>
				<p className="mt-2 text-gray-600 text-center animate-slide-in">
					Thank you, <span className="font-semibold">{userName}</span>!
				</p>

				{/* Payment Details */}
				<div className="mt-6 space-y-3 animate-slide-in">
					<ListOptions OPTIONS={paymentDetails} RENDER_ITEM={renderItems} />
				</div>

				{/* Additional Message */}
				<div className="mt-6 bg-green-50 p-4 rounded-lg animate-slide-in">
					<p className="text-green-700 text-sm text-center">
						{additionalMessage}
					</p>
				</div>

				{/* Continue Shopping Button */}
				<button
					className="mt-8 w-full bg-gradient-to-r from-blue-950 to-gray-900 text-white px-6 py-3 rounded-lg transition-all duration-700 hover:scale-105"
					onClick={() => navigate("/shop")}>
					Continue Shopping
				</button>
			</div>
		</div>
	);
};

// Define prop types
SuccessPaymentCard.propTypes = {
	totalAmount: PropTypes.string.isRequired,
	transactionId: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired,
	additionalMessage: PropTypes.string.isRequired,
	paymentMail: PropTypes.string.isRequired,
	createTime: PropTypes.string.isRequired,
};

export default SuccessPaymentCard;
