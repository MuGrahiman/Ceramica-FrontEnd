// useWishlist.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useAddToWishListMutation,
    useGetWishlistItemsQuery,
    useRemoveFromWishListMutation,
} from "../redux/store";
import { useAuth } from "./useAuth";

export const useWishList = ( itemId, showWishlist ) => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth("client");
    const [ wishListItems, setWishListItems ] = useState( null )
    const { data } = useGetWishlistItemsQuery( null, {
        skip: !isAuthorized,
    } );

    useEffect( () => {
        if ( data && data.length ) setWishListItems( data );
        else setWishListItems( null )
    }, [ data ] )

    const [ addToWishList, { isLoading: isAdding } ] = useAddToWishListMutation();
    const [ removeFromWishList, { isLoading: isRemoving } ] =
        useRemoveFromWishListMutation();

    const isItemInWishlist = ( id ) =>
        wishListItems?.some( ( { inventory } ) => inventory._id === id );

    const handleWishlistClick = async () => {
        if (!showWishlist || !itemId) return;
        if (!isAuthorized) {
            navigate("/login");
            return;
        }
    
        try {
            if (isItemInWishlist(itemId)) {
                await removeFromWishList(itemId);
            } else {
                await addToWishList(itemId);
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
            alert("Failed to update wishlist. Please try again.");
        }
    };
    

    return {
        isAuthorized,
        isItemInWishlist: isItemInWishlist( itemId ),
        handleWishlistClick,
        isLoading: isAdding || isRemoving,
    };
};