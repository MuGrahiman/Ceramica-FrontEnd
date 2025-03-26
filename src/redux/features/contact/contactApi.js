import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

const baseQuery = axiosBaseQuery({
    baseUrl: `/api/contact`,
});

const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery,
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        
        // Get all messages (with optional status filter)
        getMessages: builder.query({
            query: ({ status, searchTerm }) => ({
                url: '/get',
                method: 'GET',
                params: { 
                    status,
                    search: searchTerm 
                },
                credentials: 'include'
            }),
            providesTags: ['Contact'],
        }),
        
        // Get single message by ID
        getSingleMessage: builder.query({
            query: (messageId) => ({
                url: `/get/${messageId}`,
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Contact'],
        }),
        
        // Submit new contact message (public endpoint)
        submitMessage: builder.mutation({
            query: (messageData) => ({
                url: '/submit',
                method: 'POST',
                body: messageData,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['Contact'],
        }),
        
        // Update message (admin only)
        updateMessage: builder.mutation({
            query: ({ messageId, updateData }) => ({
                url: `/update/${messageId}`,
                method: 'PUT',
                body: updateData,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['Contact'],
        }),
        
        // Delete message (admin only)
        deleteMessage: builder.mutation({
            query: (messageId) => ({
                url: `/delete/${messageId}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Contact'],
        }),
        
        // Add admin notes to a message
        addAdminNotes: builder.mutation({
            query: ({ messageId, notes }) => ({
                url: `/update/${messageId}`,
                method: 'PATCH',
                body: { adminNotes: notes },
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['Contact'],
        }),
        
        // Update message status
        updateMessageStatus: builder.mutation({
            query: ({ messageId, status }) => ({
                url: `/update/${messageId}`,
                method: 'PATCH',
                body: { status },
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['Contact'],
        }),
    })
});

// Export hooks for usage in components
export const {
    useGetMessagesQuery,
    useGetSingleMessageQuery,
    useSubmitMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useAddAdminNotesMutation,
    useUpdateMessageStatusMutation
} = contactApi;

export default contactApi;