import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";


const baseQuery = axiosBaseQuery( {
	baseUrl: `/api/stripe`,
} );

const stripeApi = createApi( {
	reducerPath: "stripeApi",
	baseQuery,
	tagTypes: [ "Stripe" ],
	endpoints: ( builder ) => ( {

        createPaymentIntent: builder.mutation({
            query: (amount) => ({
              url: '/create-payment-intent',
              method: 'POST',
              body: { amount },
            }),
          }),

	} ),
} );

export const {
useCreatePaymentIntentMutation
} = stripeApi;
export default stripeApi;
