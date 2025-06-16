import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import Skeleton from "../../components/Skeleton";
import ListOptions from "../../components/ListOptions";
import ReviewCard from "./ReviewCard";
import { useAuth } from "../../hooks/useAuth";
import { FaArrowRight } from "react-icons/fa6";

/**
 * Displays the reviews of a product .
 *
 * @param {Object} props
 * @param {boolean} props.isLoading - Loading state flag
 * @param {Array} props.reviews - Array of review objects
 * @param {function} [props.onAddOrEdit] - Callback for add/edit actions
 * @param {function} [props.onDelete] - Callback for delete actions
 */
const ReviewsListTab = ({
	isLoading = false,
	reviews = [],
	onAddOrEdit = () => {},
	onDelete = () => {},
}) => {
	const { currentUser } = useAuth("client");

	return isLoading ? (
		<Skeleton />
	) : (
		<div className="space-y-4 animate-fade-in grid">
			<ListOptions
				EMPTY_MESSAGE={"No reviews yet. Be the first to share your thoughts!"}
				OPTIONS={reviews}
				RENDER_ITEM={(review) => (
					<ReviewCard
						key={review._id}
						review={review}
						isCurrentUser={currentUser?._id === review?.userId._id}
						onEdit={onAddOrEdit}
						onDelete={onDelete}
						ariaLabel={`Review by ${review.userId._id}`}
					/>
				)}
			/>
			{(!reviews || reviews.length === 0) && (
				<AddReviewButton onClick={onAddOrEdit} />
			)}
		</div>
	);
};

ReviewsListTab.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	reviews: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			userId: PropTypes.shape({
				_id: PropTypes.string.isRequired,
			}).isRequired,
		})
	),
	onAddOrEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

/**
 * Button component for adding new reviews.
 * @param {Object} props
 * @param {function} props.onClick - Click handler
 */
const AddReviewButton = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="w-fit mx-auto relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-blue-500 hover:text-white border-2 border-blue-500 rounded-lg hover:bg-blue-500 group"
			aria-label="Add a product review"
			role="button">
			<span className="absolute left-0 w-0 h-full transition-all duration-700 bg-blue-600 group-hover:w-full"></span>
			<span className="relative z-10 flex items-center gap-3">
				Add a Review
				<FaArrowRight className="hidden group-hover:block animate-slide-in-left transition-all duration-700" />
			</span>
		</button>
	);
};

AddReviewButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default ReviewsListTab;
