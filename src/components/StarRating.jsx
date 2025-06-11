import React, { useState } from "react";

/**
 * StarRating Component - Displays interactive or static star ratings
 *
 * @param {Object} props
 * @param {number} props.rating - Current rating value (0-5)
 * @param {function} [props.onRate] - Callback when user selects a rating
 * @param {string} [props.size] - Size of stars ('sm', 'md', 'lg')
 * @param {boolean} [props.interactive] - Whether stars are clickable
 */
const StarRating = ({
	noOfStars = 5,
	ratingValue,
	ratingClass = "text-yellow-400 fill-current",
	defaultClass = "text-gray-300 fill-none",
	onRate,
	size = "md",
	interactive = false,
}) => {
	const [hoverRating, setHoverRating] = useState(0);

	const starSize = {
		sm: "h-4 w-4",
		md: "h-5 w-5",
		lg: "h-6 w-6",
	}[size];

	return (
		<div className={`flex ${interactive ? "cursor-pointer" : ""}`}>
			{Array.from({ length: noOfStars }, (_, index) => (
				<svg
					key={index}
					className={`${starSize} 
						${index + 1 <= (hoverRating || ratingValue) ? ratingClass : defaultClass} 
							${interactive ? "transition-transform hover:scale-125 duration-150" : ""}`}
					viewBox="0 0 24 24"
					onMouseEnter={() => interactive && setHoverRating(index + 1)}
					onMouseLeave={() => interactive && setHoverRating(0)}
					onClick={() => interactive && onRate(index + 1)}>
					<path
						stroke="currentColor"
						strokeWidth="1.5"
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
			))}
		</div>
	);
};

export default StarRating;
