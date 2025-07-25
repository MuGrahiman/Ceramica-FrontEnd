import React from "react";
import OrderCard from "./OrderCard";
import ListOptions from "../../components/ListOptions";
import PropTypes from "prop-types";
import ListContainer from "../../components/ListContainer";

/**
 * OrderList - Displays a list of orders with their statuses.
 * If there are no orders, it shows the OrderEmptySpot component.
 * @param {Array} orders - The list of orders to display.
 */
const OrderList = ({ orders }) => {
	return (
		<ListContainer divideItems scrollable containerClassName="p-2">
			<ListOptions
				OPTIONS={orders}
				RENDER_ITEM={(order, index) => (
					<OrderCard
						key={index}
						order={order}
						baseLink="/dashboard/order-detail"
					/>
				)}
				EMPTY_MESSAGE={"No orders available"}
			/>
		</ListContainer>
	);
};

OrderList.propTypes = {
	orders: PropTypes.array.isRequired,
};

export default OrderList;
