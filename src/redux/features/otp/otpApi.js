import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/otp`,
	credentials: "include",
	// prepareHeaders: (Headers) => {
	//     const token =  localStorage.getItem('token');
	//     if(token) {
	//         Headers.set('Authorization', `Bearer ${token}`);
	//     }
	//     return Headers;
	// }
});

const otpApi = createApi({
	reducerPath: "otpApi",
	baseQuery,
	tagTypes: ["OTP"],
	endpoints: (builder) => ({
		sendOTP: builder.query({
			query: (userId) => `/${userId}`,
			providesTags: ["OTP"],
		}),
		verifyOTP: builder.mutation({
			query: ({ otpId, otp }) => ({
			  url: `/${otpId}`,
			  method: "POST",
			  body: { otp }, // Wrap the OTP in an object
			}),
		  }),
		  
		resendOTP: builder.mutation({
			query: (otpId) => ({
				url: `/${otpId}`,
				method: "PUT",
			}),
			invalidatesTags: ["OTP"],
		}),
	}),
});

export const { useSendOTPQuery, useResendOTPMutation, useVerifyOTPMutation } =
	otpApi;
export default otpApi;
