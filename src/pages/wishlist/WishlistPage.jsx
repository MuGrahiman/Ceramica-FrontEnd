import React from "react";
import { useGetWishlistItemsQuery } from "../../redux/store";
import { useAuth } from "../../hooks/useAuth";
import WishListError from "./WishListError";
import WishListLoading from "./WishListLoading";
import EmptyWishlist from "./EmptyWishlist";
import ShowcaseWishlist from "./ShowcaseWishlist";
import WishlistHeader from "./WishlistHeader";
import useWishList from "../../hooks/useWishList";

const WishlistPage = () => {
	const {
		EMPTY_WISHLIST_MESSAGE,
		wishlistUser,
		wishListItems,
		isWishListLoading,
		isWishListError,
		isWishListFetching,
		refetchWishList,
	} = useWishList();

	// If there is an error, display the error component
	if (isWishListError) {
		return <WishListError onRetry={refetchWishList} />;
	}

	// If the wishlist is loading, display the loading component
	if (isWishListLoading) {
		return <WishListLoading />;
	}

	// Render the wishlist content
	return (
		<div className="container mx-auto px-4 py-8">
			<WishlistHeader wishlistUser={wishlistUser} />
			{wishListItems && wishListItems.length ? (
				<ShowcaseWishlist
					isWishlistFetching={isWishListFetching}
					wishListItems={wishListItems}
					emptyWishlistMessage={EMPTY_WISHLIST_MESSAGE}
				/>
			) : (
				<EmptyWishlist emptyWishlistMessage={EMPTY_WISHLIST_MESSAGE} />
			)}
		</div>
	);
};

export default WishlistPage;
