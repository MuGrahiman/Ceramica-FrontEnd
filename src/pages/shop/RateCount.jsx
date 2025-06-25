import React from "react";
import PropTypes from "prop-types";
import StarRating from "../../components/StarRating";

/**
 * Displays  rating  counts .
 * @param {Object} props
 * @param {number} [props.average=0] - Average rating value (0-5 scale)
 * @param {number} [props.count=0] - Total number of reviews
 */
const RateCount = ({ average = 0, count = 0 }) => {
	return (
		<div
			className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
			aria-label={`Rating summary: 
					${average ? average.toFixed(1) : "0.0"}
             stars from ${count} reviews`}>
			{/* Rating Summary */}
			<div className="flex items-center" aria-live="polite">
				<div className="text-3xl font-bold text-gray-800 mr-2">
					{average ? average.toFixed(1) : "0.0"}
				</div>

				{/* Star rating with visualization */}
				<div className="flex flex-col">
					<div className="flex items-center">
						{/* <ErrorBoundary fallback={<span>★</span>}> */}
						<StarRating ratingValue={average} size="lg" />
						{/* </ErrorBoundary> */}
					</div>
				</div>
			</div>

			{/* Review Count with Pill Badge */}
			<div className="flex items-center">
				{count > 0 ? (
					<span
						className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-800 shadow-sm"
						aria-label={`${count} review${count !== 1 ? "s" : ""}`}>
						{count} rating{count !== 1 ? "s" : ""}
					</span>
				) : (
					<span className="ml-2 text-sm text-gray-500">
						(Be the first to review)
					</span>
				)}
			</div>
		</div>
	);
};

RateCount.propTypes = {
	average: PropTypes.number,
	count: PropTypes.number,
};

export default RateCount;
