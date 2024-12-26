import React from "react";

const TextArea = ({
	LABEL,
	NAME,
	REGISTER,
	PLACEHOLDER,
	ERRORS,
	VALIDATION_RULES,
	IS_SUCCESS,
	...REST
}) => {
	const getTextAreaClass = () => {
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
		<div className="mb-5 w-full">
			<label
				htmlFor={NAME}
				className={`block mb-2 text-sm font-bold ${labelClass}`}>
				{LABEL}
			</label>
			<textarea
				{...REST}
				rows={5}
				id={NAME}
				aria-invalid={!!ERRORS[NAME]}
				{...REGISTER(NAME, VALIDATION_RULES[NAME])}
				className={`dark:bg-white text-sm font-normal rounded-lg block w-full p-2.5 ${getTextAreaClass()}`}
				placeholder={PLACEHOLDER || `Enter ${NAME}`}
			/>
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

export default TextArea;
