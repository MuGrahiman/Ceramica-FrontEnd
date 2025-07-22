import React from "react";
import { formatToLocaleDateString } from "../../utils/date";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Displays a single order card with details.
 * @param {Object} order - The order object containing details.
 */
const OrderCard = ({ order = {}, baseLink = "/order" }) => {
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
		<Link to={`${baseLink}/${order._id}`} className="group block">
	<li
		key={order._id}
		className="
			p-3 rounded-lg transition-all duration-300 ease-in-out
			transform bg-white hover:shadow-md hover:scale-[1.015] 
			cursor-pointer
		"
	>
		<div className="flex items-center justify-between">
			{/* Left side: Order ID and Date */}
			<div>
				<p className="text-sm font-medium text-indigo-600 group-hover:font-semibold">
					Order #{order._id}
				</p>
				<p className="text-sm text-gray-500 group-hover:font-semibold">
					{formatToLocaleDateString(order.createdAt)}
				</p>
			</div>

			{/* Right side: Amount and Status */}
			<div className="text-right">
				<p className="text-sm font-medium text-gray-900 group-hover:font-semibold">
					${order.totalAmount}
				</p>
				<p
					className={`text-xs font-medium group-hover:font-semibold transition-colors duration-300 ${getStatusColor(
						order.status
					)}`}
				>
					{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
				</p>
			</div>
		</div>
	</li>
</Link>

	);
};

OrderCard.propTypes = {
	baseLink: PropTypes.string.isRequired,
	order: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		totalAmount: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderCard;
