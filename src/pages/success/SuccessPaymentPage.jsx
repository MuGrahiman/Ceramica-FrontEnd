import React, { useEffect } from "react";
import SuccessPaymentCard from "./SuccessPaymentCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPayment, useGetOrderPaymentByIdQuery } from "../../redux/store";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";

const SuccessPaymentPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { data, isLoading, error, isError } = useGetOrderPaymentByIdQuery(id);
	useEffect(() => {
		if (data) {
			dispatch(addPayment(data));
		}
	}, [data, dispatch]);

	const payment = useSelector((state) => state.payment.payment);
	const currentUser = useSelector((state) => state.auth.currentUser);

	return (
		<LoadingErrorBoundary
			isLoading={isLoading}
			isError={isError}
			errorMessage={extractErrorMessage(
				error,
				"Failed to fetch Success Payment data"
			)}>
			<SuccessPaymentCard
				totalAmount={payment?.amount?.value}
				userName={currentUser?.firstName}
				paymentMail={payment?.payerMail}
				createTime={payment?.createTime}
				transactionId={payment?.transactionId}
				additionalMessage="Your order will be shipped within 3 days."
			/>
		</LoadingErrorBoundary>
	);
};

export default SuccessPaymentPage;
