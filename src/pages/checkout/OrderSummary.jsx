import React from "react";

const OrderSummary = () => {
	return (
		<div className="w-full lg:w-2/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">Order Summary</h2>
			<div className="space-y-4 overflow-y-auto">
				{/* Product Row */}
				<div className="flex justify-between items-center p-4 border rounded-lg">
					<p className="font-medium">Product 1</p>
					<p className="text-sm text-gray-600">$20.00</p>
					<p className="text-sm text-gray-600">Qty: 2</p>
					<p className="font-medium">$40.00</p>
				</div>
				{/* Add more product rows here */}
			</div>
		</div>
	);
};

export default OrderSummary;
