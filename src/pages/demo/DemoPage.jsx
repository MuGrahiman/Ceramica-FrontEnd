import React, { useState } from "react";
import OrderList from "../order/OrderList";
import UserOrderPage from "../order/UserOrderPage";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import Dashboard from "../dashboard/Dashboard";

// Now you can use the coupons array

function DemoPage() {
	return (
		<div className="container mx-auto">
			<Dashboard />
			<AdminDashboard />
		</div>
	);
}

export default DemoPage;
