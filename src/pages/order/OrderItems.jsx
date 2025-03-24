import React from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";
import CartCard from "../cart/CartCard";

/**
 * Order Items Component: Displays the list of items in an order.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.items - The array of items in the order.
 */
const OrderItems = ({ items }) => {
	return (
		<div className="bg-white shadow-md rounded-lg p-4">
			<h2 className="text-2xl font-bold mb-4">Order Items</h2>
			{items ? (
				<>
					<ul className="space-y-2">
						<ListOptions
							EMPTY_MESSAGE="No items found in the order!"
							OPTIONS={items}
							RENDER_ITEM={(item) => (
								<CartCard
									showButtons={false}
									title={item.productId.title}
									coverImage={item?.productId?.coverImage}
									quantity={item.quantity}
									price={item.productId.price}
								/>
							)}
						/>
					</ul>
				</>
			) : (
				<p className="text-gray-600 text-center py-4">
					Order items not available.
				</p>
			)}
		</div>
	);
};

OrderItems.propTypes = {
	items: PropTypes.array.isRequired,
};

export default OrderItems;
