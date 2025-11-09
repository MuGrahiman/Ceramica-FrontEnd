import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP, BASE_URL } from "../../../constants/app";

const baseQuery = fetchBaseQuery( {
	baseUrl: `${ BASE_URL }/api/auth`,
	credentials: "include",
	prepareHeaders: ( Headers ) => {

		const jsonValue = localStorage.getItem( APP );
		if ( jsonValue ) {
			try {
				const { token } = JSON.parse( jsonValue );
				if ( token ) {
					// headers.set("Authorization", `Bearer ${token}`);
					Headers.set( "authorization", `Bearer ${ token }` );
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
		forgotPassword: builder.mutation( {
			query: ( userMail ) => ( {
				url: `/forgot-password`,
				method: "POST",
				body: userMail,
			} ),
			// invalidatesTags: [ "Users" ],
		} ),
		resetPassword: builder.mutation( {
			query: ( { token, passwords } ) => ( {
				url: `/reset-password/${ token }`,
				method: "POST",
				body: passwords,
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		updateUserStatus: builder.mutation( {
			query: ( { id, status } ) => ( {
				url: `/edit/status/${ id }`,
				method: "PATCH",
				body: { status },
				headers: {
					"Content-Type": "application/json",
				},
			} ),
			invalidatesTags: [ "Users" ],
		} ),
		updateUser: builder.mutation( {
			query: ( data ) => ( {
				url: `/edit`,
				method: "PUT",
				body: data,
			} ),
			invalidatesTags: [ "Users" ]
		} ),
		updateUserPassword: builder.mutation( {
			query: ( data ) => ( {
				url: `/change-password`,
				method: "POST",
				body: data,
			} ),
			invalidatesTags: [ "Users" ]
		} ),
	} ),
} );

export const {
	useFetchAllUsersQuery,
	useFetchUserByIdQuery,
	useLoginUserMutation,
	useRegisterUserMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useUpdateUserStatusMutation,
	useUpdateUserMutation,
	useUpdateUserPasswordMutation,
} = usersApi;
export default usersApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import getBaseUrl from "../../../utils/baseUrl";
// import { APP } from "../../../constants/app";

// const baseQuery = fetchBaseQuery( {
// 	baseUrl: `${ getBaseUrl() }/api/auth`,
// 	credentials: "include",
// 	prepareHeaders: ( headers ) => {
// 		// Retrieve token securely
// 		const appData = localStorage.getItem( APP );

// 		if ( appData ) {
// 			try {
// 				const { token } = JSON.parse( appData );
// 				if ( token ) {
// 					headers.set( "Authorization", `Bearer ${ token }` );
// 				}
// 			} catch ( error ) {
// 				console.error( "Failed to parse app data from localStorage:", error );
// 			}
// 		}

// 		return headers;
// 	},
// } );

// const endpointPaths = {
// 	fetchUsers: "/get",
// 	fetchUserById: ( id ) => `/get/${ id }`,
// 	signUp: "/sign-up",
// 	signIn: "/sign-in",
// 	forgotPassword: "/forgot-password",
// 	updateStatus: ( id ) => `/edit/status/${ id }`,
// 	updateUser: ( id ) => `/edit/${ id }`,
// };

// const usersApi = createApi( {
// 	reducerPath: "userApi",
// 	baseQuery,
// 	tagTypes: [ "Users" ],
// 	endpoints: ( builder ) => ( {
// 		fetchAllUsers: builder.query( {
// 			query: ( { searchTerm = "", sort = "", status = [] } ) => {
// 				const params = {};

// 				// Only set parameters if they exist
// 				if ( searchTerm ) params.searchTerm = searchTerm;
// 				if ( sort ) params.sort = sort;
// 				if ( status.length ) params.status = status;

// 				return {
// 					url: endpointPaths.fetchUsers,
// 					method: "GET",
// 					params, // Only relevant params will be added
// 				};
// 			},
// 			providesTags: ( result ) =>
// 				result
// 					? [
// 						...result.map( ( { id } ) => ( { type: "Users", id } ) ),
// 						{ type: "Users", id: "LIST" },
// 					]
// 					: [ { type: "Users", id: "LIST" } ],
// 		} ),

// 		fetchUserById: builder.query( {
// 			query: ( id ) => endpointPaths.fetchUserById( id ),
// 			providesTags: ( result, error, id ) => {
// 				alert( 'fetch user ' + id )
// 				return [ { type: "Users", id } ]
// 			},
// 		} ),

// 		registerUser: builder.mutation( {
// 			query: ( newUser ) => ( {
// 				url: endpointPaths.signUp,
// 				method: "POST",
// 				body: newUser,
// 			} ),
// 			invalidatesTags: [ { type: "Users", id: "LIST" } ],
// 		} ),

// 		loginUser: builder.mutation( {
// 			query: ( userData ) => ( {
// 				url: endpointPaths.signIn,
// 				method: "POST",
// 				body: userData,
// 			} ),
// 			invalidatesTags: [ { type: "Users", id: "LIST" } ],
// 		} ),

// 		forgotUser: builder.mutation( {
// 			query: ( userMail ) => ( {
// 				url: endpointPaths.forgotPassword,
// 				method: "POST",
// 				body: userMail,
// 			} ),
// 			invalidatesTags: [ { type: "Users", id: "LIST" } ],
// 		} ),

// 		updateUserStatus: builder.mutation( {
// 			query: ( { id, status } ) => ( {
// 				url: endpointPaths.updateStatus( id ),
// 				method: "PATCH",
// 				body: { status },
// 			} ),
// 			invalidatesTags: ( result, error, { id } ) => [ { type: "Users", id } ],
// 		} ),

// 		updateUser: builder.mutation( {
// 			query: ( { id, data } ) => ( {
// 				url: endpointPaths.updateUser( id ),
// 				method: "PUT",
// 				body: data,
// 			} ),
// 			invalidatesTags: ( result, error, { id } ) => {
// 				alert( 'update user ' + id )
// 				return [ { type: "Users", id } ]
// 			}
// 		} ),
// 	} ),
// } );

// export const {
// 	useFetchAllUsersQuery,
// 	useFetchUserByIdQuery,
// 	useLoginUserMutation,
// 	useRegisterUserMutation,
// 	useForgotUserMutation,
// 	useUpdateUserStatusMutation,
// 	useUpdateUserMutation,
// } = usersApi;

// export default usersApi;
