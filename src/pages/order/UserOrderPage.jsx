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
	const { isAuthorized, currentUser } = useAuth(ROLE);
	const {
		ordersData,
		id,
		fetchLoading,
		isStatusUpdating,
		handleSelection,
		onSearch,
		onClearSearch,
	} = useOrder(ROLE);

	const [orders, setOrders] = useState([
		{
			id: "ORD-2023-001",
			date: "2023-05-15",
			status: "delivered",
			items: 3,
			total: 149.99,
			trackingNumber: "TRK123456789",
			expanded: false,
		},
		{
			id: "ORD-2023-002",
			date: "2023-06-02",
			status: "shipped",
			items: 2,
			total: 89.5,
			trackingNumber: "TRK987654321",
			expanded: false,
		},
		{
			id: "ORD-2023-003",
			date: "2023-06-10",
			status: "processing",
			items: 1,
			total: 45.0,
			trackingNumber: null,
			expanded: false,
		},
	]);

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<UserNameHeader
				userName={`${currentUser.firstName} ${currentUser.lastName}`}
			/>

			{fetchLoading ? (
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
