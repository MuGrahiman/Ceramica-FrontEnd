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
 * Handles fetching cart items, adding/removing items, updating quantities, and calculating subtotal.
 */
export const useCart = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth("client");
    const showToast = useToast();
    const [cartItems, setCartItems] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [subtotal, setSubtotal] = useState(0);

    const resetCartId = () => setCartId(null);

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

    // Calculate subtotal whenever cart items change
    useEffect(() => {
        const total = cartItems ? cartItems.reduce((acc, item) => {
            return acc + item.inventory.price * item.quantity;
        }, 0) : 0;
        setSubtotal(total);
    }, [cartItems]);

    /**
     * Add a product to the cart.
     * @param {string} productId - The ID of the product to add.
     */
    const addToCart = useCallback(async (productId) => {
        setCartId(productId);
        if (!productId) {
            showToast("Product ID is required.", 'error');
            resetCartId();
            return;
        }

        if (!isAuthorized) {
            showToast("Please login to add products to your cart.", 'error');
            navigate("/login");
            resetCartId();
            return;
        }

        try {
            await addToCartMutation({ productId, quantity: 1 }).unwrap();
            showToast("Product added to cart!", 'success');
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to add product to cart.", 'error');
        } finally {
            resetCartId();
        }
    }, [isAuthorized, addToCartMutation, navigate, showToast]);

    /**
     * Remove a product from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    const removeFromCart = useCallback(async (productId) => {
        setCartId(productId);
        if (!isAuthorized) {
            showToast("Please login to manage your cart.", 'error');
            navigate("/login");
            resetCartId();
            return;
        }

        try {
            await removeFromCartMutation(productId).unwrap();
            showToast("Product removed from cart.", 'success');
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to remove product from cart.", 'error');
        } finally {
            resetCartId();
        }
    }, [isAuthorized, removeFromCartMutation, navigate, showToast]);

    /**
     * Update the quantity of a product in the cart.
     * @param {Object} cartItem - The cart item to update.
     * @param {string} type - The type of update ("inc" for increment, "dec" for decrement).
     */
    const updateCartQuantity = useCallback(async (cartItem, type) => {
        const { inventory, quantity, _id } = cartItem;
        setCartId(_id);

        if (!isAuthorized) {
            showToast("Please login to manage your cart.", 'error');
            navigate("/login");
            resetCartId();
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
                await removeFromCart(_id);
            } else {
                await updateCartMutation({ productId: inventory._id, quantity: newQuantity }).unwrap();
                showToast(`Quantity updated to ${newQuantity}`, 'success');
            }
        } catch (error) {
            console.error(error);
            showToast(error?.data?.message || "Failed to update quantity.", 'error');
        } finally {
            resetCartId();
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
        subtotal,
        cartId,
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