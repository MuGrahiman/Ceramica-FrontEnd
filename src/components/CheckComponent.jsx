import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

/**
 * Controlled checkbox component for React Hook Form
 *
 * @param {Object} props
 * @param {string} props.NAME - Field name for form registration (required)
 * @param {string} props.OPTION - Checkbox value (required)
 * @param {Object} props.CONTROL - React Hook Form control object (required)
 * @param {string} [props.LABEL] - Custom label text (defaults to uppercase option)
 */
const CheckBox = ({
	NAME,
	OPTION,
	CONTROL,
	LABEL = OPTION.toUpperCase(),
}) => {
	return (
		<div className={`flex items-center mb-4 `} key={OPTION}>
			<Controller
				name={NAME}
				control={CONTROL}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => {
					const arrayValue = Array.isArray(value) ? value : [];
					const isChecked = arrayValue.includes(OPTION);

					return (
						<>
							<input
								id={`${NAME}-${OPTION}`}
								type="checkbox"
								value={OPTION}
								className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
								onChange={(e) => {
									const newValue = e.target.checked
										? [...new Set([...arrayValue, OPTION])]
										: arrayValue.filter((val) => val !== OPTION);
									onChange(newValue);
								}}
								checked={isChecked}
								aria-checked={isChecked}
							/>
							<label
								htmlFor={`${NAME}-${OPTION}`}
								className="ms-2 text-sm font-medium text-gray-900 cursor-pointer">
								{LABEL}
							</label>
						</>
					);
				}}
			/>
		</div>
	);
};

CheckBox.propTypes = {
	NAME: PropTypes.string.isRequired,
	OPTION: PropTypes.string.isRequired,
	CONTROL: PropTypes.object.isRequired,
	LABEL: PropTypes.string,
};

export default React.memo(CheckBox);
