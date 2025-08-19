import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";


/**
 * Controlled radio button component for form selection
 * @param {Object} props
 * @param {string} props.NAME - Form field name for react-hook-form
 * @param {string} props.VALUE - Radio button value
 * @param {string} props.LABEL - Display label text
 * @param {Object} props.CONTROL - React Hook Form control object
 */
const RadioComponent = ({
	NAME = "",
	VALUE = "",
	LABEL = "",
	CONTROL = {},
}) => {
	return (
		<div className="flex items-center mb-4" key={`${NAME}-${VALUE}`}>
			<Controller
				name={NAME}
				control={CONTROL}
				render={({ field: { onChange, value } }) => (
					<input
						type="radio"
						value={VALUE}
						className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						onChange={() => onChange(VALUE)}
						checked={value === VALUE}
					/>
				)}
			/>
			<label className="ms-2 text-sm font-medium">{LABEL.toUpperCase()}</label>
		</div>
	);
};

RadioComponent.propTypes = {
	NAME: PropTypes.string.isRequired,
	VALUE: PropTypes.string.isRequired,
	LABEL: PropTypes.string.isRequired,
	CONTROL: PropTypes.object.isRequired,
};

export default React.memo(RadioComponent);
