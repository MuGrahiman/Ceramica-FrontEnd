import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";

const ImageUploader = ({
	HANDLE_FILE_REMOVE,
	RENDER,
	FIELDS = [],
	LABEL,
	MAX_LENGTH = 0,
	NAME,
	TYPE = "text",
	REGISTER,
	ERRORS,
	VALIDATION_RULES,
	IS_SUCCESS,
	IS_LOADING = false,
	...REST
}) => {
	// Determine the class name for the label based on error/success state
	const getLabelClassName = () => {
		return ERRORS[NAME]
			? "text-red-700 dark:text-red-500"
			: IS_SUCCESS
			? "text-green-700 dark:text-green-600"
			: "text-gray-700 dark:text-gray-600";
	};

	// Determine the class name for the input container based on error/success state
	const getDivClassName = () => {
		return ERRORS[NAME]
			? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500"
			: IS_SUCCESS
			? "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500"
			: "text-gray-700 dark:text-gray-600";
	};
	return (
		<div className="mb-5 w-full">
			<label
				htmlFor={NAME}
				className={`block mb-2 text-sm font-bold ${getLabelClassName()}`}>
				{LABEL}
			</label>

			<div
				className={`dark:bg-white text-sm flex flex-col justify-center items-center font-normal rounded-lg  w-full h-40 p-2.5 ${getDivClassName()}`}>
				{IS_LOADING ? (
					// <div className="w-full h-full flex justify-center items-center">
					<ImSpinner9 className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600" />
				) : (
					//{/* </div> */}
					<>
						{/* Image Preview */}
						<div className="w-full flex overflow-x-auto space-x-2 flex-nowrap justify-center items-center">
							{FIELDS.map((field, index) => {
								const file = RENDER(field);
								return file.url ? (
									<div
										key={index}
										className="relative flex flex-shrink-0 items-center justify-center bg-white group w-20 h-20 overflow-hidden">
										{/* Overlay for hover effect */}
										<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
										{/* Centered icon */}
										<button
											type="button"
											className="w-full h-full text-center flex items-center justify-center absolute opacity-0 group-hover:opacity-100 font-bold text-3xl text-gray-500 duration-300 cursor-pointer"
											onClick={() => HANDLE_FILE_REMOVE(file.public_id, index)}
											aria-label={`Remove image ${index + 1}`}>
											<IoCloseSharp />
										</button>
										{/* Image */}
										<img
											className="rounded w-full h-full object-cover"
											src={file.url}
											alt={`Uploaded image ${index + 1}`}
										/>
									</div>
								) : (
									<IoCloseSharp key={index} />
								);
							})}
						</div>

						{/* Image Uploader */}
						{MAX_LENGTH > FIELDS.length && (
							<label
								htmlFor={NAME}
								className="flex flex-col items-center justify-center w-full cursor-pointer">
								<div className="flex flex-col items-center justify-center">
									<svg
										className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 16">
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
										/>
									</svg>
									{FIELDS.length === 0 && (
										<>
											<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
												<span className="font-semibold">Click to upload</span>{" "}
												or drag and drop
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												SVG, PNG, JPG or GIF (MAX. 800x400px)
											</p>
										</>
									)}
								</div>
								<input
									id={NAME}
									type={TYPE}
									className="hidden"
									{...REST}
									{...REGISTER(NAME, VALIDATION_RULES[NAME])}
									aria-label={`Upload ${LABEL}`}
								/>
							</label>
						)}
					</>
				)}
			</div>
			{ERRORS[NAME] && (
				<small className="w-full text-center text-xs text-red-600 dark:text-red-500">
					{ERRORS[NAME].message}
				</small>
			)}
		</div>
	);
};

export default ImageUploader;
