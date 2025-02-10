import React from "react";
import { Link } from "react-router-dom";

const PaymentOptions = ({SUB_TOTAL=0}) => {
	return (
		<div className="w-full lg:w-1/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">Payment</h2>
			<div className="space-y-4">
				<div className="flex justify-between">
					<p className="text-gray-700">Subtotal</p>
					<p className="font-medium">${SUB_TOTAL}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-gray-700">Shipping</p>
					<p className="font-medium">$5.00</p>
				</div>
				<div className="flex justify-between">
					<p className="text-gray-700">Total</p>
					<p className="font-medium">$45.00</p>
				</div>
				<div className="flex flex-col sm:flex-row gap-2">
					<input
						type="text"
						placeholder="Coupon Code"
						className="w-full p-2 border rounded-md"
					/>
					<button className="w-full sm:w-fit  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
						Apply
					</button>
				</div>
				<div className="space-y-2">
					<label className="flex items-center">
						<input type="radio" name="payment" className="mr-2" />
						<span>Cash on Delivery (COD)</span>
					</label>
					<label className="flex items-center">
						<input type="radio" name="payment" className="mr-2" />
						<span>Net Banking</span>
					</label>
				</div>
				<div className="md:col-span-5 mt-3 text-sm">
					<div className="inline-flex items-center">
						<input
							type="checkbox"
							name="billing_same"
							id="billing_same"
							className="form-checkbox"
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
				</div>
				<button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
					Place Order
				</button>
			</div>
		</div>
	);
};

export default PaymentOptions;
