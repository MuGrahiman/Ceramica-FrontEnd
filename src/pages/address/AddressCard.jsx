import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdStars } from "react-icons/md";
import useAddress from "../../hooks/useAddress";

const AddressCard = ({ ITEMS, ON_SELECTION, ADDRESS_ID }) => {
	// Destructuring the values from ITEMS in camel case
	const {
		_id,
		firstName,
		lastName,
		phoneNumber,
		street,
		city,
		state,
		country,
		zipCode,
		isDefault = false,
	} = ITEMS;


	return (
		<div
		onClick={() => ON_SELECTION(ITEMS)}
		className="p-4 border rounded-lg w-full flex-shrink-0 cursor-pointer hover:shadow">
			{isDefault && <MdStars className="ms-auto" />}
			<div className="flex items-center gap-2">
				<input
					type="radio"
					name="address"
					checked={ADDRESS_ID === _id}
					onClick={() => ON_SELECTION(ITEMS)}
					/>
				<div>
					<p className="font-medium">{`${firstName} ${lastName}`}</p>
					<p className="text-sm text-gray-600">{`${street}, ${city}`}</p>
					<p className="text-sm text-gray-600">{`${state}, ${country}, ${zipCode}`}</p>
					<p className="text-sm text-gray-600">{phoneNumber}</p>
				</div>
			</div>
		</div>
	);
};

// Prop Types definition
AddressCard.propTypes = {
	ITEMS: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		phoneNumber: PropTypes.string.isRequired,
		street: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		zipCode: PropTypes.string.isRequired,
		isDefault: PropTypes.bool,
	}).isRequired,
	ADDRESS_ID: PropTypes.string.isRequired,
	ON_SELECTION: PropTypes.func.isRequired,
};

export default AddressCard;
