import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery( {
	baseUrl: `${ getBaseUrl() }/api/inventory`,
	credentials: "include",
	prepareHeaders: ( Headers ) => {
		const token = localStorage.getItem( "token" );
		if ( token ) {
			Headers.set( "Authorization", `Bearer ${ token }` );
		}
		return Headers;
	},
} );

const inventoryApi = createApi( {
	reducerPath: "inventoryApi",
	baseQuery,
	tagTypes: [ "Inventory" ],
	endpoints: ( builder ) => ( {

		getInventoryItems: builder.query( {
			query: ({ page = 1, limit = 10 }) =>  `/get?page=${page}&limit=${limit}`,
			providesTags: [ "Inventory" ],
		} ),

		getInventoryItemById: builder.query( {
			query: ( id ) => `/get/${ id }`,
			providesTags: ( result, error, id ) => [ { type: "Inventory", id } ],
		} ),

		addToInventory: builder.mutation( {
			query: ( newBook ) => ( {
				url: `/add`,
				method: "POST",
				body: newBook,
			} ),
			invalidatesTags: [ "Inventory" ],
		} ),

		updateInventory: builder.mutation( {
			query: ( { id, ...rest } ) => ( {
				url: `/edit/${ id }`,
				method: "PUT",
				body: rest,
				headers: {
					"Content-Type": "application/json",
				},
			} ),
			invalidatesTags: [ "Inventory" ],
		} ),

		deleteInventory: builder.mutation( {
			query: ( id ) => ( {
				url: `/delete/${ id }`,
				method: "DELETE",
			} ),
			invalidatesTags: [ "Inventory" ],
		} ),

	} ),
} );

export const {
	useGetInventoryItemsQuery,
	useGetInventoryItemByIdQuery,
	useAddToInventoryMutation,
	useUpdateInventoryMutation,
	useDeleteInventoryMutation
} = inventoryApi;
export default inventoryApi;
