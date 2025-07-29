// src/components/OrderDetailPage.js
import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import OrderAddress from "./OrderAddress";
import OrderPayment from "./OrderPayment";
import OrderCoupon from "./OrderCoupon";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/store";
import BreadCrumb from "../../components/BreadCrumb";
import { ORDER_BREAD_CRUMB_ITEMS } from "../../constants/order";
import OrderUserDetails from "./OrderUserDetails";
import PageTitle from "../../components/PageTitle";
import InfoLayout from "../../components/InfoLayout";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
/**
 * Order Detail Page: Displays detailed information about a specific order.
 */
const OrderDetailPage = () => {
	const { id } = useParams();
	const {
		data: orderDetails,
		isLoading,
		error,
		isError,
	} = useGetOrderByIdQuery(id);
	const [orderData, setOrderData] = useState({});

	// Update order data when fetched
	useEffect(() => {
		if (orderDetails && Object.keys(orderDetails).length) {
			setOrderData(orderDetails);
		}
	}, [orderDetails]);

	return (
		<LoadingErrorBoundary
			isLoading={isLoading}
			isError={isError}
			errorMessage={handleAndShowError(error, "Failed to fetch order details")}>
			{/* Header Section */}
			<PageTitle title="Order Details" />
			<BreadCrumb items={ORDER_BREAD_CRUMB_ITEMS(orderData._id)} />
			<div className="grid gap-2">
				{/* User and Address Section */}
				<div className="w-full flex flex-col md:flex-row gap-2">
					<InfoLayout title="User Details">
						<OrderUserDetails user={orderData.userId} />
					</InfoLayout>
					<InfoLayout title="Shipping Address">
						<OrderAddress address={orderData.addressId} />
					</InfoLayout>
				</div>

				{/* Payment and Coupon Section */}
				<div className="w-full flex flex-col md:flex-row gap-2">
					<InfoLayout title="Payment Details">
						<OrderPayment payment={orderData.paymentId} />
					</InfoLayout>
					<InfoLayout title="Coupon Details">
						<OrderCoupon coupon={orderData.couponId} />
					</InfoLayout>
				</div>

				{/* Summary and Items Section */}
				<div className="w-full flex flex-col gap-2">
					<InfoLayout title="Order Summary">
						<OrderSummary summary={orderData} />
					</InfoLayout>
					<InfoLayout title="Order Items">
						<OrderItems items={orderData.items} />
					</InfoLayout>
				</div>
			</div>
		</LoadingErrorBoundary>
	);
};

export default OrderDetailPage;
