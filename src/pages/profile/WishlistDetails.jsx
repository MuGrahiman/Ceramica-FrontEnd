import React from "react";
import ListOptions from "../../components/ListOptions";
import PropTypes from "prop-types";
import EmptySpot from "../../components/EmptySpot";

/**
 * Displays the wishlist items in the profile page.
 * If the wishlist is empty, it shows the EmptyWishlist component.
 * @param {Array} wishListItems - The list of wishlist items to display.
 */
const WishlistDetails = ({ wishListItems = [] }) => {
	return (
		<div className="p-4">
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
					{/* <ViewAllItems length={wishListItems.length} link={"/wishlist"} /> */}

				</>
			) : (
				<EmptySpot
					heading="No items in wishlist"
					subheading="Start saving items you love"
					icon={
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					}
					buttonText="Browse Products"
				/>
			)}
		</div>
	);
};

WishlistDetails.propTypes = {
	wishListItems: PropTypes.array.isRequired,
};

export default WishlistDetails;
