import React from "react";
import ListOptions from "../../components/ListOptions";
import CartCard from "./CartCard";

const CartList = ({ CART_ITEMS,showButtons }) => {
	return (
		<div className="mt-8 pt-6">
			<div className="flow-root">
				<ul role="list" className="-my-6 divide-y divide-gray-200">
					<ListOptions
						OPTIONS={CART_ITEMS}
						EMPTY_MESSAGE="No products found in your cart!"
						RENDER_ITEM={({ inventory, _id, ...rest }) => (
							<CartCard
								cartId={_id}
								productId={inventory._id}
								{...inventory}
								{...rest}
								showButtons={showButtons}
							/>
						)}
					/>
				</ul>
			</div>
		</div>
	);
};

export default CartList;
