import React from "react";
import PropTypes from "prop-types";
import ListOptions from "./ListOptions";
import { formatToLowerCase, formatToUpperCase } from "../utils/generals";

/**
 * A customizable select dropdown component
 * @param {Array} options - List of selectable options
 * @param {string} [label="Select an option"] - Accessible label for the dropdown
 * @param {function} onChange - Callback when selection changes
 * @param {string} [value] - Currently selected value
 */
const SelectDropdown = ({
	options,
	label = "Select an option",
	onChange,
	selectedValue,
}) => {
	return (
		<form className="max-w-sm mx-auto">
			<label htmlFor="select_input" className="sr-only">
				{label}
			</label>
			<select
				id="select_input"
				className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
				onChange={onChange}
				value={selectedValue || ""}>
				<ListOptions
					OPTIONS={options}
					RENDER_ITEM={(option, index) => (
						<option
							key={`${option}-${index}`}
							value={formatToLowerCase(option)}>
							{formatToUpperCase(option)}
						</option>
					)}
					EMPTY_MESSAGE="No Options Available"
				/>
			</select>
		</form>
	);
};

SelectDropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	selectedValue: PropTypes.string,
};

export default SelectDropdown;
