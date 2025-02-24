import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import {
    useAddToCartMutation,
    useGetCartItemsQuery,
    useRemoveFromCartMutation,
    useUpdateCartMutation
} from "../redux/store";
import useToast from "./useToast";

/**
 * Custom hook to manage cart operations.
 * Handles fetching cart items, adding/removing items, updating quantities, and calculating subTotal.
 */
export const useCart = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth("client");
    const showToast = useToast();
    const [cartItems, setCartItems] = useState(null);
    const [activeCartId, setActiveCartId] = useState(null);
    const [subTotal, setSubTotal] = useState(0);

    const resetActiveCartId = () => setActiveCartId(null);

    // Fetch cart items only if the user is authorized
    const { data, error: fetchError, isLoading: isFetching } = useGetCartItemsQuery(null, { skip: !isAuthorized });

    // Define mutation hooks for cart operations
    const [addToCartMutation, { isLoading: isAdding }] = useAddToCartMutation();
    const [updateCartMutation, { isLoading: isUpdating }] = useUpdateCartMutation();
    const [removeFromCartMutation, { isLoading: isRemoving }] = useRemoveFromCartMutation();

    // Update cart items when data changes
    useEffect(() => {
        if (fetchError) {
            showToast("Failed to fetch cart items. Please try again.", 'error');
        }
        if (data && data.length) {
            setCartItems(data);
        } else {
            setCartItems(null);
        }
    }, [data, fetchError, showToast]);

    // Calculate subTotal whenever cart items change
    useEffect(() => {
        const total = cartItems ? cartItems.reduce((acc, item) => {
            return acc + item.inventory.price * item.quantity;
        }, 0) : 0;
        setSubTotal(total);
    }, [cartItems]);

    /**
     * Add a product to the cart.
     * @param {string} productId - The ID of the product to add.
     */
    const addToCart = useCallback(async (productId) => {
        setActiveCartId(productId);
        if (!productId) {
            showToast("Product ID is required.", 'error');
            resetActiveCartId();
            return;
        }

        if (!isAuthorized) {
            showToast("Please login to add products to your cart.", 'error');
            navigate("/login");
            resetActiveCartId();
            return;
        }

        try {
            await addToCartMutation({ productId, quantity: 1 }).unwrap();
            showToast("Product added to cart!", 'success');
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to add product to cart.", 'error');
        } finally {
            resetActiveCartId();
        }
    }, [isAuthorized, addToCartMutation, navigate, showToast]);

    /**
     * Remove a product from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    const removeFromCart = useCallback(async (productId) => {
        setActiveCartId(productId);
        if (!isAuthorized) {
            showToast("Please login to manage your cart.", 'error');
            navigate("/login");
            resetActiveCartId();
            return;
        }

        try {
            await removeFromCartMutation(productId).unwrap();
            showToast("Product removed from cart.", 'success');
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to remove product from cart.", 'error');
        } finally {
            resetActiveCartId();
        }
    }, [isAuthorized, removeFromCartMutation, navigate, showToast]);

    /**
     * Update the quantity of a product in the cart.
     * @param {Object} cartItem - The cart item to update.
     * @param {string} type - The type of update ("inc" for increment, "dec" for decrement).
     */
    const updateCartQuantity = useCallback(async (cartItem, type) => {
        const { productId, quantity, cartId } = cartItem;
        setActiveCartId(cartId);

        if (!isAuthorized) {
            showToast("Please login to manage your cart.", 'error');
            navigate("/login");
            resetActiveCartId();
            return;
        }

        try {
            let newQuantity = quantity;

            if (type === "inc") {
                newQuantity += 1;
            } else if (type === "dec") {
                newQuantity -= 1;
            }

            if (newQuantity <= 0) {
                await removeFromCart(cartId);
            } else {
                await updateCartMutation({ productId, quantity: newQuantity }).unwrap();
                showToast(`Quantity updated to ${newQuantity}`, 'success');
            }
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to update quantity.", 'error');
        } finally {
            resetActiveCartId();
        }
    }, [isAuthorized, updateCartMutation, removeFromCart, navigate, showToast]);

    /**
     * Clear the cart (placeholder for future implementation).
     */
    const handleClearCart = () => {
        showToast("Clear cart functionality is currently under development.", 'info');
    };

    return {
        isAuthorized,
        cartItems,
        subTotal,
        activeCartId,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleClearCart,
        isFetching,
        isAdding,
        isRemoving,
        isUpdating
    };
};