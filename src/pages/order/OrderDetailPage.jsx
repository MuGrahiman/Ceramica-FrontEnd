// src/components/OrderDetailPage.js
import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import OrderAddress from "./OrderAddress";
import OrderPayment from "./OrderPayment";
import OrderCoupon from "./OrderCoupon";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/store";
import LoadingTemplate from "../../components/LoadingTemplate";
import BreadCrumb from "../../components/BreadCrumb";
import { ORDER_BREAD_CRUMB_ITEMS } from "../../constants/order";
import OrderUserDetails from "./OrderUserDetails";
import PageTitle from "../../components/PageTitle";
import InfoLayout from "../../components/InfoLayout";
/**
 * Order Detail Page: Displays detailed information about a specific order.
 */
const OrderDetailPage = () => {
	const { id } = useParams();
	const { data: orderDetails, isLoading, error } = useGetOrderByIdQuery(id);
	const [orderData, setOrderData] = useState(null);

	// Update order data when fetched
	useEffect(() => {
		if (orderDetails && Object.keys(orderDetails).length) {
			setOrderData(orderDetails);
		}
	}, [orderDetails]);

	// Handle loading state
	if (isLoading) {
		return <LoadingTemplate />;
	}
	// Handle error state
	if (error) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching order details. Please try again later.</p>
			</div>
		);
	}
	// Handle empty state
	if (!orderData) {
		return (
			<div className="bg-white text-center text-gray-500 rounded shadow">
				<p>No order details found.</p>
			</div>
		);
	}

	return (
		<div className="">
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
		</div>
	);
};

export default OrderDetailPage;
