import React from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { IoIosRemove, IoMdAdd } from "react-icons/io";

const ColorDisplay = ({
	ON_LOADING,
	COLOR_NAME,
	HEX_VALUE,
	IMAGE_URL,
	IS_ERROR,
	IS_SUCCESS,
	ON_CLOSE,
}) => {
	const getInputClass = () => {
		if (IS_ERROR) {
			return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
		} else if (IS_SUCCESS) {
			return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500";
		} else {
			return "text-gray-700 dark:text-gray-600";
		}
	};
	return (
		<small
			className="flex min-h-12 max-h-12  justify-center mt-2 text-sm text-gray-900  dark:text-gray-600 
				 focus:outline-none bg-gray-200">
			<>
				<span className="inline-flex items-center justify-center px-2  text-sm rounded-s-md  bg-gray-200 dark:bg-gray-500  ">
					<img
						src={IMAGE_URL}
						alt={COLOR_NAME}
						className="w-8 h-8 rounded-full mr-2 border"
					/>
				</span>
				<span className="flex-1 flex flex-col justify-center text-start px-3  dark:bg-white    rounded-e-md">
					<small className="font-semibold p-0 m-0">Name: {COLOR_NAME}</small>
					<small className="block  p-0 m-0">Hex: {HEX_VALUE}</small>
				</span>
				<span className="inline-flex items-center px-3 text-sm text-gray-900 cursor-pointer   dark:text-gray-400 dark:bg-gray-500 hover:dark:bg-gray-600 bg-gray-200 border  border-e-0 rounded-e-0  rounded-e-md border-gray-300 dark:border-gray-500 hover:dark:border-gray-600">
					<IoIosRemove
						onClick={ON_CLOSE}
						className="w-5 h-5 text-gray-500 dark:text-gray-400"
					/>
				</span>
			</>
		</small>
	);
};

export default ColorDisplay;
