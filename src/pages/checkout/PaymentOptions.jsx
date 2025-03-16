import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PayPal from "./PayPal";
import {
	addPayment,
	useCapturePaymentMutation,
	useCouponSlice,
	useCreateOrderMutation,
	useOrderSlice,
} from "../../redux/store";
import useToast from "../../hooks/useToast";
import { useCart } from "../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import ApplyCoupon from "./ApplyCoupon";
import useCoupon from "../../hooks/useCoupon";

const PaymentOptions = ({ cartSummary = [], addressId, isLoading = false }) => {
	const subTotal = useSelector((state) => state.order.subTotal);
	const appliedCoupon = useSelector((state) => state.coupon.appliedCoupon);

	const showToast = useToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { clearCart } = useCart();
	const { checkCoupon } = useCoupon();
	const { removeCoupon } = useCouponSlice();
	const { removeSubTotal } = useOrderSlice();

	const [createPayPalOrder] = useCreateOrderMutation();
	const [capturePayment] = useCapturePaymentMutation();

	// Called when PayPal button is clicked
	const createOrder = async () => {
		try {
			if (!addressId) {
				throw new Error("Please choose an address");
			}

			if (!subTotal) {
				throw new Error("Subtotal not found");
			}

			if (!cartSummary || !cartSummary.length) {
				throw new Error("Cart items not found");
			}

			// This calls your backend to create a PayPal order
			const response = await createPayPalOrder({
				items: cartSummary,
				totalAmount: subTotal,
				addressId: addressId,
				couponId: appliedCoupon && appliedCoupon._id,
				currency: "USD",
			}).unwrap();

			// Returns orderID to PayPal SDK
			return response;
		} catch (err) {
			console.error("Failed to create order:", err);
			showToast(
				err?.data?.message || err?.message || "Failed to create order",
				"error"
			);
			throw err;
		}
	};

	// Called after user approves payment in PayPal modal
	const handlePayment = async (data) => {
		try {
			// Capture the approved payment
			const response = await capturePayment(data).unwrap();
			if (response.status === "Completed") {
				showToast(`Payment ${response.status}`, "success");
				await clearCart();
				removeCoupon();
				removeSubTotal();
				dispatch(addPayment(response));
				navigate("/success/" + response._id);
			} else {
				showToast(`Payment ${response.status}`, "error");
			}
		} catch (err) {
			console.error("Payment failed:", err);
			showToast(err.message || "Payment failed", "error");
		}
	};

	// Handle errors from PayPal SDK
	const onError = (err) => {
		console.error(err);
		showToast(err.message || "Something went wrong", "error");
	};

	return (
		<div className="w-full lg:w-1/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">Payment</h2>
			<div className="space-y-4">
				<div className="flex justify-between font-medium">
					<p className="text-gray-700">Subtotal</p>
					<p className="font-bold">${subTotal}</p>
				</div>
				<ApplyCoupon onSubmit={checkCoupon} />

				<div className="md:col-span-5 pt-9 text-sm">
					<div className="inline-flex items-center mb-3">
						<input
							type="checkbox"
							name="billing_same"
							id="billing_same"
							className="form-checkbox"
							aria-label="I agree to the terms and conditions"
						/>
						<label htmlFor="billing_same" className="ml-2">
							I agree to the{" "}
							<Link
								to="/terms"
								className="underline underline-offset-2 text-blue-600">
								Terms & Conditions
							</Link>{" "}
							and{" "}
							<Link
								to="/policy"
								className="underline underline-offset-2 text-blue-600">
								Shopping Policy.
							</Link>
						</label>
					</div>
					<PayPal
						isLoading={isLoading}
						createOrder={createOrder}
						onApprove={handlePayment}
						onCancel={handlePayment}
						onError={onError}
					/>
				</div>
			</div>
		</div>
	);
};

// 🔹 PropTypes for the component
PaymentOptions.propTypes = {
	cartSummary: PropTypes.array,
	addressId: PropTypes.string.isRequired,
	isLoading: PropTypes.bool,
};

export default PaymentOptions;
