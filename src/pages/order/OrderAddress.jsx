import React from "react";
import PropTypes from "prop-types";

/**
 * Order Address Component: Displays the shipping address for an order.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.address - The address object containing details like name, phone number, street, city, state, zip code, and country.
 */
const OrderAddress = ({ address }) => {
	return (
		<div className="w-full bg-white shadow-md rounded-lg p-4 mt-4">
			<h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
			{address ? (
				<>
					<p className="text-gray-600">
						{address.firstName} {address.lastName}
					</p>
					<p className="text-gray-600">{address.phoneNumber}</p>
					<p className="text-gray-600">{address.street}</p>
					<p className="text-gray-600">
						{address.city}, {address.state} {address.zipCode}
					</p>
					<p className="text-gray-600">{address.country}</p>
				</>
			) : (
				<p className="text-gray-600 text-center py-4">
					Shipping address not available.
				</p>
			)}
		</div>
	);
};

OrderAddress.propTypes = {
  address: PropTypes.object.isRequired,
};

export default OrderAddress;
