import React from "react";
import OrderList from "../order/OrderList";
import OrderEmptySpot from "../order/OrderEmptySpot";
import ViewAllItems from "./ViewAllItems";
import PropTypes from "prop-types";

/**
 * Displays the order details in the profile page.
 * If there are no orders, it shows the OrderEmptySpot component.
 * @param {Array} orders - The list of orders to display.
 */
const OrderDetails = ({ orders }) => {
	return (
		<div className="px-6 py-4">
			{orders?.length > 0 ? (
				<OrderList orders={orders.slice(0, 2)} />
			) : (
				<OrderEmptySpot />
			)}
			{orders?.length && (
				<ViewAllItems text="orders" length={orders.length} link={"/orders"} />
			)}
		</div>
	);
};

OrderDetails.propTypes = {
	orders: PropTypes.array.isRequired,
};

export default OrderDetails;
