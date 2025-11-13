import React, { useEffect, useMemo, useState } from 'react';
import {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetProductRatingStatsQuery,
    useGetProductReviewsQuery,
    useUpdateReviewMutation
} from '../redux/store';
import useApiHandler from './useApiHandler';
import { useAuth } from './useAuth';
import { REVIEW_FORM_ACTIONS } from '../constants/product';
import { isValidId } from '../utils/generals';
import { extractErrorMessage } from '../utils/errorHandlers';

/**
 * Custom hook for managing product reviews
 * @param {string|null} productId - ID of the product being reviewed
 * @returns {Object} - Review state and handlers
 * @property {Array} productReviews - List of all reviews
 * @property {Object} currentUserReview - Current user's review (if exists)
 * @property {Object} avgProductReviews - {average: number, count: number}
 * @property {boolean} productReviewsLoading - Initial loading state
 * @property {boolean} productReviewsFetching - Subsequent loading state
 * @property {function} handleReviewSubmission - (reviewData, action, onSuccess) => Promise<void>
 * @property {function} handleReviewDeletion - () => Promise<void>
 */
const useReview = ( productId = null ) => {
    const [ handleLoginMutation ] = useApiHandler();
    const { isAuthorized, currentUser, validateAuthentication } = useAuth( "client" );

    // --- State Management ---
    const [ productReviews, setProductReviews ] = useState( [] );
    const [ avgProductReviews, setAvgProductReviews ] = useState( {} );

    // --- API Queries ---
    const {
        data: reviews,
        isLoading: productReviewsLoading,
        isFetching: productReviewsFetching,
        error: productReviewsError,
    } = useGetProductReviewsQuery( productId, {
        skip: !isAuthorized || !isValidId( productId )
    } );

    const {
        data: avgReview,
        isLoading: avgProductReviewsLoading,
        error: avgProductReviewsError
    } = useGetProductRatingStatsQuery( productId, {
        skip: !isAuthorized || !isValidId( productId )
    } );

    // --- API Mutations ---
    const [ addReview, addReviewResult ] = handleLoginMutation( useAddReviewMutation );
    const [ updateReview, updateReviewResult ] = handleLoginMutation( useUpdateReviewMutation );
    const [ deleteReview, deleteReviewResult ] = handleLoginMutation( useDeleteReviewMutation );

    // --- Effects ---
    useEffect( () => {
        setProductReviews( reviews?.length ? reviews : [] );
    }, [ reviews ] );

    useEffect( () => {
        setAvgProductReviews( avgReview ? avgReview : {} );
    }, [ avgReview ] );

    // --- Current User Review ---
    const currentUserReview = useMemo( () => {
        return currentUser?._id && productReviews?.length
            ? productReviews.find( ( review ) => review.userId._id === currentUser._id )
            : null;
    }, [ currentUser, productReviews ] );

    // --- Action Handlers ---
    /**
     * Handles review submission (create/update)
     * @param {Object} reviewData - {rating: number, review: string}
     * @param {string} action - REVIEW_FORM_ACTIONS.ADD_REVIEW or EDIT_REVIEW
     * @param {function} onSuccess - Callback on successful submission
     */
    const handleReviewSubmission = async ( reviewData = {}, action = '', onSuccess = () => { } ) => {
        if ( !validateAuthentication() ) return;

        if ( action === REVIEW_FORM_ACTIONS.EDIT_REVIEW ) {
            await updateReview(
                {
                    reviewId: currentUserReview._id,
                    ...reviewData
                },
                {
                    onSuccess: () => onSuccess( 'Review updated successfully' ),
                    onError: ( err ) =>
                        extractErrorMessage( err, "Failed to update review" )

                }
            );
        }
        else if ( action === REVIEW_FORM_ACTIONS.ADD_REVIEW ) {
            await addReview(
                {
                    productId,
                    ...reviewData
                },
                {
                    onSuccess: () => onSuccess( 'Review added successfully' ),
                    onError: ( err ) =>
                        extractErrorMessage( err, "Failed to add review" )
                }
            );
        }

    };

    /**
     * Handles review deletion
     * @returns {Promise<string>} - Success/error message
     */

    const handleReviewDeletion = async () => {
        if ( !validateAuthentication() ) return;
        await deleteReview(
            currentUserReview._id,
            {
                onSuccess: () => 'Review deleted successfully',
                onError: ( err ) =>
                    extractErrorMessage( err, "Failed to delete review" )
            }
        );
    }

    // --- Return Value ---
    return {
        // Data
        productReviews,
        currentUserReview,
        avgProductReviews,

        // Loading States
        productReviewsLoading,
        productReviewsFetching,
        avgProductReviewsLoading,

        // Errors
        productReviewsError,
        avgProductReviewsError,

        // Handlers
        handleReviewSubmission,
        handleReviewDeletion,

        // Raw mutation results (for debugging)
        addReviewResult,
        updateReviewResult,
        deleteReviewResult
    };
};

export default useReview;