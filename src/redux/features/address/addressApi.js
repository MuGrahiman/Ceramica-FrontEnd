import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";


const baseQuery = axiosBaseQuery( {
	baseUrl: `/api/address`,
} );

const addressApi = createApi( {
	reducerPath: "addressApi",
	baseQuery,
	tagTypes: [ "Address" ],
	endpoints: ( builder ) => ( {

		getAddresses: builder.query( {
			query: () =>
			( {
				url: '/get',
				method: 'GET',

			} )
			,
			providesTags: [ "Address" ],
		} ),

		addAddress: builder.mutation( {
			query: ( data ) => {

				return (
					{
						url: `/add`,
						method: "POST",
						body: data,
					} )
			},
			invalidatesTags: [ "Address" ],
		} ),

		updateAddress: builder.mutation( {
			query: ( { addressId, data } ) => {
				return {
					url: `/update/${ addressId }`,

					method: "PUT",
					body: data,
					headers: {
						"Content-Type": "application/json",
					},
				}
			},
			invalidatesTags: [ "Address" ],
		} ),

		setDefaultAddress: builder.mutation( {
			query: ( { addressId } ) => {
				return {
					url: `/update/${ addressId }`,
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
				}
			},
			invalidatesTags: [ "Address" ],
		} ),

		deleteAddress: builder.mutation( {
			query: ( addressId ) => ( {
				url: `/delete`,
				method: "DELETE",
				body: { addressId },
			} ),
			invalidatesTags: [ "Address" ],
		} ),

	} ),
} );

export const {
	useAddAddressMutation,
	useDeleteAddressMutation,
	useSetDefaultAddressMutation,
	useUpdateAddressMutation, 
	useGetAddressesQuery
} = addressApi;
export default addressApi;
