import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";
import { APP } from "../../../constants/app";

const baseQuery = fetchBaseQuery( {
	baseUrl: `${ getBaseUrl() }/api/auth`,
	credentials: "include",
	prepareHeaders: ( Headers ) => {

		const jsonValue = localStorage.getItem( APP );
		if ( jsonValue ) {
			try {
				const { token } = JSON.parse( jsonValue );
				if ( token ) {
					// headers.set("Authorization", `Bearer ${token}`);
					Headers.set( "Authorization", `Bearer ${ token }` );
				}
			} catch ( error ) {
				console.error( "Failed to parse APP data from localStorage:", error );
			}
		}

		return Headers;
	},
} );

const usersApi = createApi( {
	reducerPath: "userApi",
	baseQuery,
	tagTypes: [ "Users" ],
	endpoints: ( builder ) => ( {
		fetchAllUsers: builder.query( {
			query: ( {
				searchTerm = '', sort = '', status = []
			} ) => ( {
				url: '/get',
				method: 'GET',
				params: {
					searchTerm, sort, status
				},
			} ),
			providesTags: [ "Users" ],
		} ),
		fetchUserById: builder.query( {
			query: ( id ) => `get/${ id }`,
			providesTags: ( result, error, id ) => [ { type: "Users", id } ],
		} ),
		registerUser: builder.mutation( {
			query: ( newUser ) => ( {
				url: `/sign-up`,
				method: "POST",
				body: newUser,
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		loginUser: builder.mutation( {
			query: ( userData ) => ( {
				url: `/sign-in`,
				method: "POST",
				body: userData,
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		forgotUser: builder.mutation( {
			query: ( userMail ) => ( {
				url: `/forgot`,
				method: "POST",
				body: userMail,
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		updateUserStatus: builder.mutation( {
			query: ( { id, status } ) => ( {
				url: `/edit/${ id }`,
				method: "PUT",
				body: { status },
				headers: {
					"Content-Type": "application/json",
				},
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		// deleteUser: builder.mutation({
		//     query: (id) => ({
		//         url: `/${id}`,
		//         method: "DELETE"
		//     }),
		//     invalidatesTags: ["Users"]
		// })
	} ),
} );

export const {
	useFetchAllUsersQuery,
	useFetchUserByIdQuery,
	useLoginUserMutation,
	useRegisterUserMutation,
	useForgotUserMutation,
	useUpdateUserStatusMutation /*useDeleteUserMutation*/,
} = usersApi;
export default usersApi;
