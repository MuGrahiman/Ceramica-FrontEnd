import React from "react";
import WishListErrorTemplate from "./WishListErrorTemplate";
import EmptyWishlist from "./EmptyWishlist";
import ShowcaseWishlist from "./ShowcaseWishlist";
import useWishList from "../../hooks/useWishList";
import UserNameHeader from "../../components/UserNameHeader";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";

const WishlistPage = () => {
	const {
		EMPTY_WISHLIST_MESSAGE,
		wishlistUser,
		wishListItems,
		isWishListLoading,
		isWishListError,
		WishListError,
		isWishListFetching,
		refetchWishList,
	} = useWishList();

	// Render the wishlist content
	return (
		<LoadingErrorBoundary
			isLoading={isWishListLoading}
			isError={isWishListError}
			CustomErrorTemplate={WishListErrorTemplate}
			errorMessage={extractErrorMessage(
				WishListError,
				"Failed to fetch wishlist data"
			)}
			onRetry={refetchWishList}>
			<div className="container mx-auto px-4 py-8">
				<UserNameHeader userName={wishlistUser} />
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
		</LoadingErrorBoundary>
	);
};

export default WishlistPage;
