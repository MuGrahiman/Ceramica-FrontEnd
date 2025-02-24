import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartCard from "../cart/CartCard";
import ListOptions from "../../components/ListOptions";
import Loading from "../../components/Loading"; // Missing import added

const OrderSummary = ({ CART_SUMMARY, IS_LOADING }) => (
	<div className="w-full max-h-[80%] lg:w-2/3 bg-white p-6">
		<h2 className="text-xl font-semibold mb-6">Order Summary</h2>

		{/* Scrollable List Container */}
		<div className="h-[80%] border rounded-md mb-3">
			<ul
				role="list"
				className="h-full divide-y divide-gray-200 p-6 overflow-y-auto">
				{IS_LOADING ? (
					<Loading />
				) : (
					<ListOptions
						EMPTY_MESSAGE="No products found in your cart!"
						OPTIONS={CART_SUMMARY}
						RENDER_ITEM={(item) => {
							return <CartCard {...item} showButtons={false} />;
						}}
					/>
				)}
			</ul>
		</div>

		{/* Edit Cart Link */}
		<div className="mb-3  flex justify-center text-sm text-gray-500">
			<Link
				to="/cart"
				type="button"
				className="font-medium text-blue-500 hover:text-blue-950 ">
				Edit The Cart <span aria-hidden="true">&rarr;</span>
			</Link>
		</div>
	</div>
);

// PropTypes Validation
OrderSummary.propTypes = {
	CART_SUMMARY: PropTypes.array.isRequired,
	IS_LOADING: PropTypes.bool.isRequired,
};

export default OrderSummary;
