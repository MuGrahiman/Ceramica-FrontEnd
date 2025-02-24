import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListOptions from "../../components/ListOptions";
import CartCard from "../cart/CartCard";
import PayPal from "../checkout/PayPal";

function DemoPage() {
	const formFields = [
		{
			NAME: "firstName",
			LABEL: "First Name",
			TYPE: "text",
			PLACEHOLDER: "Enter your first name",
		},
		{
			NAME: "lastName",
			LABEL: "Last Name",
			TYPE: "text",
			PLACEHOLDER: "Enter your last name",
		},
		{
			NAME: "email",
			LABEL: "Email Address",
			TYPE: "email",
			PLACEHOLDER: "email@domain.com",
			DISABLED: true,
		},
		{
			NAME: "phoneNumber",
			LABEL: "Phone Number",
			TYPE: "tel",
			PLACEHOLDER: "+123 456 7890",
		},
		{
			NAME: "street",
			LABEL: "Street Address",
			TYPE: "text",
			PLACEHOLDER: "Enter your address",
		},
		{
			NAME: "town",
			LABEL: "Town/City",
			TYPE: "text",
			PLACEHOLDER: "Enter your town/city",
		},
		{
			NAME: "state",
			LABEL: "State",
			TYPE: "text",
			PLACEHOLDER: "Enter your state",
		},
		{
			NAME: "country",
			LABEL: "Country",
			TYPE: "text",
			PLACEHOLDER: "Enter your country",
		},
		{
			NAME: "zipCode",
			LABEL: "Zip Code",
			TYPE: "text",
			PLACEHOLDER: "Enter your zip code",
		},
	];
	return (
		<div className="container mx-auto p-8">
			{/* //   <!-- First Section --> */}
			<section className="flex flex-col-reverse md:flex-row gap-8 mb-8">
				{/* <!-- Part 1: User Details Form --> */}

				<div className="w-full md:w-1/2 lg:w-2/3 bg-white p-6 ">
					<h2 className="text-xl font-semibold mb-6">User Details</h2>

					<form className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
						<div className="lg:col-span-3">
							{/* <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-6  md:grid-cols-1 lg:grid-cols-6">
						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="first_name"
							className="font-bold">First Name</label>
							<input
								type="text"
								name="first_name"
								id="name"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
							/>
						</div>
						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="last_name">Last Name</label>
							<input
								type="text"
								name="last_name"
								id="name"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
							/>
						</div>
						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="email">Email Address</label>
							<input
								type="text"
								name="email"
								id="email"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								disabled
								placeholder="email@domain.com"
							/>
						</div>
						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="phone">Phone Number</label>
							<input
								type="number"
								name="phone"
								id="phone"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder="+123 456 7890"
							/>
						</div>

						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="address">Address / Street</label>
							<input
								type="text"
								name="address"
								id="address"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder=""
							/>
						</div>

						<div className="col-span-1 sm:col-span-3 md:col-span-1 lg:col-span-3">
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								id="city"
								className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder=""
							/>
						</div>

						<div className=" col-span-1 sm:col-span-2 md:col-span-1  lg:col-span-2">
							<label htmlFor="country">Country / region</label>
							<input
								type="text"
								name="country"
								id="country"
								className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder=""
							/>
						</div>

						<div className="col-span-1 sm:col-span-2 md:col-span-1  lg:col-span-2">
							<label htmlFor="state">State / province</label>
							<input
								type="text"
								name="state"
								id="state"
								className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder=""
							/>
						</div>

						<div className="col-span-1 sm:col-span-2 md:col-span-1  lg:col-span-2">
							<label htmlFor="zipcode">Zipcode</label>
							<input
								type="text"
								name="zipcode"
								id="zipcode"
								className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
								placeholder=""
							/>
						</div>

						<div className="col-span-full mt-3">
							<div className="inline-flex items-center">
								<input
									type="checkbox"
									name="billing_same"
									id="billing_same"
									className="form-checkbox"
								/>
								<label htmlFor="billing_same" className="ml-2 ">
									Set as defualt
								</label>
							</div>
						</div>
						<div className="col-span-full grid gap-4 grid-cols-1   sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-2 my-8 justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Edit
							</button>
							<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
								Add
							</button>
						</div>
					</div> */}
							<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-6  md:grid-cols-1 lg:grid-cols-6">
								{formFields.map((field, index) => (
									<div
										key={index}
										className={`col-span-1 ${
											field.NAME === "country" ||
											field.NAME === "state" ||
											field.NAME === "zipCode"
												? "sm:col-span-2 md:col-span-1  lg:col-span-2"
												: "sm:col-span-3 md:col-span-1 lg:col-span-3 "
										}`}>
										<label htmlFor="first_name" className="font-bold">
											{field.NAME}
										</label>
										<input
											type="text"
											name="first_name"
											id="name"
											className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
										/>
										{/* <InputField
                  {...field}
                  REGISTER={register}
                  ERRORS={errors}
                  VALIDATION_RULES={validationRules}
                /> */}
									</div>
								))}

								<div className="col-span-full mt-3">
									<div className="inline-flex items-center">
										<input
											type="checkbox"
											name="billing_same"
											id="billing_same"
											className="form-checkbox"
											// {...register("billing_same")}
										/>
										<label htmlFor="billing_same" className="ml-2">
											Set as default
										</label>
									</div>
								</div>

								<div className="col-span-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 my-8 justify-between">
									<button
										type="button"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
										Edit
									</button>
									<button
										type="submit"
										className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
										Add
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

				{/* <!-- Part 2: Saved Addresses --> */}
				<div className="w-full  md:w-1/2 lg:w-1/3 bg-white p-6   ">
					<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
					<div className=" flex md:flex-col gap-4 items-center justify-between overflow-x-auto md:overflow-y-auto">
						{/* <!-- Address Card --> */}
						<div className="p-4 border rounded-lg w-full flex-shrink-0">
							<p className="font-medium">John Doe</p>
							<p className="text-sm text-gray-600">123 Main St, Apt 4B</p>
							<p className="text-sm text-gray-600">New York, NY 10001</p>
							<p className="text-sm text-gray-600">USA</p>
						</div>
						{/* <!-- Add more address cards here --> */}
						<div className="p-4 border rounded-lg w-full flex-shrink-0">
							<p className="font-medium">John Doe</p>
							<p className="text-sm text-gray-600">123 Main St, Apt 4B</p>
							<p className="text-sm text-gray-600">New York, NY 10001</p>
							<p className="text-sm text-gray-600">USA</p>
						</div>
					</div>
				</div>
			</section>

			{/* <!-- Second Section --> */}
			<section className="flex flex-col lg:flex-row gap-8 max-h-screen overflow-hidden">
				<div className="w-full lg:w-2/3 bg-white p-6">
					<h2 className="text-xl font-semibold mb-6">Order Summary</h2>

					<div className=" max-h-full  ">
						<ul
							role="list"
							className="max-h-full -my-6 divide-y divide-gray-200 overflow-y-scroll">
							<ListOptions
								EMPTY_MESSAGE="No products found in your cart!"
								OPTIONS={[]}
								RENDER_ITEM={({ inventory, ...rest }) => {
									const { category, ...filteredInventory } = inventory;
									return (
										<CartCard
											{...filteredInventory}
											{...rest}
											showButtons={false}
										/>
									);
								}}
							/>
						</ul>
					</div>

					{/* <div className="mt-8 pt-6 ">
						<div className="flow-root">
							<ul role="list" className="-my-6 divide-y divide-gray-200">
								<ListOptions
									EMPTY_MESSAGE="No products found in your cart!"
									OPTIONS={cartItems}
									RENDER_ITEM={({ inventory, ...rest }) => {
										const { category, ...filteredInventory } = inventory; 
										return (
											<CartCard
												{...filteredInventory}
												{...rest}
												showButtons={false}
											/>
										);
									}}
								/>
							</ul>
						</div>
					</div> */}
				</div>

				<div className="w-full lg:w-1/3 bg-white p-6 max-h-[80%] border rounded-md  ">
					<h2 className="text-xl font-semibold mb-6">Payment</h2>

					<div className="h-full overflow-y-scroll">
						<div className="flex justify-between">
							<p className="text-gray-700">Subtotal</p>
							<p className="font-medium">${5}</p>
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
						{/* <div className="space-y-2"><PaymentElement /></div> */}
						<div className="md:col-span-5 pt-9 text-sm">
							<div className="inline-flex items-center mb-3">
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
							<PayPal />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default DemoPage;
