import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

// Base query configuration
const baseQuery = axiosBaseQuery( {
  baseUrl: `/api/order`,
} );

// Create the API slice
const orderApi = createApi( {
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: [ "Order" ],
  endpoints: ( builder ) => ( {

    // Create an order
    createOrder: builder.mutation( {
      query: ( orderData ) => ( {
        url: "/create-order",
        method: "POST",
        body: orderData, // { addressId, items, totalAmount,currency }
      } ),
      invalidatesTags: [ "Order" ],
    } ),

    // Capture Payment
    capturePayment: builder.mutation( {
      query: ( orderData ) => ( {
        url: "/capture-order",
        method: "POST",
        body: orderData, // { orderID, payerID, paymentID,paymentSource }
      } ),
      invalidatesTags: [ "Order" ],
    } ),

    // Get an order by ID
    getOrderById: builder.query( {
      query: ( orderId ) => ( {
        url: `/get/${ orderId }`,
        method: "GET",
      } ),
      providesTags: ( result, error, orderId ) => [ { type: "Order", id: orderId } ],
    } ),

    // Get all orders for a user
    getOrdersByUser: builder.query( {
      query: ( userId ) => ( {
        url: "/get",
        method: "GET",
        // params: { userId }, // Pass userId as a query parameter
      } ),
      providesTags: ( result ) =>
        result
          ? [
            ...result.map( ( { id } ) => ( { type: "Order", id } ) ),
            { type: "Order", id: "LIST" },
          ]
          : [ { type: "Order", id: "LIST" } ],
    } ),

    // Update the status of an order
    updateOrderStatus: builder.mutation( {
      query: ( { orderId, status } ) => ( {
        url: `/update/${ orderId }`,
        method: "PATCH",
        body: { status }, // Pass the new status in the request body
      } ),
      invalidatesTags: ( result, error, { orderId } ) => [ { type: "Order", id: orderId } ],
    } ),
  } ),
} );

// Export hooks for usage in components
export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,useCapturePaymentMutation,
  useGetOrdersByUserQuery,
  useUpdateOrderStatusMutation,
} = orderApi;

// Export the API slice
export default orderApi;