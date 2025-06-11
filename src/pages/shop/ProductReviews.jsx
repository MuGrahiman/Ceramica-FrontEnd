import { useState, useEffect, useMemo } from "react";
import TabSwitcher from "../../components/TabSwitcher";
import ListOptions from "../../components/ListOptions";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import StarRating from "../../components/StarRating";
import { REVIEW_FORM_ACTIONS, REVIEW_TABS } from "../../constants/product";

/**
 * ProductReviews Component - Main review system with tabs
 *
 * @param {Object} props
 * @param {string} props.productId - Product ID being reviewed
 * @param {function} props.onSubmitReview - Callback for submitting reviews
 * @param {string} [props.currentUserId] - ID of current logged-in user
 */
const ProductReviews = ({ productId, onSubmitReview, currentUserId }) => {
	// Sample data - in a real app, this would come from props or API
	const [reviews, setReviews] = useState([
		{
			id: 1,
			userId: "user1",
			name: "Alex Johnson",
			rating: 5,
			comment: "Absolutely love this product! Exceeded my expectations.",
			date: "2023-10-15",
		},
		{
			id: 2,
			userId: "user2",
			name: "Sarah Miller",
			rating: 4,
			comment: "Great quality and fast shipping. Would recommend.",
			date: "2023-09-28",
		},
		{
			id: 3,
			userId: "user3",
			name: "Michael Chen",
			rating: 3,
			comment: "Good product but arrived later than expected.",
			date: "2023-09-10",
		},
		{
			id: 4,
			userId: "user4",
			name: "Emily Wilson",
			rating: 5,
			comment: "Perfect in every way. Will buy again!",
			date: "2023-08-22",
		},
		{
			id: 5,
			userId: "user5",
			name: "David Thompson",
			rating: 2,
			comment: "Not as durable as I hoped. Broke after 2 weeks.",
			date: "2023-08-15",
		},
	]);

	const [activeTab, setActiveTab] = useState(REVIEW_TABS.LIST_REVIEWS);
	const [editingReview, setEditingReview] = useState({});
	// const [userReview, setUserReview] = useState({ rating: 0, comment: "" });

	// Check if current user has already reviewed
	const userReview = useMemo(() => {
		return currentUserId
			? reviews.find((review) => review.userId === currentUserId)
			: {};
	}, [currentUserId, reviews]);

	// Set initial tab based on whether there are reviews
	useEffect(() => {
		if (reviews.length === 0 && !userReview) {
			setActiveTab(REVIEW_TABS.ADD_REVIEW);
		}
	}, [reviews.length, userReview]);

	// Handle review submission
	const handleSubmit = async (reviewData, action) => {
		// In a real app, you would call an API here
		const newReview = {
			id: editingReview?.id || Math.max(...reviews.map((r) => r.id), 0) + 1,
			userId: currentUserId,
			name: "Current User", // In real app, get from user profile
			rating: reviewData.rating,
			comment: reviewData.comment,
			date: new Date().toISOString().split("T")[0],
		};

		if (action === REVIEW_FORM_ACTIONS.EDIT_REVIEW) {
			// Update existing review
			setReviews(
				reviews.map((r) => (r.id === editingReview.id ? newReview : r))
			);
		} else {
			// Add new review
			setReviews([newReview, ...reviews]);
		}

		// Call the passed submit handler (for API calls in parent)
		if (onSubmitReview) {
			await onSubmitReview(newReview);
		}

		// Reset and switch to reviews tab
		// setEditingReview(null);
		setActiveTab(REVIEW_TABS.LIST_REVIEWS);
	};

	// Calculate average rating
	const averageRating =
		reviews.length > 0
			? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
			: 0;

	return (
		<div className="my-4 mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-2">
				Customers Feedback
			</h2>
			<div className="flex items-center mb-6">
				<StarRating ratingValue={averageRating} size="lg" />
				<span className="ml-2 text-gray-700">
					{reviews.length > 0
						? `${averageRating.toFixed(1)} based on ${reviews.length} review${
								reviews.length !== 1 ? "s" : ""
						  }`
						: "No reviews yet"}
				</span>
			</div>

			<TabSwitcher
				tabs={[
					{
						label: `Customer Reviews (${reviews.length})`,
						key: REVIEW_TABS.LIST_REVIEWS,
					},
					{
						label: userReview ? "Your Review" : "Add Your Review",
						key: REVIEW_TABS.ADD_REVIEW,
					},
				]}
				activeTab={activeTab}
				onSelectTab={setActiveTab}
			/>

			<div className="relative min-h-[200px] mt-4">
				{/* Reviews Tab */}
				{activeTab === REVIEW_TABS.LIST_REVIEWS ? (
					<div className="space-y-4 animate-fade-in">
						<ListOptions
							EMPTY_MESSAGE={
								"No reviews yet. Be the first to share your thoughts!"
							}
							OPTIONS={reviews}
							RENDER_ITEM={(review) => (
								<ReviewCard
									key={review.id}
									review={review}
									isCurrentUser={currentUserId === review.userId}
									onEdit={() => {
										// setEditingReview(review);
										setActiveTab(REVIEW_TABS.ADD_REVIEW);
									}}
								/>
							)}
						/>
					</div>
				) : (
					<ReviewForm
						onSubmit={handleSubmit}
						onCancel={() => setActiveTab(REVIEW_TABS.LIST_REVIEWS)}
						defaultFormValues={userReview || { rating: 0, comment: "" }}
					/>
				)}
			</div>
		</div>
	);
};

export default ProductReviews;
