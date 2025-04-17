import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import { IoCloseSharp } from "react-icons/io5";
import MiniLoader from "../../components/MiniLoader";

const AvatarHandler = ({ file, onFileRemove, onFileChange, isLoading }) => {
	return file && file.public_id ? (
		<div
			key={file.public_id}
			className="relative flex flex-shrink-0 items-center justify-center rounded-full
             bg-white group  overflow-hidden">
			{/* Overlay for hover effect */}
			<div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
			{/* Centered icon */}
			<button
				disabled={isLoading}
				onClick={onFileRemove}
				type="button"
				className="w-full h-full text-center flex items-center justify-center absolute opacity-0 group-hover:opacity-100 font-bold text-3xl text-gray-500 duration-300 cursor-pointer"
				aria-label={`Remove image `}>
				<IoCloseSharp />
			</button>
			{/* Image */}

			<Avatar imgLink={file.url} imgAlt={`Uploaded image `} />
		</div>
	) : (
		<label
			htmlFor={"avatar"}
			className="mx-auto rounded-full p-[1.26rem] border-4
     border-white bg-white shadow-xl animate-fade-in
     flex flex-col items-center justify-center w-full cursor-pointer">
			{/* <div className="flex flex-col items-center justify-center"> */}
			{isLoading ? (
				<div className="h-20 w-20 flex justify-center items-center">
					<MiniLoader />
				</div>
			) : (
				<svg
					className="h-20 w-20  text-blue-500 dark:text-gray-400"
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
			)}
			{/* </div> */}
			<input
				disabled={isLoading}
				onChange={onFileChange}
				id={"avatar"}
				type="file"
				className="hidden"
				aria-label="Upload image"
			/>
		</label>
	);
};
AvatarHandler.propTypes = {
	file: PropTypes.shape({
		url: PropTypes.string,
		public_id: PropTypes.string,
	}),
	onFileRemove: PropTypes.func.isRequired,
	onFileChange: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
export default AvatarHandler;
