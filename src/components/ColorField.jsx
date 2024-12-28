import { IoMdAdd } from "react-icons/io";
import ColorDisplay from "./ColorDisplay";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";

const ColorField = ({
	LABEL,
	NAME,
	TYPE = "text",
	REGISTER,
	PLACEHOLDER,
	ERRORS,
	VALIDATION_RULES,
	IS_SUCCESS,
	ON_ADD,
	COLOR_DATA,
	...REST
}) => {
	const [showColor, setShowColor] = useState(false);

	const getInputClass = () => {
		if (ERRORS[NAME]) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		} else {
			return "text-gray-700 dark:text-gray-600";
		}
	};

	const labelClass = ERRORS[NAME]
		? "text-red-700 dark:text-red-500"
		: IS_SUCCESS
		? "text-green-700 dark:text-green-600"
		: "text-gray-700 dark:text-gray-600";

	const handleAdding = () => {
		ON_ADD();
		setShowColor(true);
	};
	const handleClose = () => setShowColor(false);
	return (
		<div className="mb-5 w-full">
			<label
				htmlFor={NAME}
				className={`block mb-2 text-sm font-bold ${labelClass}`}>
				{LABEL}
			</label>
			<div className="flex ">
				<input
					{...REST}
					{...REGISTER(NAME, VALIDATION_RULES[NAME])}
					type={TYPE}
					id={NAME}
					aria-invalid={ERRORS[NAME] ? "true" : "false"}
					placeholder={PLACEHOLDER || `Enter ${NAME}`}
					className={`focus:outline-none dark:bg-white text-sm font-normal rounded-none rounded-s-lg block w-full p-2.5 ${getInputClass()}`}
				/>
				<span className="inline-flex items-center px-3 text-sm text-gray-900 cursor-pointer   dark:text-gray-400 dark:bg-gray-500 hover:dark:bg-gray-600 bg-gray-200 border  border-e-0 rounded-e-0  rounded-e-md border-gray-300 dark:border-gray-500 hover:dark:border-gray-600">
					{COLOR_DATA.colorLoading ? (
						<ImSpinner9 className="w-5 h-5 rotate animate-spin text-gray-700 dark:text-gray-600" />
					) : (
						<IoMdAdd
							onClick={handleAdding}
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
						/>
					)}
				</span>
			</div>
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
			{showColor && (
				<ColorDisplay
					ON_CLOSE={handleClose}
					IMAGE_URL={COLOR_DATA?.image}
					COLOR_NAME={COLOR_DATA?.name}
					HEX_VALUE={COLOR_DATA?.hex}
				/>
			)}
		</div>
	);
};

export default ColorField;
