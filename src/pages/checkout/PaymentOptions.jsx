import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PayPal from "./PayPal";
import { useCapturePaymentMutation, useCreateOrderMutation } from "../../redux/store";
import useToast from "../../hooks/useToast";
import { useCart } from "../../hooks/useCart";

const PaymentOptions = ({
	subTotal = 0,
	cartSummary = [],
	addressId,
	isLoading = false,
}) => {
	const [createPayPalOrder] = useCreateOrderMutation();
	const [capturePayment] = useCapturePaymentMutation();
	const showToast = useToast();
	const { handleClearCart, isClearing } = useCart();

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
				currency: "USD",
			}).unwrap();

			// Returns orderID to PayPal SDK
			const paymentIntentId = response.paymentId;
			return paymentIntentId;
		} catch (err) {
			console.error("Failed to create order:", err);
			showToast(err.message || "Failed to create order", "error");
			throw err;
		}
	};

	// Called after user approves payment in PayPal modal
	const handlePayment = async (data, actions) => {
		try {
			// Capture the approved payment
			const response = await capturePayment(data).unwrap();
			if (response.paymentStatus === "Completed") {
				showToast(`Payment ${response.paymentStatus}`, "success");
				await handleClearCart()
			} else {
				showToast(`Payment ${response.paymentStatus}`, "error");
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

				<div className="flex flex-col sm:flex-row gap-2">
					<input
						type="text"
						placeholder="Coupon Code"
						className="w-full p-2 border rounded-md"
						aria-label="Coupon Code"
					/>
					<button className="w-full sm:w-fit px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
						Apply
					</button>
				</div>

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
	subTotal: PropTypes.number,
	cartSummary: PropTypes.array,
	addressId: PropTypes.string.isRequired,
	isLoading: PropTypes.bool,
};

export default PaymentOptions;