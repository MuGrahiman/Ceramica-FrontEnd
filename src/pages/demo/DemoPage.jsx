import React from "react";

import demoData from "./DemoData.json";

import OrderDetailPage from "../order/OrderDetailPage";
// Now you can use the coupons array

function DemoPage() {
	
	return (
		<div className="container mx-auto">
			<OrderDetailPage order={demoData} />;
		</div>
	);
}

export default DemoPage;
