import { createSlice } from "@reduxjs/toolkit";
import { APP } from "../../../constants/app";
const jsonValue = localStorage.getItem( APP );
const currentUser = jsonValue && jsonValue !== undefined ? JSON.parse( jsonValue ) : null
const initialState = {
	loading: false,
	error: null,
	currentUser,
};

const AuthSlice = createSlice( {
	name: "user",
	initialState,
	reducers: {
		addUser: ( state, action ) => {
			localStorage.setItem(
				APP,
				JSON.stringify( action.payload )
			);
			state.currentUser = action.payload;
		},

		removeUser: ( state ) => {
			localStorage.removeItem( APP );
			state.currentUser = null;
		},
	},
} );

export const { addUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;