import React from "react";
import PropTypes from "prop-types";
import { MdStars } from "react-icons/md";

const AddressCard = ({
	FIRST_NAME,
	LAST_NAME,
	PHONE_NUMBER,
	STREET,
	CITY,
	STATE,
	COUNTRY,
	ZIP_CODE,
	IS_DEFAULT = false,
}) => {
	return (
		<div className="p-4 border rounded-lg w-full flex-shrink-0 cursor-pointer hover:shadow ">
			{IS_DEFAULT && <MdStars className="ms-auto" />}
			<div className="flex items-center gap-2">
				<input type="radio" name="address" className="" />

				<div>
					<p className="font-medium">{`${FIRST_NAME} ${LAST_NAME}`}</p>
					<p className="text-sm text-gray-600">{`${STREET}, ${CITY}`}</p>
					<p className="text-sm text-gray-600">{`${STATE}, ${COUNTRY}, ${ZIP_CODE}`}</p>
					<p className="text-sm text-gray-600">{PHONE_NUMBER}</p>
				</div>
			</div>
		</div>
	);
};

// Prop Types definition
AddressCard.propTypes = {
	FIRST_NAME: PropTypes.string.isRequired,
	LAST_NAME: PropTypes.string.isRequired,
	PHONE_NUMBER: PropTypes.string.isRequired,
	STREET: PropTypes.string.isRequired,
	CITY: PropTypes.string.isRequired,
	STATE: PropTypes.string.isRequired,
	COUNTRY: PropTypes.string.isRequired,
	ZIP_CODE: PropTypes.string.isRequired,
	IS_DEFAULT: PropTypes.bool.isRequired,
};

export default AddressCard;
