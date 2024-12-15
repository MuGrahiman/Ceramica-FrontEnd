import React from "react";

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
	const getSelectClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		}
		return "text-gray-700 dark:text-gray-600";
	};

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
				className={`dark:bg-white text-sm font-normal rounded-lg block w-full p-2.5 ${getSelectClass()}`}
				aria-invalid={!!ERRORS[NAME]}>
				{PLACEHOLDER && (
					<option value="" disabled>
						{PLACEHOLDER}
					</option>
				)}
				{OPTIONS.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="text-sm font-medium dark:text-gray-700">
						{option.label}
					</option>
				))}
			</select>
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

export default SelectField;
