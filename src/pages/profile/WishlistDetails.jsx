import React from "react";
import EmptyWishlist from "../wishlist/EmptyWishlist";
import ListOptions from "../../components/ListOptions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Displays the wishlist items in the profile page.
 * If the wishlist is empty, it shows the EmptyWishlist component.
 * @param {Array} wishListItems - The list of wishlist items to display.
 */
const WishlistDetails = ({ wishListItems = [] }) => {
	return (
		<div className="px-6 py-4">
			{wishListItems?.length > 0 ? (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						<ListOptions
							OPTIONS={wishListItems.slice(0, 4)}
							RENDER_ITEM={({ inventory }, index) => (
								<div key={index} className="group relative">
									<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg ">
										<img
											src={inventory.coverImage.url}
											alt={inventory.title}
											className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
										/>
									</div>
									<p className="mt-2 text-sm font-medium text-gray-900 truncate">
										{inventory.title}
									</p>
									<p className="text-sm text-gray-500">${inventory.price}</p>
								</div>
							)}
						/>
					</div>
					<div className="mt-6 text-center">
						<Link
							to={"/wishlist"}
							className="text-indigo-600 hover:text-indigo-800 font-medium">
							View all {wishListItems.length} items
						</Link>
					</div>
				</>
			) : (
				<EmptyWishlist />
			)}
		</div>
	);
};

WishlistDetails.propTypes = {
	wishListItems: PropTypes.array.isRequired,
};

export default WishlistDetails;
