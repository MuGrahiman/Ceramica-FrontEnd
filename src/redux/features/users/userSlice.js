import { createSlice } from "@reduxjs/toolkit";
import { APP } from "../../../constants/app";
import { useDispatch } from "react-redux";
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
			state.loading = true;
			localStorage.setItem(
				APP,
				JSON.stringify( action.payload )
			);
			state.currentUser = action.payload;
			state.loading = false;
		},

		removeUser: ( state ) => {
			state.loading = true;
			localStorage.removeItem( APP );
			state.currentUser = null;
			state.loading = false;
		},
	},
} );

export const { addUser, removeUser } = AuthSlice.actions;
export const useUserSlice = () => {
	const dispatch = useDispatch()
	return {
		addUser: ( arg ) => dispatch( addUser( arg ) ),
		removeUser: ( arg ) => dispatch( removeUser( arg ) )
	}
}
export default AuthSlice.reducer;