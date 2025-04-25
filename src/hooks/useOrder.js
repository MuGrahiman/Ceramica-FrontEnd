import React, { useEffect, useState } from 'react'
import { useGetOrdersByRoleQuery, useUpdateOrderStatusMutation } from '../redux/store';
import useApiHandler from './useApiHandler';

const useOrder = ( role = 'client' ) => {
    const [ ordersData, setOrdersData ] = useState( [] );
    const [ id, setId ] = useState( null );

    const [ handleMutation ] = useApiHandler();

    const {
        data,
        isLoading: fetchLoading,
        error: fetchError,
    } = useGetOrdersByRoleQuery( role );

    const [ updateOrderStatus, { isLoading: isStatusUpdating } ] = handleMutation(
        useUpdateOrderStatusMutation
    );

    // Update order data when fetched
    useEffect( () => {
        if ( data && data.length ) {
            setOrdersData( data );
        } else
            setOrdersData( [] );
    }, [ data ] );

    const handleOrderStatus = async ( id, value ) => {
        setId( id );
        const updatedOrder = await updateOrderStatus(
            { orderId: id, orderStatus: value },
            {
                onSuccess: () => "updated order status successfully",
                onError: ( err ) =>
                    err.data.message || err.message || "Order not found",
                onFinally: () => setId( null ),
            }
        );
        return updatedOrder.status;
    };

    /**
 * Handle search functionality.
 * @param {Object} search - The search term.
 */
    const onSearch = ( { searchTerm } ) => {
        const filteredOrders = data.filter( ( order ) => {
            const orderString = JSON.stringify( order ).toLowerCase();
            return orderString.includes( searchTerm.toLowerCase() );
        } );
        setOrdersData( filteredOrders || data );
    };

    /**
     * Clear the search and reset the order data.
     */
    const onClearSearch = () => setOrdersData( data );

    const filterOrders = ( criteria ) => {
        return ordersData.filter( ( order ) => {
            const paymentStatusMatch = criteria.paymentStatus
                .map( ( status ) => status.toLowerCase() )
                .includes( order?.paymentId?.status?.toLowerCase() );
            const orderStatusMatch = criteria.orderStatus
                ?.map( ( status ) => status.toLowerCase() )
                .includes( order?.status?.toLowerCase() );
            const minPriceMatch = order?.totalAmount >= parseFloat( criteria.minPrice );
            const maxPriceMatch = order?.totalAmount <= parseFloat( criteria.maxPrice );
            const startDateMatch = criteria.startDate;
            new Date( order?.createdAt ) >= new Date( criteria.startDate );
            const endDateMatch =
                new Date( order?.createdAt ) <= new Date( criteria.endDate );

            // All criteria must match
            return (
                paymentStatusMatch ||
                orderStatusMatch ||
                minPriceMatch ||
                maxPriceMatch ||
                startDateMatch ||
                endDateMatch
            );
        } );
    }

    return {
        id,
        ordersData,
        fetchLoading,fetchError,
        isStatusUpdating,
        handleSelection: handleOrderStatus,
        onSearch,
        onClearSearch,
        filterOrders: ( options ) => setOrdersData( filterOrders( options ) ),
        clearFilters: () => setOrdersData( data ),
    }
}

export default useOrder
