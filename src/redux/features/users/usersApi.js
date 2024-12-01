import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/auth`,
	credentials: "include",
	prepareHeaders: (Headers) => {
		const token = localStorage.getItem("token");
		if (token) {
			Headers.set("Authorization", `Bearer ${token}`);
		}
		return Headers;
	},
});

const usersApi = createApi({
	reducerPath: "userApi",
	baseQuery,
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		fetchAllUsers: builder.query({
			query: () => "/",
			providesTags: ["Users"],
		}),
		fetchUserById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: "Users", id }],
		}),
		registerUser: builder.mutation({
			query: (newUser) => ({
				url: `/sign-up`,
				method: "POST",
				body: newUser,
			}),
			invalidatesTags: ["Users"],
		}),
		loginUser: builder.mutation({
			query: (existUser) => ({
				url: `/sign-in`,
				method: "POST",
				body: existUser,
			}),
			invalidatesTags: ["Users"],
		}),
		updateUser: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/edit/${id}`,
				method: "PUT",
				body: rest,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Users"],
		}),
		// deleteUser: builder.mutation({
		//     query: (id) => ({
		//         url: `/${id}`,
		//         method: "DELETE"
		//     }),
		//     invalidatesTags: ["Users"]
		// })
	}),
});

export const {
	useFetchAllUsersQuery,
	useFetchUserByIdQuery,
	useLoginUserMutation,
	useRegisterUserMutation,
	useUpdateUserMutation /*useDeleteUserMutation*/,
} = usersApi;
export default usersApi;
