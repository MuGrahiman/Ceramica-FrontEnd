import React, { useState } from "react";
import SuccessPaymentCard from "../success/SuccessPaymentCard";
import Skeleton from "../../components/Skeleton";


function DemoPage() {
	return (
		<div className="container mx-auto">
		<Skeleton
			totalAmount="99.99"
			paymentMethod="PayPal"
			transactionID="TX123456789"
			userName="John Doe"
			additionalMessage="Your order will be shipped within  days."
		/></div>
	);
}

export default DemoPage;
