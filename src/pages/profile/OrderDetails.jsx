import React from "react";
import OrderList from "../order/OrderList";
import OrderEmptySpot from "../order/OrderEmptySpot";
import PropTypes from "prop-types";

/**
 * Displays the order details in the profile page.
 * If there are no orders, it shows the OrderEmptySpot component.
 * @param {Array} orders - The list of orders to display.
 */
const OrderDetails = ({ orders }) => {
	return orders?.length > 0 ? (
		<OrderList baseUrl="/order" orders={orders.slice(0, 2)} />
	) : (
		<OrderEmptySpot />
	);
};
OrderDetails.propTypes = {
	orders: PropTypes.array.isRequired,
};

export default OrderDetails;
