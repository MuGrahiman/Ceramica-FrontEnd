import React from "react";
import PropTypes from "prop-types";
import { ORDER_STATUS_COLOR_VARIANTS } from "../../constants/order";

/**
 * Displays an order status banner with icon, label, and description
 * @param {Object} props - Component props
 * @param {React.Component} props.icon - Icon component to display
 * @param {string} props.label - Status label text
 * @param {string} props.description - Status description text
 * @param {'lime'|'green'|'red'|'yellow'|'orange'} [props.color='lime'] - Color theme
 * @returns {React.Element} Status banner component
 */
const OrderStatusBanner = ({
	icon: Icon,
	label = "Ordered",
	description = "Your order has been placed and is being processing.",
	color = ORDER_STATUS_COLOR_VARIANTS.lime,
}) => {
	return (
		<div
			className={`p-4 rounded-lg flex items-center gap-3 ${color} animate-fade-in`}
			role="status"
			aria-live="polite">
			<Icon className={`w-8 h-8 ${color.split(" ")[1]}`} />
			<div>
				<h4 className="font-medium">{label}</h4>
				<p className="text-sm">{description}</p>
			</div>
		</div>
	);
};

OrderStatusBanner.propTypes = {
	icon: PropTypes.elementType.isRequired,
	label: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	color: PropTypes.oneOf(Object.keys(ORDER_STATUS_COLOR_VARIANTS)).isRequired,
};

export default React.memo(OrderStatusBanner);
