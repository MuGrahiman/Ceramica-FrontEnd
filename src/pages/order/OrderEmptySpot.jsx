import React from "react";
import EmptySpot from "../../components/EmptySpot";

/**
 * Displays an empty state message for the order history.
 * This component uses the EmptySpot component to render a consistent empty state message.
 */
const OrderEmptySpot = () => {
	return (
		<EmptySpot
			heading="No orders yet"
			subheading="Your order history will appear here"
			icon={
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1}
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
			}
			buttonText="Start Shopping"
		/>
	);
};

export default OrderEmptySpot;
