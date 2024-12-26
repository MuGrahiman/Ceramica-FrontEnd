import React from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";

const ColorDisplay = ({ ON_LOADING, COLOR_NAME, HEX_VALUE, IMAGE_URL, ON_ADD }) => {
	return (
		<small className="flex min-h-12 max-h-12 text-center justify-center">
			{ON_LOADING ? (
				<ImSpinner9 className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600" />
			) : (
				<>
					<span className="inline-flex items-center px-3  text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
						<img
							src={IMAGE_URL}
							alt={COLOR_NAME}
							className="w-8 h-8 rounded-full mr-2"
						/>
					</span>
					<span className="flex-1 text-start px-3 text-sm text-gray-900 bg-gray-200 border  border-gray-300  dark:bg-gray-600 dark:text-white dark:border-gray-600">
						<small className="font-semibold p-0 m-0">Name: {COLOR_NAME}</small>
						<small className="block text-gray-100 p-0 m-0">
							Hex: {HEX_VALUE}
						</small>
					</span>
                
					<span
						className="inline-flex items-center min-h-full px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-e-md  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
						onClick={ON_ADD}>
						<IoMdAdd className="w-6 h-6" />
					</span>
				</>
			)}
		</small>
	);

	// return (
	// 	<div className="flex items-center dark:bg-white rounded-lg p-2.5 w-full mx-h-10">
	// 		{ON_LOADING ? (
	// 			<ImSpinner9 className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600" />
	// 		) : (
	// 			<>
	// 				{/* Color Image */}
	// 				<img
	// 					src={IMAGE_URL}
	// 					alt={COLOR_NAME}
	// 					className="w-8 h-8 rounded-md mr-2"
	// 				/>
	// 				{/* Color Name and Hex Value */}
	// 				<div className="flex-1 text-sm">
	// 					<small className="font-semibold p-0 m-0">Name: {COLOR_NAME}</small>
	// 					<small className="block text-gray-500">Hex: {HEX_VALUE}</small>
	// 				</div>
	// 				{/* Add Icon */}
	// 				<button onClick={ON_ADD} className="text-blue-500 hover:text-blue-700">
	// 					<FaPlus />
	// 				</button>
	// 			</>
	// 		)}
	// 	</div>
	// );
};

export default ColorDisplay;
