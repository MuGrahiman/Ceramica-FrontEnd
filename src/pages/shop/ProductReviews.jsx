import PropTypes from "prop-types";
import TabSwitcher from "../../components/TabSwitcher";
import ReviewFormTab from "./ReviewFormTab";
import useReview from "../../hooks/useReview";
import ReviewsListTab from "./ReviewsListTab";
import RateCount from "./RateCount";
import useToggle from "../../hooks/useToggle";
import { createDefaultState } from "../../utils/generals";
import { REVIEW_TABS } from "../../constants/toggle";
import { useCallback, useMemo } from "react";

/**
 * Displays Product ratings and reviews.
 *
 * @param {Object} props
 * @param {string} props.productId - Product ID being reviewed
 */
const ProductReviews = ({ productId = "" }) => {
	/**
	 * Creates default state for tab toggling
	 * @param {string} activeTab - The tab to activate
	 * @returns {Object} Default state object
	 */
	const getDefaultState = useCallback(
		(activeTab) =>
			createDefaultState(Object.values(REVIEW_TABS), false, {
				[activeTab]: true,
			}),
		[]
	);

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

	const [, isToggledTab, resetToggleState, toggledTabState] = useToggle(
		getDefaultState(REVIEW_TABS.LIST_REVIEWS)
	);

	const tabs = useMemo(
		() => [
			{
				label: "Customers Review",
				key: REVIEW_TABS.LIST_REVIEWS,
			},
			{
				label: currentUserReview ? "Your Review" : "Add Your Review",
				key: REVIEW_TABS.ADD_REVIEW,
			},
		],
		[currentUserReview]
	);

	const activeTab = useMemo(
		() => Object.keys(toggledTabState).find(isToggledTab),
		[toggledTabState, isToggledTab]
	);

	const isReviewsListLoading = useMemo(
		() =>
			productReviewsLoading ||
			productReviewsFetching ||
			deleteReviewResult.isLoading,
		[
			productReviewsLoading,
			productReviewsFetching,
			deleteReviewResult.isLoading,
		]
	);
	// Default form values for review form
	const defaultFormValues = useMemo(
		() => currentUserReview || { rating: 0, review: "" },
		[currentUserReview]
	);

	/**
	 * Handles tab switching
	 * @param {string} tab - Tab key to switch to
	 */
	const handleToggle = useCallback(
		(tab) => {
			const defaultState = getDefaultState(tab);
			resetToggleState(defaultState);
		},
		[getDefaultState, resetToggleState]
	);

	/**
	 * Handles review submission and tab switching
	 * @param {Object} reviewData - {rating: number, review: string}
	 * @param {string} action - 'add' | 'edit'
	 * @returns {Promise<void>}
	 */
	const handleSubmit = useCallback(
		async (reviewData, action) => {
			const onSuccess = (msg) => {
				handleToggle(REVIEW_TABS.LIST_REVIEWS);
				return msg;
			};
			await handleReviewSubmission(reviewData, action, onSuccess);
		},
		[handleReviewSubmission, handleToggle]
	);

	return (
		<div
			role="region"
			aria-label="Product reviews and ratings"
			className="my-4 mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-2">
				Ratings & Reviews
			</h2>
			{/* Ratings Summary */}
			<RateCount
				isLoading={avgProductReviewsLoading}
				average={avgProductReviews?.average}
				count={avgProductReviews?.count}
			/>
			{/* Navigation Tab  */}
			<TabSwitcher
				tabs={tabs}
				activeTab={activeTab}
				isToggledTab={isToggledTab}
				onSelectTab={handleToggle}
			/>
			{/* Tab Content */}
			<div className="relative min-h-[200px] mt-4">
				{/* Reviews List Tab */}
				{isToggledTab(REVIEW_TABS.LIST_REVIEWS) && (
					<ReviewsListTab
						isLoading={isReviewsListLoading}
						reviews={
							productReviews && productReviews.length ? productReviews : []
						}
						onDelete={handleReviewDeletion}
						onAddOrEdit={() => handleToggle(REVIEW_TABS.ADD_REVIEW)}
					/>
				)}
				{/* Add/Edit Review Tab */}
				{isToggledTab(REVIEW_TABS.ADD_REVIEW) && (
					<ReviewFormTab
						onSubmit={handleSubmit}
						onCancel={() => handleToggle(REVIEW_TABS.LIST_REVIEWS)}
						defaultFormValues={defaultFormValues}
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
