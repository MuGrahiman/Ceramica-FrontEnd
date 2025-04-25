import React, { useState } from "react";
import OrderList from "./OrderList";
import UserNameHeader from "../../components/UserNameHeader";
import { useAuth } from "../../hooks/useAuth";
import OrderEmptySpot from "./OrderEmptySpot";
import useOrder from "../../hooks/useOrder";
import LoadingTemplate from "../../components/LoadingTemplate";
import InfoLayout from "../../components/InfoLayout";

const UserOrderPage = () => {
	const ROLE = "client";
	// Mock data with default values
	const { currentUserName } = useAuth(ROLE);

	const { ordersData, isOrdersLoading } = useOrder(ROLE);

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<UserNameHeader userName={currentUserName} />

			{isOrdersLoading ? (
				<LoadingTemplate />
			) : ordersData?.length > 0 ? (
				<InfoLayout title="Your Orders">
					<OrderList orders={ordersData} />
				</InfoLayout>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
					<OrderEmptySpot />
				</div>
			)}
		</div>
	);
};

export default UserOrderPage;
