// components/RecentOrders.jsx
import React from "react";
import PropTypes from "prop-types";
import { ORDER_STATUSES } from "../../constants/order";

const statusColors = {
	[ORDER_STATUSES.PROCESSING]: "bg-yellow-100 text-yellow-800",
	[ORDER_STATUSES.SHIPPED]: "bg-blue-100 text-blue-800",
	[ORDER_STATUSES.DELIVERED]: "bg-green-100 text-green-800",
	[ORDER_STATUSES.CANCELLED]: "bg-red-100 text-red-800",
};

const RecentOrders = ({ orders }) => (
	<div className="bg-white p-6 rounded-lg shadow-sm">
		<h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
							Order ID
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
							Amount
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{orders.slice(0, 5).map((order) => (
						<tr key={order._id}>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								#{order._id.slice(-6)}
							</td>

							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								${order.totalAmount.toFixed(2)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										statusColors[order.status]
									}`}>
									{order.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

RecentOrders.propTypes = {
	orders: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			totalAmount: PropTypes.number.isRequired,
			status: PropTypes.oneOf(Object.values(ORDER_STATUSES)).isRequired,
		})
	).isRequired,
};

export default RecentOrders;
