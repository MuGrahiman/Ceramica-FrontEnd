import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/users/userSlice";
import usersApi from "./features/users/usersApi";
import otpApi from "./features/otp/otpApi.js";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";
import inventoryApi from "./features/inventory/inventoryApi.js";
import wishListApi from "./features/wishlist/wishListApi.js";
import cartApi from "./features/cart/cartApi.js";
import addressApi from "./features/address/addressApi.js";
import stripeApi from "./features/stripe/stripeApi.js";
import orderApi from "./features/order/orderApi";
import couponApi from "./features/coupon/couponApi";
import couponReducer from "./features/coupon/couponSlice";
import orderReducer from "./features/orders/orderSlice";
import paymentReducer from "./features/payment/paymentSlice.js";
import inquiryApi from "./features/inquiry/inquiryApi";
import reviewApi from "./features/reviews/reviewApi.js";

export const store = configureStore( {
	reducer: {
		// cart: cartReducer,
		auth: userReducer,
		payment: paymentReducer,
		coupon: couponReducer,
		order: orderReducer,
		[ usersApi.reducerPath ]: usersApi.reducer,
		[ otpApi.reducerPath ]: otpApi.reducer,
		[ booksApi.reducerPath ]: booksApi.reducer,
		[ ordersApi.reducerPath ]: ordersApi.reducer,
		[ inventoryApi.reducerPath ]: inventoryApi.reducer,
		[ wishListApi.reducerPath ]: wishListApi.reducer,
		[ cartApi.reducerPath ]: cartApi.reducer,
		[ addressApi.reducerPath ]: addressApi.reducer,
		[ stripeApi.reducerPath ]: stripeApi.reducer,
		[ orderApi.reducerPath ]: orderApi.reducer,
		[ couponApi.reducerPath ]: couponApi.reducer,
		[ inquiryApi.reducerPath ]: inquiryApi.reducer,
		[ reviewApi.reducerPath ]: reviewApi.reducer,
	},
	middleware: ( getDefaultMiddleware ) =>
		getDefaultMiddleware().concat(
			usersApi.middleware,
			otpApi.middleware,
			booksApi.middleware,
			ordersApi.middleware,
			inventoryApi.middleware,
			wishListApi.middleware,
			cartApi.middleware,
			addressApi.middleware,
			stripeApi.middleware,
			orderApi.middleware,
			couponApi.middleware,
			inquiryApi.middleware,
			reviewApi.middleware,
		),
} );

setupListeners( store.dispatch );

export * from "./features/users/usersApi.js";
export * from "./features/otp/otpApi";
export * from "./features/books/booksApi";
export * from "./features/inventory/inventoryApi";
export * from "./features/wishlist/wishListApi.js";
export * from "./features/cart/cartApi.js";
export * from "./features/address/addressApi.js";
export * from "./features/orders/ordersApi";
export * from "./features/stripe/stripeApi.js";
export * from "./features/payment/paymentSlice.js";
export * from "./features/users/userSlice";
export * from "./features/coupon/couponApi";
export * from "./features/coupon/couponSlice";
export * from "./features/order/orderApi";
export * from "./features/orders/orderSlice";
export * from "./features/inquiry/inquiryApi";
export * from "./features/reviews/reviewApi.js";
