const InputField = ({
	LABEL,
	NAME,
	TYPE = "text",
	REGISTER,
	PLACEHOLDER,
	ERRORS,
	VALIDATION_RULES,
	IS_SUCCESS,
	DISABLED,
	...REST
}) => {
	const getInputClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500  dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		} else {
			return "text-gray-700 dark:text-gray-600";
		}
	};

	const labelClass = ERRORS[NAME]
		? "text-red-700 dark:text-red-500"
		: IS_SUCCESS
		? "text-green-700 dark:text-green-600"
		: "text-gray-700 dark:text-gray-600";

	return (
		<div className=" w-full text-sm">
			<label
				htmlFor={NAME}
				className={`block text-sm font-medium text-gray-700 mb-1 ${labelClass}`}>
				{LABEL}
			</label>
			<input
				className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none 
					${getInputClass()}`}
				// className={`h-10 border  rounded px-4  bg-gray-50
				// 	focus:outline-none dark:bg-white text-sm font-normal  block w-full p-2.5 ${getInputClass()}`}
				{...REGISTER(NAME, VALIDATION_RULES[NAME])}
				type={TYPE}
				id={NAME}
				disabled={DISABLED}
				aria-invalid={ERRORS[NAME] ? "true" : "false"}
				placeholder={PLACEHOLDER || `Enter ${NAME}`}
				{...REST}
			/>
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

export default InputField;
