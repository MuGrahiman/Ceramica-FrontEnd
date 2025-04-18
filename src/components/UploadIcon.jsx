import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import MiniLoader from "./MiniLoader";

const UploadIcon = ({
	IS_LOADING,
	FIELDS,
	RENDER,
	HANDLE_FILE_REMOVE,
	MAX_LENGTH,
	NAME,
	TYPE,
	REGISTER,
	VALIDATION_RULES,
	isCircular,
	...REST
}) => {
	const getShapeClassName = () => {
		return isCircular ? "rounded-full" : "rounded-lg";
	};

	return (
		<div
			className={`dark:bg-white text-sm flex flex-col justify-center items-center font-normal ${getShapeClassName()} w-full h-40 p-2.5`}>
			{IS_LOADING ? (
				<MiniLoader />
			) : (
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
											<span className="font-semibold">Click to upload</span> or
											drag and drop
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
								aria-label="Upload image"
							/>
						</label>
					)}
				</>
			)}
		</div>
	);
};

export default UploadIcon;
