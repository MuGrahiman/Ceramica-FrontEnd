import React from "react";
import OrderCard from "./OrderCard";
import ListOptions from "../../components/ListOptions";
import PropTypes from "prop-types";

/**
 * Displays a list of orders with their statuses.
 * If there are no orders, it shows the OrderEmptySpot component.
 * @param {Array} orders - The list of orders to display.
 */
const OrderList = ({ orders }) => {
	return (
		<ul className="divide-y divide-gray-200">
			<ListOptions
				OPTIONS={orders}
				RENDER_ITEM={(order, index) => <OrderCard key={index} order={order} />}
				EMPTY_MESSAGE={"No orders available"}
			/>
		</ul>
	);
};

OrderList.propTypes = {
	orders: PropTypes.array.isRequired,
};

export default OrderList;
