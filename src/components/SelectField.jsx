import React from "react";
import PropTypes from "prop-types";
import ListOptions from "./ListOptions";

/**
 * SelectField component that renders a dropdown select input with validation feedback.
 *
 * @param {Object} props - Component props.
 * @param {string} props.LABEL - The label text for the select field.
 * @param {string} props.NAME - The name attribute for the select field.
 * @param {Object} props.ERRORS - Validation errors for the field.
 * @param {Array} props.OPTIONS - Array of options to render in the select dropdown.
 * @param {function} props.REGISTER - Function to register the field for validation.
 * @param {string} props.PLACEHOLDER - Placeholder text for the select field.
 * @param {Object} props.VALIDATION_RULES - Validation rules for the field.
 * @param {boolean} props.IS_SUCCESS - Indicates whether the field input is valid.
 * @param {any} props.REST - Additional props to pass to the select element.
 */

const SelectField = ({
	LABEL,
	NAME,
	ERRORS,
	OPTIONS,
	REGISTER,
	PLACEHOLDER,
	VALIDATION_RULES,
	IS_SUCCESS,
	...REST
}) => {
	// Determines class names based on error or success state
	const getSelectClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		}
		return "text-gray-700 dark:text-gray-600";
	};

	// Class name for the label based on error/success state
	const labelClass = ERRORS[NAME]
		? "text-red-700 dark:text-red-500"
		: IS_SUCCESS
		? "text-green-700 dark:text-green-500"
		: "text-gray-700 dark:text-gray-600";

	return (
		<div className="mb-4">
			<label
				htmlFor={NAME}
				className={`block mb-2 text-sm font-bold ${labelClass}`}>
				{LABEL}
			</label>
			<select
				{...REST}
				{...REGISTER(NAME, VALIDATION_RULES[NAME])}
				className={`focus:outline-none dark:bg-white text-sm font-normal rounded-lg block w-full p-2.5 ${getSelectClass()}`}
				aria-invalid={!!ERRORS[NAME]} // ARIA attribute for accessibility
				aria-describedby={`${NAME}-error`}>
				{PLACEHOLDER && (
					<option value="" disabled>
						{PLACEHOLDER}
					</option>
				)}
				<ListOptions
					OPTIONS={OPTIONS}
					RENDER_ITEM={(option) => (
						<option
							key={option.value}
							value={option.value}
							className="text-sm font-medium dark:text-gray-700">
							{option.label}
						</option>
					)}
				/>
			</select>
			{/* Display error message if present */}
			{ERRORS[NAME] && (
				<small
					id={`${NAME}-error`}
					className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

// PropTypes validation for the SelectField component
SelectField.propTypes = {
	LABEL: PropTypes.string.isRequired,
	NAME: PropTypes.string.isRequired,
	ERRORS: PropTypes.object.isRequired,
	OPTIONS: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	REGISTER: PropTypes.func.isRequired,
	PLACEHOLDER: PropTypes.string,
	VALIDATION_RULES: PropTypes.object.isRequired,
	IS_SUCCESS: PropTypes.bool,
};

export default SelectField;
