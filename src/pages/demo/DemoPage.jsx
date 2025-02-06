import React, { useState } from "react";
import { Link } from "react-router-dom";

function DemoPage() {
	return (
		<div className="container mx-auto p-8">
			{/* //   <!-- First Section --> */}
			<section className="flex flex-col-reverse md:flex-row gap-8 mb-8">
				{/* <!-- Part 1: User Details Form --> */}
				<div className="w-full md:w-1/2 lg:w-2/3 bg-white p-6 ">
					<h2 className="text-xl font-semibold mb-6">User Details</h2>
					<form className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									First Name
								</label>
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Phone
							</label>
							<input
								type="tel"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Country
								</label>
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									State
								</label>
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Zip Code
								</label>
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Street
							</label>
							<input
								type="text"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
						<div className="flex gap-4">
							<button
								type="button"
								className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
								Edit
							</button>
							<button
								type="button"
								className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
								Add
							</button>
						</div>
					</form>
				</div>

				{/* <!-- Part 2: Saved Addresses --> */}
				<div className="w-full  md:w-1/2 lg:w-1/3 bg-white p-6  overflow-y-auto ">
					<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
					<div className="space-y-4">
						{/* <!-- Address Card --> */}
						<div className="p-4 border rounded-lg">
							<p className="font-medium">John Doe</p>
							<p className="text-sm text-gray-600">123 Main St, Apt 4B</p>
							<p className="text-sm text-gray-600">New York, NY 10001</p>
							<p className="text-sm text-gray-600">USA</p>
						</div>
						{/* <!-- Add more address cards here --> */}
					</div>
				</div>
			</section>

			{/* <!-- Second Section --> */}
			<section className="flex flex-col lg:flex-row gap-8">
				{/* <!-- Part 1: Order Summary --> */}
				<div className="w-full  lg:w-2/3 bg-white p-6 ">
					<h2 className="text-xl font-semibold mb-6">Order Summary</h2>
					<div className="space-y-4 overflow-y-auto">
						{/* <!-- Product Row --> */}
						<div className="flex justify-between items-center p-4 border rounded-lg">
							<p className="font-medium">Product 1</p>
							<p className="text-sm text-gray-600">$20.00</p>
							<p className="text-sm text-gray-600">Qty: 2</p>
							<p className="font-medium">$40.00</p>
						</div>
						{/* <!-- Add more product rows here --> */}
					</div>
				</div>

				{/* <!-- Part 2: Payment Options --> */}
				<div className="w-full  lg:w-1/3 bg-white p-6 ">
					<h2 className="text-xl font-semibold mb-6">Payment</h2>
					<div className="space-y-4">
						<div className="flex justify-between">
							<p className="text-gray-700">Subtotal</p>
							<p className="font-medium">$40.00</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Shipping</p>
							<p className="font-medium">$5.00</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Total</p>
							<p className="font-medium">$45.00</p>
						</div>
						<div className="sm:flex gap-2">
							<input
								type="text"
								placeholder="Coupon Code"
								className="w-full p-2 border rounded-md"
							/>
							<button className="w-full sm:w-fit px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
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
								<label htmlFor="billing_same" className="ml-2 ">
									I am aggree to the{" "}
									<Link className="underline underline-offset-2 text-blue-600">
										Terms & Conditions
									</Link>{" "}
									and{" "}
									<Link className="underline underline-offset-2 text-blue-600">
										Shoping Policy.
									</Link>
								</label>
							</div>
						</div>
						<button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
							Place Order
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

export default DemoPage;
