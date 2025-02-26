import React, { useState } from "react";
import SuccessPaymentCard from "../success/SuccessPaymentCard";


function DemoPage() {
	return (
		<SuccessPaymentCard
			totalAmount="99.99"
			paymentMethod="PayPal"
			transactionID="TX123456789"
			userName="John Doe"
			additionalMessage="Your order will be shipped within  days."
		/>
	);
}

export default DemoPage;
