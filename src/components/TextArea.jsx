import React from "react";
import PropTypes from "prop-types";

/**
 * TextArea component that renders a styled textarea input field.
 * Displays validation feedback based on error and success states.
 */
const TextArea = ({
	LABEL = "",
	NAME = "",
	REGISTER,
	PLACEHOLDER,
	ERRORS,
	VALIDATION_RULES = {},
	IS_SUCCESS = false,
	...REST
}) => {
	// Returns CSS classes based on validation state
	const getTextAreaClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		}
		return "text-gray-700 dark:text-gray-600";
	};

	// Class name for the label based on validation state
	const labelClass = ERRORS[NAME]
		? "text-red-700 dark:text-red-500"
		: IS_SUCCESS
		? "text-green-700 dark:text-green-500"
		: "text-gray-700 dark:text-gray-600";

	return (
		<div className="mb-4 w-full text-sm ">
			<label
				htmlFor={NAME}
				className={`mb-1 block text-sm font-medium  ${labelClass}`}>
				{LABEL}
			</label>
			<textarea
				{...REST}
				rows={5}
				id={NAME}
				aria-invalid={!!ERRORS[NAME]}
				{...REGISTER(NAME, VALIDATION_RULES[NAME])}
				className={` border  rounded px-4  p-2.5 bg-gray-50
                    focus:outline-none dark:bg-white font-normal r block w-full ${getTextAreaClass()}`}
				placeholder={PLACEHOLDER || `Enter ${NAME}`}
			/>

			{/* Display error message if present for this field */}
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

// Validate prop types for TextArea component
TextArea.propTypes = {
	LABEL: PropTypes.string.isRequired,
	NAME: PropTypes.string.isRequired,
	REGISTER: PropTypes.func.isRequired,
	PLACEHOLDER: PropTypes.string,
	ERRORS: PropTypes.object.isRequired,
	VALIDATION_RULES: PropTypes.object.isRequired,
	IS_SUCCESS: PropTypes.bool,
};

export default TextArea;
