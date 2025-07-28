import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import {
    useAddToCartMutation,
    useClearCartMutation,
    useGetCartItemsQuery,
    useOrderSlice,
    useRemoveFromCartMutation,
    useUpdateCartMutation
} from "../redux/store";
import useToast from "./useToast";
import { handleAndShowError } from "../utils/errorHandlers";
import { TOAST_MESSAGES } from "../constants/cart";
import useApiHandler from "./useApiHandler";

/**
 * Custom hook to manage cart operations.
 * Handles fetching cart items, adding/removing items, updating quantities, and calculating subTotal.
 */
export const useCart = () => {
    const { isAuthorized, validateAuthentication } = useAuth( "client" );
    const showToast = useToast();
    const [ handleMutation ] = useApiHandler()
    const { addSubTotal } = useOrderSlice()
    const [ cartItems, setCartItems ] = useState( [] );
    const [ activeCartId, setActiveCartId ] = useState( null );
    const resetActiveCartId = () => setActiveCartId( null );
    const getTotal = () => cartItems.reduce( ( acc, item ) =>
        acc + item.inventory.price * item.quantity, 0 );

    // Fetch cart items only if the user is authorized
    const { data, error: fetchError,isError:isFetchError, isLoading: isFetching } =
        useGetCartItemsQuery( null, { skip: !isAuthorized } );

    // Define mutation hooks for cart operations
    const [ addToCartMutation, { isLoading: isAdding } ] = handleMutation( useAddToCartMutation );
    const [ updateCartMutation, { isLoading: isUpdating } ] = handleMutation( useUpdateCartMutation );
    const [ removeFromCartMutation, { isLoading: isRemoving } ] =
        handleMutation( useRemoveFromCartMutation );
    const [ clearCartMutation, { isLoading: isClearing } ] = handleMutation( useClearCartMutation );

    // Update cart items when data changes
    useEffect( () => {
        if ( fetchError ) {
            showToast( handleAndShowError( fetchError, TOAST_MESSAGES.FETCH_CART_ERROR, ), "error" );
        }
        setCartItems( data?.length ? data : [] );
    }, [ data, fetchError, showToast ] );

    // Calculate subTotal whenever cart items change
    useEffect( () => {
        addSubTotal( getTotal() );
    }, [ cartItems ] );

    /**
     * Validate an ID.
     * @param {string} id - The ID to validate.
     * @throws {Error} If the ID is missing.
     */
    const validateId = ( id ) => {
        if ( !id ) {
            resetActiveCartId();
            // throw new Error( "ID is required." );
            showToast( "ID is required.", "error" );
            return false;
        }
        return true;
    };

    /**
     * Add a product to the cart.
     * @param {string} productId - The ID of the product to add.
     */
    const addToCart = useCallback(
        async ( productId ) => {
            if ( !validateId( productId ) ) return;
            setActiveCartId( productId );
            validateAuthentication();
            // validateId( productId );
            await addToCartMutation( { productId, quantity: 1 }, {
                onSuccess: () =>
                    showToast( TOAST_MESSAGES.ADD_TO_CART_SUCCESS, "success" ),
                onError: ( err ) =>
                    showToast( handleAndShowError( err, TOAST_MESSAGES.ADD_TO_CART_ERROR, ), "error" ),
                onFinally: () =>
                    resetActiveCartId()
            } );

        },
        [ isAuthorized, addToCartMutation, showToast ]
    );

    /**
     * Remove a product from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    const removeFromCart = useCallback(
        async ( productId ) => {
            if ( !validateId( productId ) ) return;
            setActiveCartId( productId );
            validateAuthentication();
            await removeFromCartMutation( productId, {
                onSuccess: () =>
                    showToast( TOAST_MESSAGES.REMOVE_FROM_CART_SUCCESS, "success" ),
                onError: ( err ) =>
                    showToast( handleAndShowError( err, TOAST_MESSAGES.REMOVE_FROM_CART_ERROR ), "error" ),
                onFinally: () =>
                    resetActiveCartId()
            } );
        },
        [ isAuthorized, removeFromCartMutation, showToast ]
    );

    /**
     * Update the quantity of a product in the cart.
     * @param {Object} cartItem - The cart item to update.
     * @param {string} operation - The type of update ("inc" for increment, "dec" for decrement).
    */
    const updateCartQuantity = useCallback(
        async ( { productId, quantity, cartId }, operation ) => {
            if ( !validateId( productId ) ) return;
            if ( !validateId( cartId ) ) return;
            setActiveCartId( cartId );
            validateAuthentication();


            let newQuantity = quantity;
            if ( operation === "inc" ) {
                newQuantity += 1;
            } else if ( operation === "dec" ) {
                newQuantity -= 1;
            }

            if ( newQuantity <= 0 ) {
                await removeFromCart( cartId );
            } else {
                await updateCartMutation( { productId, quantity: newQuantity }, {
                    onSuccess: () =>
                        showToast( `Quantity updated to ${ newQuantity }`, "success" ),
                    onError: ( err ) =>
                        showToast( handleAndShowError( err, TOAST_MESSAGES.UPDATE_QUANTITY_ERROR ), "error" ),
                    onFinally: () =>
                        resetActiveCartId()
                } );
            }

        },
        [ isAuthorized, updateCartMutation, removeFromCart, showToast ]
    );

    /**
     * Clear the cart.
     */
    const clearCart = useCallback( async () => {
        validateAuthentication();
        await clearCartMutation( null, {
            onSuccess: () =>
                showToast( TOAST_MESSAGES.CLEAR_CART_SUCCESS, "success" ),
            onError: ( err ) =>
                showToast( handleAndShowError( err, TOAST_MESSAGES.CLEAR_CART_ERROR ), "error" ),
            onFinally: () =>
                resetActiveCartId()
        } )

    }, [ isAuthorized, clearCartMutation, showToast ] );




    return {
        isAuthorized,
        cartItems,
        getTotal,
        activeCartId,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isFetching,isFetchError, isAdding, isRemoving, isUpdating, isClearing
    };
};