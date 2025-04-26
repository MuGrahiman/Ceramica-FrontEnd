import React from "react";
import { formatToLocaleDateString } from "../../utils/date";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Displays a single order card with details.
 * @param {Object} order - The order object containing details.
 */
const OrderCard = ({ order }) => {
	/**
	 * Returns the appropriate color class based on the order status.
	 * @param {string} status - The status of the order.
	 * @returns {string} - The Tailwind CSS color class.
	 */
	const getStatusColor = (status) => {
		switch (status) {
			case "delivered":
				return "text-green-600";
			case "shipped":
				return "text-blue-600";
			case "processing":
				return "text-yellow-600";
			default:
				return "text-gray-600";
		}
	};

	return (
		<li key={order._id} className="py-4 group cursor-pointer">
			<Link to={`/order/${order._id}`}>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium group-hover:font-bold text-indigo-600">
							Order #{order._id}
						</p>
						<p className="text-sm text-gray-500 group-hover:font-bold">
							{formatToLocaleDateString(order.createdAt)}
						</p>
					</div>
					<div className="text-right">
						<p className="text-sm font-medium group-hover:font-bold text-gray-900">
							${order.totalAmount}
						</p>
						<p
							className={`text-xs font-medium group-hover:font-bold ${getStatusColor(
								order.status
							)}`}>
							{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
						</p>
					</div>
				</div>
			</Link>
		</li>
	);
};

OrderCard.propTypes = {
	order: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		totalAmount: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderCard;
