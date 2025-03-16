import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const initialState = {
	loading: false,
	error: null,
	subTotal: null,
};

const OrderSlice = createSlice( {
	name: "coupon",
	initialState,
	reducers: {
		addSubTotal: ( state, action ) => {
			state.subTotal = action.payload;
		},

		removeSubTotal: ( state ) => {
			state.subTotal = null;
		},
	},
} );

const { addSubTotal, removeSubTotal } = OrderSlice.actions;
export const useOrderSlice = () => {
	const dispatch = useDispatch()
	return {
		addSubTotal: ( arg ) => dispatch( addSubTotal( arg ) ),
		removeSubTotal: ( arg ) => dispatch( removeSubTotal( arg ) )
	}
}
export default OrderSlice.reducer;