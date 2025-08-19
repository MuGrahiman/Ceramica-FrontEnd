import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

/**
 * Controlled checkbox component for React Hook Form
 *
 * @param {Object} props
 * @param {string} props.NAME - Field name for form registration (required)
 * @param {string} props.VALUE - Checkbox value (required)
 * @param {Object} props.CONTROL - React Hook Form control object (required)
 * @param {string} [props.LABEL] - Custom label text (defaults to uppercase option)
 */
const CheckBox = ({
	NAME = "",
	VALUE = "", 
	CONTROL = {},
	LABEL = VALUE.toUpperCase(),
}) => {
	return (
		<div className={`flex items-center mb-4 `} key={VALUE}>
			<Controller
				name={NAME}
				control={CONTROL}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => {
					const arrayValue = Array.isArray(value) ? value : [];
					const isChecked = arrayValue.includes(VALUE);

					return (
						<React.Fragment>
							<input
								id={`${NAME}-${VALUE}`}
								type="checkbox"
								value={VALUE}
								className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
								onChange={(e) => {
									const newValue = e.target.checked
										? [...new Set([...arrayValue, VALUE])]
										: arrayValue.filter((val) => val !== VALUE);
									onChange(newValue);
								}}
								checked={isChecked}
								aria-checked={isChecked}
							/>
							<label
								htmlFor={`${NAME}-${VALUE}`}
								className="ms-2 text-sm font-medium cursor-pointer">
								{LABEL}
							</label>
						</React.Fragment>
					);
				}}
			/>
		</div>
	);
};

CheckBox.propTypes = {
	NAME: PropTypes.string.isRequired,
	VALUE: PropTypes.string.isRequired,
	CONTROL: PropTypes.object.isRequired,
	LABEL: PropTypes.string,
};

export default React.memo(CheckBox);
