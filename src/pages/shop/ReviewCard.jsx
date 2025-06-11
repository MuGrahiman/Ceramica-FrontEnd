import React from "react";
import StarRating from "../../components/StarRating";
import Toggler from "../../components/Toggler";
import useToggle from "../../hooks/useToggle";
import { setDateAsDayMonthYear } from "../../utils/date";

/**
 * ReviewCard Component - Displays an individual review
 *
 * @param {Object} props
 * @param {Object} props.review - Review data object
 * @param {boolean} [props.isCurrentUser] - Whether this is the current user's review
 * @param {function} [props.onEdit] - Callback when edit is clicked
 */
const ReviewCard = ({ review, isCurrentUser = false, onEdit }) => {
	// Generate initials for profile picture
	const initials = review?.name
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
	const [toggleFunction, isToggledState] = useToggle();

	return (
		<div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 animate-fadeIn">
			<div className="flex items-start gap-3 mb-3">
				<div className="flex-shrink-0">
					<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
						{initials}
					</div>
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-start">
						<h3 className="font-medium text-gray-800 truncate">
							{review.name}
						</h3>
						<span className="text-sm text-gray-500 whitespace-nowrap ml-2">
							{setDateAsDayMonthYear(review.date)}
						</span>
					</div>
					<div className="mb-2">
						<StarRating ratingValue={review.rating} size="sm" />
					</div>
					<p className="text-gray-700">
						<Toggler
							IS_TOG={isToggledState("reviewDetails")}
							TOG={() => toggleFunction("reviewDetails")}
							TEXT={review.comment}
							TRIM_LENGTH={50}
						/>
					</p>
					{isCurrentUser && (
						<div className="flex gap-3 m-0 p-0">
							<button
								type="button"
								onClick={onEdit}
								className=" text-sm text-red-600 hover:text-red-800 transition-colors">
								Delete your review
							</button>
							<button
								onClick={onEdit}
								className=" text-sm text-blue-600 hover:text-blue-800 transition-colors">
								Edit your review
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
