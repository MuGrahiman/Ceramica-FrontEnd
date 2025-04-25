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
    getOrderPaymentById: builder.query( {
      query: ( paymentId ) => ( {
        url: `/payment/${ paymentId }`,
        method: "GET",
      } ),
      providesTags: ( result, error, paymentId ) => [ { type: "Order", id: paymentId } ],
    } ),

    // Get all orders based users
    getOrdersByRole: builder.query( {
      query: ( role ) => (
        {
          url: `/get/${ role }`,
          method: "GET",
        } ),
      providesTags: ( result ) =>
        result
          ? [
            ...result.map( ( { id } ) => ( { type: "Order", id } ) ),
            { type: "Order", id: "LIST" },
          ]
          : [ { type: "Order", id: "LIST" } ],
    } ),

    // Get an order by ID
    getOrderById: builder.query( {
      query: ( orderId ) => ( {
        url: `/get/${ orderId }`,
        method: "GET",
      } ),
      providesTags: ( result, error, orderId ) => [ { type: "Order", id: orderId } ],
    } ),

    // Update the status of an order
    updateOrderStatus: builder.mutation( {
      query: ( { orderId, orderStatus } ) => ( {
        url: `/status/${ orderId }`,
        method: "PATCH",
        body: { status: orderStatus },
      } ),
      invalidatesTags: [ "Order" ],
    } ),
  } ),
} );

// Export hooks for usage in components
export const {
  useCreateOrderMutation,
  useCapturePaymentMutation,
  useGetOrderPaymentByIdQuery,
  useGetOrderByIdQuery,
  useGetOrdersByRoleQuery,
  useUpdateOrderStatusMutation,
} = orderApi;

// Export the API slice
export default orderApi;