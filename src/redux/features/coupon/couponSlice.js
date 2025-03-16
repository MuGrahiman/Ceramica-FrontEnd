import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const initialState = {
	loading: false,
	error: null,
	appliedCoupon: null,
};

const CouponSlice = createSlice( {
	name: "coupon",
	initialState,
	reducers: {
		addCoupon: ( state, action ) => {
			state.appliedCoupon = action.payload;
		},

		removeCoupon: ( state ) => {
			state.appliedCoupon = null;
		},
	},
} );

const { addCoupon, removeCoupon } = CouponSlice.actions;
export const useCouponSlice = () => {
	const dispatch = useDispatch()
	return {
		addCoupon: ( arg ) => dispatch( addCoupon( arg ) ),
		removeCoupon: ( arg ) => dispatch( removeCoupon( arg ) )
	}
}
export default CouponSlice.reducer;