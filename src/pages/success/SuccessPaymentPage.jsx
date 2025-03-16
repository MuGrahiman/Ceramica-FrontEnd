import React, { useEffect } from "react";
import SuccessPaymentCard from "./SuccessPaymentCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPayment, useCouponSlice, useGetOrderPaymentByIdQuery, useOrderSlice } from "../../redux/store";
import { useCart } from "../../hooks/useCart";

const SuccessPaymentPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
		const { clearCart } = useCart();
	
	const { data, isLoading, error } = useGetOrderPaymentByIdQuery(id);
	useEffect(() => {
		if (data) {
			dispatch(addPayment(data));
		}
	}, [data, dispatch]);

	const payment = useSelector((state) => state.payment.payment);
	const currentUser = useSelector((state) => state.auth.currentUser);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<SuccessPaymentCard
			totalAmount={payment?.amount?.value}
			userName={currentUser?.firstName}
			paymentMail={payment?.payerMail}
			createTime={payment?.createTime}
			transactionId={payment?.transactionId}
			additionalMessage="Your order will be shipped within 3 days."
		/>
	);
};

export default SuccessPaymentPage;
