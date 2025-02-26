import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payment: null,
};

const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.payment = action.payload;
        },
        removePayment: (state) => {
            state.payment = null;
        },
    },
});

export const { addPayment, removePayment } = PaymentSlice.actions;
export default PaymentSlice.reducer;