import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";


const baseQuery = axiosBaseQuery( {
	baseUrl: `/api/cart`,
} );

const cartApi = createApi( {
	reducerPath: "cartApi",
	baseQuery,
	tagTypes: [ "Cart" ],
	endpoints: ( builder ) => ( {

		getCartItems: builder.query( {
			query: () =>
			( {
				url: '/get',
				method: 'GET',

			} )
			,
			providesTags: [ "Cart" ],
		} ),

		addToCart: builder.mutation( {
			query: ( { productId, quantity } ) => {

				return (
					{
						url: `/add`,
						method: "POST",
						body: { productId, quantity },
					} )
			},
			invalidatesTags: [ "Cart" ],
		} ),

		updateCart: builder.mutation( {
			query: ( { productId, quantity } ) => {
				return {
					url: `/update`,
					method: "PATCH",
					body: { productId, quantity },
					headers: {
						"Content-Type": "application/json",
					},
				}
			},
			invalidatesTags: [ "Cart" ],
		} ),

		removeFromCart: builder.mutation( {
			query: ( cartId ) => ( {
				url: `/remove`,
				method: "DELETE",
				body: { cartId },
			} ),
			invalidatesTags: [ "Cart" ],
		} ),

		clearCart: builder.mutation( {
			query: () => ( {
				url: `/delete-all`, 
				method: "DELETE",
			} ),
			invalidatesTags: [ "Cart" ],
		} ),
	} ),
} );

export const {
	useGetCartItemsQuery,
	useAddToCartMutation,
	useUpdateCartMutation,
	useRemoveFromCartMutation,
	useClearCartMutation
} = cartApi;
export default cartApi;
