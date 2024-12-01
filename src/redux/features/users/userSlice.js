import { createSlice } from "@reduxjs/toolkit";
const APP = "STORE-APP-USER"
const jsonValue = localStorage.getItem(APP);
const initialState = {
	loading: false,
	error: null,
	currentUser: jsonValue ? JSON.parse(jsonValue) : null,
};

const AuthSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			localStorage.setItem(
				"STORE-APP-USER",
				JSON.stringify(action.payload)
			);
			state.currentUser = action.payload;
		},

		removeUser: (state) => {
			localStorage.removeItem(APP);
			state.currentUser = null;
		},
	},
});

export const  {addUser, removeUser} = AuthSlice.actions;
export default AuthSlice.reducer;