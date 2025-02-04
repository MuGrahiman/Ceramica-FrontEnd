import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/users/userSlice";
import usersApi from "./features/users/usersApi";
import otpApi from "./features/otp/otpApi.js";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";
import inventoryApi from "./features/inventory/inventoryApi.js";
import wishListApi from "./features/wishlist/wishListApi.js";

export const store = configureStore( {
	reducer: {
		cart: cartReducer,
		auth: userReducer,
		[ usersApi.reducerPath ]: usersApi.reducer,
		[ otpApi.reducerPath ]: otpApi.reducer,
		[ booksApi.reducerPath ]: booksApi.reducer,
		[ inventoryApi.reducerPath ]: inventoryApi.reducer,
		[ wishListApi.reducerPath ]: wishListApi.reducer,
		[ ordersApi.reducerPath ]: ordersApi.reducer,
	},
	middleware: ( getDefaultMiddleware ) =>
		getDefaultMiddleware().concat(
			usersApi.middleware,
			otpApi.middleware,
			booksApi.middleware,
			inventoryApi.middleware,
			wishListApi.middleware,
			ordersApi.middleware,
		),
} );

setupListeners( store.dispatch );

export * from "./features/users/usersApi.js";
export * from "./features/otp/otpApi";
export * from "./features/books/booksApi";
export * from "./features/inventory/inventoryApi";
export * from "./features/wishlist/wishListApi.js";
export * from "./features/cart/cartSlice";
export * from "./features/orders/ordersApi";
export * from "./features/users/userSlice";