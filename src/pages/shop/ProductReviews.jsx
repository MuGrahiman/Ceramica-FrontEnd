import { useState } from "react";
import PropTypes from "prop-types";
import TabSwitcher from "../../components/TabSwitcher";
import ReviewFormTab from "./ReviewFormTab";
import { REVIEW_TABS } from "../../constants/product";
import useReview from "../../hooks/useReview";
import ReviewsListTab from "./ReviewsListTab";
import RateCount from "./RateCount";

/**
 * Displays Product ratings and reviews.
 *
 * @param {Object} props
 * @param {string} props.productId - Product ID being reviewed
 */
const ProductReviews = ({ productId = "" }) => {
	const {
		productReviews,
		productReviewsLoading,
		productReviewsFetching,
		currentUserReview,
		avgProductReviews,
		avgProductReviewsLoading,
		handleReviewSubmission,
		handleReviewDeletion,
		deleteReviewResult,
	} = useReview(productId);

	const [activeTab, setActiveTab] = useState(REVIEW_TABS.LIST_REVIEWS);

	/**
	 * Handles review submission and tab switching
	 * @param {Object} reviewData - {rating: number, review: string}
	 * @param {string} action - 'add' | 'edit'
	 * @returns {Promise<void>}
	 */
	const handleSubmit = async (reviewData, action) => {
		const onSuccess = (msg) => {
			setActiveTab(REVIEW_TABS.LIST_REVIEWS);
			return msg;
		};
		await handleReviewSubmission(reviewData, action, onSuccess);
	};

	return (
		<div className="my-4 mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-2">
				Ratings & Reviews
			</h2>
			<RateCount
				isLoading={avgProductReviewsLoading}
				average={avgProductReviews?.average}
				count={avgProductReviews?.count}
			/>
			<TabSwitcher
				tabs={[
					{
						label: `Customers Review `,
						key: REVIEW_TABS.LIST_REVIEWS,
					},
					{
						label: currentUserReview ? "Your Review" : "Add Your Review",
						key: REVIEW_TABS.ADD_REVIEW,
					},
				]}
				activeTab={activeTab}
				onSelectTab={setActiveTab}
			/>

			<div className="relative min-h-[200px] mt-4">
				{activeTab === REVIEW_TABS.LIST_REVIEWS && (
					<ReviewsListTab
						isLoading={
							productReviewsLoading ||
							productReviewsFetching ||
							deleteReviewResult.isLoading
						}
						reviews={
							productReviews && productReviews.length ? productReviews : []
						}
						onDelete={handleReviewDeletion}
						onAddOrEdit={() => setActiveTab(REVIEW_TABS.ADD_REVIEW)}
					/>
				)}
				{activeTab === REVIEW_TABS.ADD_REVIEW && (
					<ReviewFormTab
						onSubmit={handleSubmit}
						onCancel={() => setActiveTab(REVIEW_TABS.LIST_REVIEWS)}
						defaultFormValues={currentUserReview || { rating: 0, review: "" }}
					/>
				)}
			</div>
		</div>
	);
};
ProductReviews.propTypes = {
	productId: PropTypes.string.isRequired,
};
export default ProductReviews;
