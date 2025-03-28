import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

const baseQuery = axiosBaseQuery( {
    baseUrl: `/api/inquiry`,
} );

const inquiryApi = createApi( {
    reducerPath: 'inquiryApi',
    baseQuery,
    tagTypes: [ 'Inquiry' ],
    endpoints: ( builder ) => ( {

        // Get all inquiries (with optional status filter)
        getInquiries: builder.query( {
            query: ( { sort, status, searchTerm } ) => ( {
                url: '/get',
                method: 'GET',
                params: {
                    sort,
                    status,
                    search: searchTerm
                },
                credentials: 'include'
            } ),
            providesTags: [ 'Inquiry' ],
        } ),

        // Get single inquiry by ID
        getSingleInquiry: builder.query( {
            query: ( inquiryId ) => ( {
                url: `/get/${ inquiryId }`,
                method: 'GET',
                credentials: 'include'
            } ),
            providesTags: [ 'Inquiry' ],
        } ),

        // Submit new inquiry inquiry (public endpoint)
        submitInquiry: builder.mutation( {
            query: ( inquiryData ) => ( {
                url: '/submit',
                method: 'POST',
                body: inquiryData,
                headers: {
                    "Content-Type": "application/json",
                },
            } ),
            invalidatesTags: [ 'Inquiry' ],
        } ),

        // Update inquiry (admin only)
        replyInquiry: builder.mutation( {
            query: ( { inquiryId, replyData } ) => ( {
                url: `/reply/${ inquiryId }`,
                method: 'POST',
                body: replyData,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            } ),
            invalidatesTags: [ 'Inquiry' ],
        } ),

        // Delete inquiry (admin only)
        deleteInquiry: builder.mutation( {
            query: ( inquiryId ) => ( {
                url: `/delete/${ inquiryId }`,
                method: 'DELETE',
                credentials: 'include'
            } ),
            invalidatesTags: [ 'Inquiry' ],
        } ),

        // Add admin notes to a inquiry
        addAdminNotes: builder.mutation( {
            query: ( { inquiryId, notes } ) => ( {
                url: `/update/${ inquiryId }`,
                method: 'PATCH',
                body: { adminNotes: notes },
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            } ),
            invalidatesTags: [ 'Inquiry' ],
        } ),

        // Update inquiry status
        updateInquiryStatus: builder.mutation( {
            query: ( { inquiryId, status } ) => ( {
                url: `/update/${ inquiryId }`,
                method: 'PATCH',
                body: { status },
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            } ),
            invalidatesTags: [ 'Inquiry' ],
        } ),
    } )
} );

// Export hooks for usage in components
export const {
    useGetInquiriesQuery,
    useGetSingleInquiryQuery,
    useSubmitInquiryMutation,
    useReplyInquiryMutation,
    useDeleteInquiryMutation,
    useAddAdminNotesMutation,
    useUpdateInquiryStatusMutation
} = inquiryApi;

export default inquiryApi;