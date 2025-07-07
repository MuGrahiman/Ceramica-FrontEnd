import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

const baseQuery = axiosBaseQuery( {
    baseUrl: "/api/reviews"
} );

export const reviewApi = createApi( {
    reducerPath: "reviewApi",
    baseQuery,
    tagTypes: [ "Review" ],
    endpoints: ( builder ) => ( {

        // Get all reviews of a product
        getProductReviews: builder.query( {
            query: ( productId ) => {
                return ( {
                    url: `/${ productId }`,
                    method: 'GET',

                } )
            },
            providesTags: ( result, error, productId ) => [
                { type: "Review", id: productId }
            ],
        } ),

        // Get current user review for a product
        getUserProductReviews: builder.query( {
            query: ( productId ) => {
                return ( {
                    url: `/user/product/${ productId }`,
                    method: 'GET',

                } )
            },
            providesTags: ( result, error, productId ) => [
                { type: "Review", id: productId }
            ],
        } ),

        // Get rating stats for a product
        getProductRatingStats: builder.query( {
            query: ( productId ) => {
                return ( {
                    url: `/${ productId }/stats`,
                    method: 'GET',

                } )
            },
            providesTags: ( result, error, productId ) => [
                { type: "ReviewStats", id: productId }
            ],
        } ),

        // Add a new review
        addReview: builder.mutation( {
            query: ( { productId, rating, review } ) => ( {
                url: "/add",
                method: "POST",
                body: { productId, rating, review },
            } ),
            invalidatesTags: ( result, error, { productId } ) => [
                { type: "Review", id: productId },
                { type: "ReviewStats", id: productId }
            ],
        } ),

        // Update a review
        updateReview: builder.mutation( {
            query: ( { reviewId, rating, review } ) => ( {
                url: `/edit/${ reviewId }`,
                method: "PUT",
                body: { rating, review },
            } ),
            // invalidatesTags: [ "Review", "ReviewStats" ],

            invalidatesTags: ( result, error, { productId } ) => [
                { type: "Review", id: productId },
                { type: "ReviewStats", id: productId }

            ],
        } ),

        // Delete a review
        deleteReview: builder.mutation( {
            query: ( reviewId ) => ( {
                url: `/delete/${ reviewId }`,
                method: "DELETE",
            } ),
            invalidatesTags: [ "Review", "ReviewStats" ],
        } ),
    } ),
} );

// Export hooks for usage in components
export const {
    useGetProductReviewsQuery,
    useGetUserProductReviewsQuery,
    useGetProductRatingStatsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;