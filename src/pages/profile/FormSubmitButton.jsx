import React from "react";
import propType from "prop-types";
const FormSubmitButton = ({ text = "Submit", isLoading = false }) => {
	return (
		<div className="flex justify-end col-span-full mb-8">
			<button
				type="submit"
				disabled={isLoading}
				className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            transition-colors duration-200 shadow-md  
            ${isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}>
				{isLoading ? "Processing..." : text}
			</button>
		</div>
	);
};
FormSubmitButton.propTypes = {
	text: propType.string.isRequired,
	isLoading: propType.bool.isRequired,
};
export default FormSubmitButton;
