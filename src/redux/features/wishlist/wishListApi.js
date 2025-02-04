import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";


const baseQuery = axiosBaseQuery( {
	baseUrl: `/api/wishlist`,
} );

const wishListApi = createApi( {
	reducerPath: "wishListApi",
	baseQuery,
	tagTypes: [ "WishList" ],
	endpoints: ( builder ) => ( {

		getWishlistItems: builder.query( {
			query: () =>
			( {
				url: '/get',
				method: 'GET',

			} )
			,
			providesTags: [ "WishList" ],
		} ),

		addToWishList: builder.mutation( {
			query: ( productId ) => {

				return (
					{
						url: `/add`,
						method: "POST",
						body: { productId },
					} )
			},
			invalidatesTags: [ "WishList" ],
		} ),

		removeFromWishList: builder.mutation( {
			query: ( productId ) => ( {
				url: `/remove`,
				method: "DELETE",
				body: { productId },
			} ),
			invalidatesTags: [ "WishList" ],
		} ),

	} ),
} );

export const {
	useGetWishlistItemsQuery,
	useAddToWishListMutation,
	useRemoveFromWishListMutation
} = wishListApi;
export default wishListApi;
