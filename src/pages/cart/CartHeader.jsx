import React from "react";

const CartHeader = () => {
	return (
		<div className="flex items-start justify-between">
			<div className="text-2xl font-bold text-gray-900">Shopping Cart</div>
			<div className="ml-3 flex h-7 items-center">
				<button
					type="button"
					className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200">
					<span className="">Clear Cart</span>
				</button>
			</div>
		</div>
	);
};

export default CartHeader;
