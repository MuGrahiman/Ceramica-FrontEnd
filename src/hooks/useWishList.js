import { useEffect, useState } from "react";
import {
    useAddToWishListMutation,
    useGetWishlistItemsQuery,
    useRemoveFromWishListMutation,
} from "../redux/store";
import { useAuth } from "./useAuth";
import useApiHandler from "./useApiHandler";
// import { EMPTY_WISHLIST_MESSAGE } from "../constants/messages";


// Define a constant for the empty wishlist message
const EMPTY_WISHLIST_MESSAGE = "Your wishlist is empty.";



/**
 * Custom hook to manage wishlist functionality.
 * @param {boolean} [showWishlist=false] - Whether to show the wishlist.
 * @returns {object} - Wishlist state and functions.
 */
const useWishList = ( showWishlist = false ) => {
    const [ handleLoginMutation ] = useApiHandler();
    const { isAuthorized, currentUserName, validateAuthentication } = useAuth( "client" );
    const [ wishListItems, setWishListItems ] = useState( null );
    const [ wishlistId, setWishlistId ] = useState( null );

    const {
        data: wishListData,
        isLoading: isWishListLoading,
        isError: isWishListError,
        isFetching: isWishListFetching,
        refetch: refetchWishList,
    } = useGetWishlistItemsQuery( null, { skip: !isAuthorized } );

    const [ addToWishList, addToWishListResult ] =
        handleLoginMutation( useAddToWishListMutation );

    const [ removeFromWishList, removeFromWishListResult ] =
        handleLoginMutation( useRemoveFromWishListMutation );

    useEffect( () => {
        if ( wishListData && wishListData.length ) {
            setWishListItems( wishListData );
        } else {
            setWishListItems( null );
        }
    }, [ wishListData ] );

    /**
     * Checks if an item ID is in the wishlist.
     * @param {string} id - The item ID to check.
     * @returns {boolean} - Whether the item is in the wishlist.
     */
    const checkIdInWishlist = ( id ) =>
        wishListItems?.some( ( { inventory } ) => inventory._id === id ) || false;

    /**
     * Handles adding or removing an item from the wishlist.
     * @param {string} itemId - The item ID to add or remove.
     */
    const handleWishlistClick = async ( itemId = '' ) => {
        if ( !showWishlist || !itemId ) return;
        if ( !validateAuthentication() ) return;
        setWishlistId( itemId );
        if ( await checkIdInWishlist( itemId ) ) {
            await removeFromWishList(
                itemId,
                {
                    onError: ( err ) =>
                        err.data?.message || err?.message || "Failed to remove from wishlist",
                }
            );
        } else {
            await addToWishList( itemId,
                {
                    onError: ( err ) =>
                        err.data?.message || err?.message || "Failed to add to wishlist",
                }
            );
        }
        setWishlistId( null );
    };

    const isLoading = (
        addToWishListResult.isLoading || addToWishListResult.isFetching ||
        removeFromWishListResult.isLoading
    );

    return {
        EMPTY_WISHLIST_MESSAGE,
        wishlistId,
        wishlistUser: currentUserName,
        wishListItems,
        isWishListLoading,
        isWishListError,
        isWishListFetching,
        refetchWishList,

        isAuthorized,
        checkIdInWishlist,
        handleWishlistClick,
        isLoading
    };
};

export default useWishList;