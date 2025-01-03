import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const CheckBox = ({ NAME, OPTION, CONTROL }) => {
	return (
		<div className="flex items-center mb-4" key={OPTION}>
			<Controller
				name={NAME}
				control={CONTROL}
				render={({ field }) => {
					return (
						<input
							type="checkbox"
							value={OPTION}
							className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
							onChange={(e) => {
								const newValue = e.target.checked
									? [...field.value, OPTION]
									: field.value.filter((val) => val !== OPTION);
								field.onChange(newValue);
							}}
							checked={field.value.includes(OPTION)}
						/>
					);
				}}
			/>
			<label className="ms-2 text-sm font-medium">{OPTION}</label>
		</div>
	);
};


CheckBox.propTypes = {
	NAME: PropTypes.string.isRequired,
	OPTION: PropTypes.string.isRequired,
	CONTROL: PropTypes.object.isRequired, 
  };
  
  export default React.memo(CheckBox);