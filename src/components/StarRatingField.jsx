import React, { useState } from "react";
import { Controller } from "react-hook-form";
import StarRating from "./StarRating";

/**
 * StarRatingField Component - Displays interactive or static star ratings
 *
 * @param {Object} props
 * @param {number} props.rating - Current rating value (0-5)
 * @param {function} [props.onRate] - Callback when user selects a rating
 * @param {string} [props.size] - Size of stars ('sm', 'md', 'lg')
 * @param {boolean} [props.interactive] - Whether stars are clickable
 */
const StarRatingField = ({
	label,
	name,
	control,
	errors = {},
	isSuccess = false,
	size = "md",
	interactive = false,
}) => {
	// Class name for the label based on validation state
	const labelClass = errors[name]
		? "text-red-700 dark:text-red-500"
		: isSuccess
		? "text-green-700 dark:text-green-500"
		: "text-gray-700 dark:text-gray-600";

	return (
		<div className="mb-4 w-full text-sm ">
			<label
				htmlFor={name}
				className={`mb-1 block text-sm font-medium an  ${labelClass}`}>
				{label}:
			</label>
			<Controller
				name={name}
				control={control}
				rules={{
					required: "Rate is required.",
					validate: {
						minValue: (value) => value > 0 || "Rating must be greater than 0.",
					},
				}}
				render={({ field: { onChange, value } }) => (
					<StarRating
						defaultClass={
							errors[name]
								? "text-red-400 fill-none animate-pulse"
								: "text-gray-300 fill-none"
						}
						ratingValue={value}
						onRate={onChange}
						interactive={interactive}
						size={size}
					/>
				)}
			/>
		</div>
	);
};

export default StarRatingField;
