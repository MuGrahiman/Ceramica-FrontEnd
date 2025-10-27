import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import StarRating from "../../components/StarRating";
import Toggler from "../../components/Toggler";
import useToggle, { useMiniToggler } from "../../hooks/useToggle";
import { setDateAsDayMonthYear } from "../../utils/date";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { DUMMY_IMAGE } from "../../constants/app";
import { handleFileError } from "../../utils/fileHandler";
// import { SHOP_REVIEW_DETAIL_CARD_TOGGLE_KEY } from "../../constants/toggle";

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
	const [isReviewToggle, toggleReview] = useMiniToggler();
	const {
		userId = {},
		rating = 0,
		review: reviewText = "",
		updatedAt = "",
	} = review;

	const { firstName = "", lastName = "", profilePhoto = {} } = userId;
	const userFullName = `${firstName} ${lastName}`.trim();
	const avatarUrl = profilePhoto?.url || DUMMY_IMAGE;
	const avatarAlt = profilePhoto?.public_id
		? `Profile photo of ${userFullName}`
		: "User profile photo";

	return (
		<div
			className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 animate-fadeIn"
			role="article"
			aria-labelledby={`review-by-${userId._id || "user"}`}>
			<div className="md:flex items-start gap-3 mb-3">
				{/* User Avatar */}
				<img
					className="h-10 w-10 object-cover rounded-full border border-gray-500"
					src={avatarUrl}
					alt={avatarAlt}
					onError={handleFileError}
					loading="lazy"
				/>
				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-start">
						{/* Header with Name and Date */}
						<h3
							className="font-medium text-gray-800 truncate"
							aria-label={`Review by ${userFullName}`}>
							{userFullName}
						</h3>
						<time
							className="text-sm text-gray-500 whitespace-nowrap ml-2"
							dateTime={updatedAt}>
							{setDateAsDayMonthYear(updatedAt)}
						</time>
					</div>
					{/* Star Rating */}
					<div className="mb-2">
						<StarRating
							ratingValue={rating}
							size="sm"
							ariaLabel={`Rated ${rating} out of 5 stars`}
						/>
					</div>
					{/* Review Message with Toggle */}
					<Toggler
						IS_TOG={isReviewToggle}
						TOG={toggleReview}
						TEXT={reviewText}
						TRIM_LENGTH={50}
					/>
					{/* Action Buttons for Current User */}
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

export default React.memo(ReviewCard);
