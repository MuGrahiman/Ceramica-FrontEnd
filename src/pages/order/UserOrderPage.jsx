import React, { useState } from "react";
import OrderList from "./OrderList";
import UserNameHeader from "../../components/UserNameHeader";
import { useAuth } from "../../hooks/useAuth";
import OrderEmptySpot from "./OrderEmptySpot";
import useOrder from "../../hooks/useOrder";
import InfoLayout from "../../components/InfoLayout";
import TabSwitcher from "../../components/TabSwitcher";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";

const UserOrderPage = () => {
	const ROLE = "client";
	// Mock data with default values
	const { currentUserName } = useAuth(ROLE);
	const TAB = {
		ACTIVE: "active",
		COMPLETED: "completed",
		CANCELLED: "cancelled",
	};
	const [selectedTab, setSelectedTab] = useState(TAB.ACTIVE);

	const {
		ordersData,
		isOrdersLoading,
		ordersFetchIsError,
		ordersFetchError,
		isOrdersLength,
		filterOrders,
	} = useOrder(ROLE);
	const handleTabSelection = (key) => {
		if (key === TAB.ACTIVE) filterOrders({ orderStatus: ["processing"] });
		if (key === TAB.COMPLETED) filterOrders({ orderStatus: ["delivered"] });
		if (key === TAB.CANCELLED) filterOrders({ orderStatus: ["cancelled"] });
		setSelectedTab(key);
	};
	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<UserNameHeader userName={currentUserName} />

			<LoadingErrorBoundary
				isLoading={isOrdersLoading}
				isError={ordersFetchIsError} 
				errorMessage={
					ordersFetchError?.data?.message ||
					ordersFetchError?.message ||
					"Failed to fetch your orders."
				}>
				{isOrdersLength ? (
					<InfoLayout title="Your Orders">
						<TabSwitcher
							tabs={[
								{ label: "Active", key: TAB.ACTIVE },
								{ label: "Completed", key: TAB.COMPLETED },
								{ label: "Cancelled", key: TAB.CANCELLED },
							]}
							activeTab={selectedTab}
							onSelectTab={handleTabSelection}
						/>
						<OrderList orders={ordersData} />
					</InfoLayout>
				) : (
					<div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
						<OrderEmptySpot />
					</div>
				)}
			</LoadingErrorBoundary>
		</div>
	);
};

export default UserOrderPage;
