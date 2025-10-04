import React from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";
import ItemInfoIndicator from "../../components/ItemInfoIndicator";

/**
 * OrderItems - Displays the list of items in an order with proper validation and error handling
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of order items
 * @param {Object} props.items[].productId - Product information
 * @param {string} props.items[].productId.title - Product title
 * @param {Object} props.items[].productId.coverImage - Product cover image
 * @param {string} props.items[].productId.coverImage.url - Image URL
 * @param {number} props.items[].quantity - Item quantity
 * @param {number} props.items[].productId.price - Product price
 */
const OrderItems = ({ items = [] }) => {
	if (!items || !items.length) {
		return (
			<p
				className="text-gray-600 text-center py-4"
				role="status"
				aria-live="polite">
				Order items not available.
			</p>
		);
	}

	return (
		<ul className="space-y-2">
			<ListOptions
				EMPTY_MESSAGE="No items found in the order!"
				OPTIONS={items}
				RENDER_ITEM={(item) => (
					<ItemInfoIndicator
						showButtons={false}
						title={item.productId.title}
						coverImage={item?.productId?.coverImage}
						quantity={item.quantity}
						price={item.productId.price}
					/>
				)}
			/>
		</ul>
	);
};

OrderItems.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			productId: PropTypes.shape({
				title: PropTypes.string,
				coverImage: PropTypes.shape({
					url: PropTypes.string,
				}),
				price: PropTypes.number,
			}).isRequired,
			quantity: PropTypes.number,
		})
	),
};

export default React.memo(OrderItems);
