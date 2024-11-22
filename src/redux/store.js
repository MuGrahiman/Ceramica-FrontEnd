import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import usersApi from "./features/users/usersApi";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[booksApi.reducerPath]: booksApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});

export * from "./features/users/usersApi.js";
export * from "./features/books/booksApi";
export * from "./features/cart/cartSlice";
export * from "./features/orders/ordersApi";
