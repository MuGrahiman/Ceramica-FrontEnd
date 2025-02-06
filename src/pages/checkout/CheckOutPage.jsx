import React from "react";
import UserDetailsForm from "./UserDetailsForm";
import SavedAddresses from "./SavedAddresses";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";

const CheckOutPage = () => {
	return (
		<div className="container mx-auto p-8">
			{/* First Section */}
			<section className="flex flex-col-reverse md:flex-row gap-8 mb-8">
				<UserDetailsForm />
				<SavedAddresses />
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
