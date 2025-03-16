import React from "react";

const ApplyCoupon = ({ onSubmit }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const couponCode = event.target.couponCode.value;
		onSubmit(couponCode); // Call the onSubmit function with the coupon code
	};

	return (
		<form className="" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-2 sm:flex-row sm:gap-0 w-full ">
				<input
					type="text"
					name="couponCode"
					placeholder="Coupon Code"
					className="flex-1 p-2 border  sm:rounded-l-md"
					aria-label="Coupon Code"
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white  sm:rounded-r-md hover:bg-blue-600 transition duration-300">
					Apply
				</button>
			</div>
		</form>
	);
};

export default ApplyCoupon;
