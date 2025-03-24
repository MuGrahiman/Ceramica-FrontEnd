import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const RadioComponent = ({ NAME, OPTION, CONTROL }) => {
	return (
		<div className="flex items-center mb-4" key={OPTION.value}>
			<Controller
				name={NAME}
				control={CONTROL}
				render={({ field }) => (
					<input
						type="radio"
						value={OPTION.value}
						className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
						onChange={() => field.onChange(OPTION.value)}
						checked={field.value === OPTION.value}
					/>
				)}
			/>
			<label className="ms-2 text-sm font-medium">{OPTION.label.toUpperCase()}</label>
		</div>
	);
};

RadioComponent.propTypes = {
	NAME: PropTypes.string.isRequired,
	OPTION: PropTypes.shape({
	  value: PropTypes.string.isRequired,
	  label: PropTypes.string.isRequired,
	}).isRequired,
	CONTROL: PropTypes.object.isRequired, 
  };
  
  export default React.memo(RadioComponent);