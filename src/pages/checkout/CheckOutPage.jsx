import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import AddressForm from "../address/AddressForm";
import AddressList from "../address/AddressList";

const CheckOutPage = () => {
	return (
		<div className="container mx-auto p-8">
			{/* First Section */}
			<section className="flex flex-col-reverse md:flex-row gap-8 mb-8">
				<AddressForm />
				<AddressList />
			</section>

			{/* Second Section */}
			<section className="flex flex-col lg:flex-row gap-8">
				<OrderSummary />
				<PaymentOptions />
			</section>
		</div>
	);
};

export default CheckOutPage;
