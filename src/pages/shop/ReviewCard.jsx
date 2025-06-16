import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import StarRating from "../../components/StarRating";
import Toggler from "../../components/Toggler";
import useToggle from "../../hooks/useToggle";
import { setDateAsDayMonthYear } from "../../utils/date";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { DUMMY_IMAGE } from "../../constants/app";
import { handleFileError } from "../../utils/fileHandler";

/**
 * Displays an individual product review details .
 *
 * @param {Object} props
 * @param {Object} props.review - Review data object (required)
 * @param {boolean} [props.isCurrentUser=false] - Whether review belongs to current user
 * @param {function} [props.onEdit] - Edit button callback
 * @param {function} [props.onDelete] - Delete button callback
 */
const ReviewCard = ({
	review = {},
	isCurrentUser = false,
	onEdit = () => {},
	onDelete = () => {},
}) => {
	const [toggleFunction, isToggledState] = useToggle();

	return (
		<div
			className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 animate-fadeIn"
			role="article">
			<div className="md:flex items-start gap-3 mb-3">
				<img
					className="h-10 w-10 object-cover rounded-full border border-gray-500"
					src={review?.userId?.profilePhoto?.url || DUMMY_IMAGE}
					alt={review?.userId?.profilePhoto?.public_id || "User profile"}
					onError={handleFileError}
					loading="lazy"
				/>
				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-start">
						<h3
							className="font-medium text-gray-800 truncate"
							aria-label={`Review by ${review.userId.firstName} ${review.userId.lastName}`}>
							{review.userId.firstName} {review.userId.lastName}
						</h3>
						<time
							className="text-sm text-gray-500 whitespace-nowrap ml-2"
							dateTime={review.updatedAt}>
							{setDateAsDayMonthYear(review.updatedAt)}
						</time>
					</div>
					<div className="mb-2">
						<StarRating
							ratingValue={review.rating}
							size="sm"
							ariaLabel={`Rated ${review.rating} out of 5 stars`}
						/>
					</div>
					<Toggler
						IS_TOG={isToggledState("reviewDetails")}
						TOG={() => toggleFunction("reviewDetails")}
						TEXT={review?.review}
						TRIM_LENGTH={50}
					/>
					{isCurrentUser && (
						<div className="flex gap-3">
							<Button
								icon={<MdDeleteOutline className="h-5 w-5" />}
								onClick={onDelete}
								text="Delete your review"
								color="red"
							/>
							<Button
								icon={<MdModeEditOutline className="h-5 w-5" />}
								onClick={onEdit}
								text="Edit your review"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

ReviewCard.propTypes = {
	review: PropTypes.shape({
		userId: PropTypes.shape({
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			profilePhoto: PropTypes.shape({
				url: PropTypes.string,
				public_id: PropTypes.string,
			}),
		}).isRequired,
		rating: PropTypes.number.isRequired,
		review: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
	}).isRequired,
	isCurrentUser: PropTypes.bool,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

/**
 * Action button component for review cards.
 * @param {Object} props
 * @param {function} props.onClick - Click handler
 * @param {string} [props.color="blue"] - Color variant
 * @param {string} props.text - Button text
 * @param {ReactNode} props.icon - Button icon
 */
const Button = ({
	onClick = () => {},
	color = "blue",
	text = "",
	icon = null,
}) => {
	const colorVariants = {
		blue: "text-blue-400 hover:text-blue-600",
		red: "text-red-400 hover:text-red-600",
	};
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex items-center justify-center text-sm ${colorVariants[color]} transition-colors`}
			aria-label={text}>
			{icon}
			<p className="hidden md:block p-0 m-0">{text}</p>
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	color: PropTypes.oneOf(["blue", "red", "green"]),
	text: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

export default ReviewCard;
