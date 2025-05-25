import React from "react";
import PropTypes from "prop-types";

/**
 * Displays the shipping address for an order
 * @param {Object} props - Component props
 * @param {Object} props.address - Shipping address details
 * @param {string} props.address.firstName - Recipient's first name
 * @param {string} props.address.lastName - Recipient's last name
 * @param {string} props.address.street - Street address
 * @param {string} props.address.city - City
 * @param {string} props.address.state - State/province
 * @param {string} props.address.zipCode - Postal/ZIP code
 * @param {string} props.address.country - Country
 * @param {string} props.address.phoneNumber - Contact phone number
 */
const OrderAddress = ({ address }) => {
	if (!address) {
		return (
			<p className="text-gray-600 text-center py-4">
				Shipping address not available.
			</p>
		);
	}

	const {
		firstName,
		lastName,
		street,
		city,
		state,
		zipCode,
		country,
		phoneNumber,
	} = address;

	return (
		<address className="not-italic ">
			<div className="space-y-1 text-gray-600 text-sm ">
				<p className="font-medium text-gray-800">
					{firstName} {lastName}
				</p>
				<p>{street}</p>
				<p>
					{city}, {state} {zipCode}
				</p>
				<p>{country}</p>
				{phoneNumber && (
					<p className="mt-2">
						<a
							href={`tel:${phoneNumber}`}
							className="text-blue-600 hover:underline">
							{phoneNumber}
						</a>
					</p>
				)}
			</div>
		</address>
	);
};

OrderAddress.propTypes = {
	address: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		street: PropTypes.string,
		city: PropTypes.string,
		state: PropTypes.string,
		zipCode: PropTypes.string,
		country: PropTypes.string,
		phoneNumber: PropTypes.string,
	}),
};

export default React.memo(OrderAddress);
