import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";
import { prepareHeaders, paramsSerializer } from "../../../utils/redux";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";


// const baseQuery = fetchBaseQuery( {
// 	baseUrl: `${ getBaseUrl() }/api/inventory`,
// 	credentials: "include",
// 	prepareHeaders,
// 	paramsSerializer
// } );


const baseQuery = axiosBaseQuery( {
	baseUrl: `/api/inventory`,
} );

const inventoryApi = createApi( {
	reducerPath: "inventoryApi",
	baseQuery,
	tagTypes: [ "Inventory" ],
	endpoints: ( builder ) => ( {

		getInventoryItems: builder.query( {
			query: ( {
				page = 1,
				limit = 10,
				category = [],
				size = [],
				sort = '',
				minPrice = '',
				maxPrice = '', search = ''
			} ) =>
			( {
				url: '/get',
				method: 'GET',
				params: {
					page, limit, category, size, maxPrice, minPrice, sort, search
				},
			} )
			,
			providesTags: [ "Inventory" ],
		} ),

		getInventoryItemById: builder.query( {
			query: ( id ) => ( {
				url: `/get/${ id }`,
				method: 'GET',
				params: {}, // Add any specific parameters if needed
			} ),
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
		patchInventory: builder.mutation( {
			query: ( { id, status } ) => {
				return {
					url: `/edit/${ id }`,
					method: "PATCH",
					body: { newData: { status } },
					headers: {
						"Content-Type": "application/json",
					},
				}
			},
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
	usePatchInventoryMutation,
	useDeleteInventoryMutation
} = inventoryApi;
export default inventoryApi;
