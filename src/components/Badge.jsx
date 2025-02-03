import React from "react";
import PropTypes from "prop-types";

const getInputClass = (status) => {
	if (status === "active") {
		return "border border-green-500  dark:border-green-500 hover:ring-green-800  text-green-900 dark:text-green-800 hover:text-green-300 placeholder-green-700 dark:placeholder-green-500 bg-green-50 dark:bg-gray-100 hover:bg-green-900 ";
	} else {
		return "border border-red-500  dark:border-red-500 hover:ring-red-800  text-red-900 dark:text-red-800 hover:text-red-300 placeholder-red-700 dark:placeholder-red-500 bg-red-50 dark:bg-gray-100 hover:bg-red-900 ";
	}
};

const Badge = ({ LABEL, STATUS, ON_CLICK }) => (
	<span
		onClick={ON_CLICK}
		className={`inline-flex items-center px-2 py-1 me-2 text-sm font-medium cursor-pointer rounded ${getInputClass(
			STATUS
		)}`}>
		{LABEL.toUpperCase()}
	</span>
);

Badge.propTypes = {
	LABEL: PropTypes.string.isRequired,
	STATUS: PropTypes.string.isRequired,
	ON_CLICK: PropTypes.func.isRequired,
};

export default Badge;
