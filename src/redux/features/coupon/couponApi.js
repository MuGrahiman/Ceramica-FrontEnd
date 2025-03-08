import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

const baseQuery = axiosBaseQuery( {
    baseUrl: `/api/coupon`,
} );

const couponApi = createApi( {
    reducerPath: 'couponApi',
    baseQuery,
    tagTypes: [ 'Coupon' ],
    endpoints: ( builder ) => ( {
        createCoupon: ( builder.mutation )( {
            query: ( couponData ) => ( {
                url: "/create",
                method: "POST",
                body: couponData,
                credentials: 'include',
            } ),
            invalidatesTags: [ "Coupon" ],
        } ),
        getCoupons: builder.query( {
            query: ( searchTerm ) =>
            ( {
                url: '/get',
                method: 'GET',
                params: {
                    searchTerm
                },
            } )
            ,
            providesTags: [ "Coupon" ],
        } ),
        getSingleCoupon: builder.query( {
            query: ( couponId ) =>
            ( {
                url: `/get/${ couponId }`,
                method: 'GET',

            } )
            ,
            providesTags: [ "Coupon" ],
        } ),
        updateCoupon: builder.mutation( {
            query: ( { couponId, couponData } ) => {
                return {
                    url: `/update/${ couponId }`,
                    method: "PUT",
                    body: couponData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            },
            invalidatesTags: [ "Coupon" ],
        } ),
        updateCouponStatus: builder.mutation( {
            query: ( { couponId, couponData } ) => {
                return {
                    url: `/update/${ couponId }`,
                    method: "PATCH",
                    body: couponData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            },
            invalidatesTags: [ "Coupon" ],
        } ),

        deleteCoupon: builder.mutation( {
            query: ( couponId ) => ( {
                url: `/delete/${ couponId }`,
                method: "DELETE",
                // body: { cartId },
            } ),
            invalidatesTags: [ "Coupon" ],
        } ),
    } )
} )

export const {
    useCreateCouponMutation,
    useGetCouponsQuery,
    useGetSingleCouponQuery,
    useUpdateCouponMutation,
    useUpdateCouponStatusMutation,
    useDeleteCouponMutation
} = couponApi;

export default couponApi;