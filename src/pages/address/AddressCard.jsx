import React from "react";
import PropTypes from "prop-types";
import { MdClose, MdStars } from "react-icons/md";

const AddressCard = ({
	ITEMS,
	ON_SELECTION,
	ADDRESS_ID,
	ON_DELETE,
	EDIT_MODE = false,
}) => {
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
			// onClick={() => ON_SELECTION(ITEMS)}
			className="p-4 border rounded-lg w-full flex-shrink-0  hover:shadow">
			{isDefault ? (
				<MdStars className="ms-auto w-5 h-5 rounded-full" />
			) : (
				EDIT_MODE && (
					<MdClose
						className="ms-auto w-5 h-5 cursor-pointer rounded-full hover:shadow hover:text-red-600"
						onClick={() => ON_DELETE(_id)}
					/>
				)
			)}

			<div className="flex items-center gap-2">
				{EDIT_MODE && (
					<input
						className="cursor-pointer"
						type="radio"
						name="address"
						checked={ADDRESS_ID === _id}
						onChange={() => ON_SELECTION(ITEMS)}
					/>
				)}
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
	ON_DELETE: PropTypes.func.isRequired,
	EDIT_MODE: PropTypes.bool.isRequired,
};

export default AddressCard;
