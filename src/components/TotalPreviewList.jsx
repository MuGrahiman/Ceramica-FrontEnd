import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/generals";
import InfoLayout from "./InfoLayout";
import ListOptions from "./ListOptions";
import TotalPreviewCard from "./TotalPreviewCard";

/**
 * Displays a list of order items with subtotal calculation
 * @param {Object} props - Component props
 * @param {Object[]} props.items - Array of order items
 */
const TotalPreviewList = ({ title, items }) => {
    const calculateSubtotal = (items) => {
        return items.reduce(
            (acc, item) => acc + item.productId.price * item.quantity,
            0
        );
    };
    const subtotal = calculateSubtotal(items);
	const itemCount = items.length;

	return (
			<InfoLayout title={title}>
				<ul className="divide-y divide-gray-200">
					<ListOptions
						OPTIONS={items}
						RENDER_ITEM={(item, index) => (
							<TotalPreviewCard
								key={`${item.productId._id}-${index}`}
								title={item.productId.title}
								image={item?.productId?.coverImage}
								quantity={item.quantity}
								price={item.productId.price}
							/>
						)}
					/>
					<li
						className="p-4 transition-all duration-300 ease-in-out"
						aria-labelledby={`product-subtotal`}>
						<div className="mt-2 flex items-center justify-end gap-3 font-semibold">
							<p className=" text-gray-500">
								Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):
							</p>
							<p className="text-gray-900">{formatCurrency(subtotal)}</p>
						</div>
					</li>
				</ul>
			</InfoLayout>
	);
};

TotalPreviewList.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			productId: PropTypes.shape({
				_id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				coverImage: PropTypes.shape({
					url: PropTypes.string,
				}),
				price: PropTypes.number.isRequired,
			}).isRequired,
			quantity: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default TotalPreviewList;
