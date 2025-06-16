import React from "react";
import { Controller } from "react-hook-form";
import StarRating from "./StarRating";
import PropTypes from "prop-types"; // Suggested addition

/**
 * A controlled star rating input field with validation support.
 * Integrates with react-hook-form's Controller for form state management.
 *
 * @param {Object} props
 * @param {string} props.label - Label text for the rating field
 * @param {string} props.name - Name attribute for form registration
 * @param {Object} props.control - React Hook Form control object
 * @param {Object} [props.errors={}] - Form errors object from react-hook-form
 * @param {boolean} [props.isSuccess=false] - Success state indicator
 * @param {string} [props.size="md"] - Size variant ('sm', 'md', 'lg')
 * @param {boolean} [props.interactive=false] - Whether stars are clickable
 */
const StarRatingField = ({
	label = "",
	name = "",
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
		<div className="mb-4 w-full text-sm">
			<label
				htmlFor={name}
				className={`mb-1 block text-sm font-medium an ${labelClass}`}
				aria-invalid={!!errors[name]}
				aria-describedby={`${name}-error`}>
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
					<>
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
							aria-label={`${label} rating`}
							aria-required="true"
						/>
					</>
				)}
			/>
		</div>
	);
};

// Suggested prop validation:
StarRatingField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	errors: PropTypes.object,
	isSuccess: PropTypes.bool,
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	interactive: PropTypes.bool,
};

export default StarRatingField;
