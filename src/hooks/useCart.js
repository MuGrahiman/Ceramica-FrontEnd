import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import {
    useAddToCartMutation,
    useClearCartMutation,
    useGetCartItemsQuery,
    useRemoveFromCartMutation,
    useUpdateCartMutation
} from "../redux/store";
import useToast from "./useToast";
import { handleAndShowError } from "../utils/errorHandlers";
import { TOAST_MESSAGES } from "../constants/cart";

/**
 * Custom hook to manage cart operations.
 * Handles fetching cart items, adding/removing items, updating quantities, and calculating subTotal.
 */
export const useCart = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth( "client" );
    const showToast = useToast();
    const [ cartItems, setCartItems ] = useState( null );
    const [ activeCartId, setActiveCartId ] = useState( null );

    const resetActiveCartId = () => setActiveCartId( null );

    // Fetch cart items only if the user is authorized
    const { data, error: fetchError, isLoading: isFetching } = useGetCartItemsQuery( null, { skip: !isAuthorized } );

    // Define mutation hooks for cart operations
    const [ addToCartMutation, { isLoading: isAdding } ] = useAddToCartMutation();
    const [ updateCartMutation, { isLoading: isUpdating } ] = useUpdateCartMutation();
    const [ removeFromCartMutation, { isLoading: isRemoving } ] = useRemoveFromCartMutation();
    const [ clearCartMutation, { isLoading: isClearing } ] = useClearCartMutation();

    // Update cart items when data changes
    useEffect( () => {
        if ( fetchError ) {
            handleAndShowError( fetchError, TOAST_MESSAGES.FETCH_CART_ERROR, showToast );
        }
        setCartItems( data?.length ? data : null );
    }, [ data, fetchError, showToast ] );

    // Calculate subTotal whenever cart items change
    const subTotal = useMemo( () => {
        return cartItems ? cartItems.reduce( ( acc, item ) => acc + item.inventory.price * item.quantity, 0 ) : 0;
    }, [ cartItems ] );

    const validateAuthentication = () => {
        if ( !isAuthorized ) {
            const message = "Please login to manage your cart."
            resetActiveCartId();
            navigate( "/login" );
            throw new Error( message );
        }
        return;
    }

    const validateId = ( Id ) => {
        if ( !Id ) {
            const message = " ID is required."
            resetActiveCartId();
            throw new Error( message );
        }
        return;
    }

    /**
     * Add a product to the cart.
     * @param {string} productId - The ID of the product to add.
     */
    const addToCart = useCallback( async ( productId ) => {
        setActiveCartId( productId );
        try {
            validateAuthentication( isAuthorized, navigate, showToast );
            validateId( productId, "Product" );
            await addToCartMutation( { productId, quantity: 1 } ).unwrap();
            showToast( TOAST_MESSAGES.ADD_TO_CART_SUCCESS, 'success' );
        } catch ( error ) {
            handleAndShowError( error, TOAST_MESSAGES.ADD_TO_CART_ERROR, showToast );
        } finally {
            resetActiveCartId();
        }
    }, [ isAuthorized, addToCartMutation, navigate, showToast ] );

    /**
     * Remove a product from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    const removeFromCart = useCallback( async ( productId ) => {
        setActiveCartId( productId );
        try {
            validateAuthentication( isAuthorized, navigate, showToast );
            validateId( productId, "Product" );
            await removeFromCartMutation( productId ).unwrap();
            showToast( TOAST_MESSAGES.REMOVE_FROM_CART_SUCCESS, 'success' );
        } catch ( error ) {
            handleAndShowError( error, TOAST_MESSAGES.REMOVE_FROM_CART_ERROR, showToast );
        } finally {
            resetActiveCartId();
        }
    }, [ isAuthorized, removeFromCartMutation, navigate, showToast ] );

    /**
     * Update the quantity of a product in the cart.
     * @param {Object} cartItem - The cart item to update.
     * @param {string} operation - The type of update ("inc" for increment, "dec" for decrement).
     */
    const updateCartQuantity = useCallback( async ( { productId, quantity, cartId }, operation ) => {
        setActiveCartId( cartId );
        try {
            validateAuthentication( isAuthorized, navigate, showToast );
            validateId( productId, "Product" );
            validateId( cartId, "Cart" );

            let newQuantity = quantity;
            if ( operation === "inc" ) {
                newQuantity += 1;
            } else if ( operation === "dec" ) {
                newQuantity -= 1;
            }

            if ( newQuantity <= 0 ) {
                await removeFromCart( cartId );
            } else {
                await updateCartMutation( { productId, quantity: newQuantity } ).unwrap();
                showToast( `Quantity updated to ${ newQuantity }`, 'success' );
            }
        } catch ( error ) {
            handleAndShowError( error, TOAST_MESSAGES.UPDATE_QUANTITY_ERROR, showToast );
        } finally {
            resetActiveCartId();
        }
    }, [ isAuthorized, updateCartMutation, removeFromCart, navigate, showToast ] );

    /**
     * Clear the cart.
     */
    const handleClearCart = useCallback( async () => {
        try {
            validateAuthentication( isAuthorized, navigate, showToast );
            await clearCartMutation().unwrap();
            showToast( TOAST_MESSAGES.CLEAR_CART_SUCCESS, 'success' );
        } catch ( error ) {
            handleAndShowError( error, TOAST_MESSAGES.CLEAR_CART_ERROR, showToast );
        } finally {
            resetActiveCartId();
        }
    }, [ isAuthorized, clearCartMutation, navigate, showToast ] );

    return {
        isAuthorized,
        cartItems,
        subTotal,
        activeCartId,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleClearCart,
        isFetching, isAdding, isRemoving, isUpdating, isClearing
    };
};