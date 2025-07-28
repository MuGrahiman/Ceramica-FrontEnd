import React, { useEffect, useState } from 'react'
import { useGetOrdersByRoleQuery, useUpdateOrderStatusMutation } from '../redux/store';
import useApiHandler from './useApiHandler';

const useOrder = ( role = 'client' ) => {
    const [ ordersData, setOrdersData ] = useState( [] );
    const [ activeOrderId, setActiveOrderId ] = useState( null );

    const [ handleMutation ] = useApiHandler();

    const {
        data,
        isLoading: isOrdersLoading,
        error: ordersFetchError,
        isError: ordersFetchIsError,
    } = useGetOrdersByRoleQuery( role );

    const [ updateOrderStatus, { isLoading: isOrderStatusUpdating } ] = handleMutation(
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
        setActiveOrderId( id );
        const updatedOrder = await updateOrderStatus(
            { orderId: id, orderStatus: value },
            {
                onSuccess: () => "updated order status successfully",
                onError: ( err ) =>
                    err.data.message || err.message || "Order not found",
                onFinally: () => setActiveOrderId( null ),
            }
        );
        return updatedOrder.status;
    };

    /**
      * Handle search functionality.
      * @param {Object} search - The search term.
      */
    const onOrderSearch = ( { searchTerm } ) => {
        const filteredOrders = data.filter( ( order ) => {
            const orderString = JSON.stringify( order ).toLowerCase();
            return orderString.includes( searchTerm.toLowerCase() );
        } );
        setOrdersData( filteredOrders || data );
    };

    /**
     * Clear the search and reset the order data.
     */
    const onClearOrderSearch = () => setOrdersData( data );

    const filterOrders = ( criteria ) => {
        return data.filter( ( order ) => {
            const paymentStatusMatch = criteria?.paymentStatus
                ?.map( ( status ) => status.toLowerCase() )
                .includes( order?.paymentId?.status?.toLowerCase() );
            const orderStatusMatch = criteria?.orderStatus
                ?.map( ( status ) => status.toLowerCase() )
                .includes( order?.status?.toLowerCase() );
            const minPriceMatch = order?.totalAmount >= parseFloat( criteria?.minPrice );
            const maxPriceMatch = order?.totalAmount <= parseFloat( criteria?.maxPrice );
            const startDateMatch = criteria?.startDate;
            new Date( order?.createdAt ) >= new Date( criteria?.startDate );
            const endDateMatch =
                new Date( order?.createdAt ) <= new Date( criteria?.endDate );

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
        activeOrderId,
        ordersData,
        isOrdersLength: data && data.length,
        isOrdersLoading,ordersFetchIsError,
        ordersFetchError,
        handleOrderStatusSelection: handleOrderStatus,
        isOrderStatusUpdating,
        onOrderSearch,
        onClearOrderSearch,
        filterOrders: ( options ) => setOrdersData( filterOrders( options ) ),
        clearOrderFilters: () => setOrdersData( data ),
    }
}

export default useOrder
