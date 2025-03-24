import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    useDeleteInventoryMutation,
    useGetInventoryItemsQuery,
    usePatchInventoryMutation
} from '../redux/store';
import useApiHandler from './useApiHandler';
import { INVENTORY_URL } from '../constants/inventory';
import generatePageNumbers from '../utils/pagination';

// Custom hook to manage inventory
const useInventory = ( searchTerm ) => {
    // State variables
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ minPrice, setMinPrice ] = useState();
    const [ maxPrice, setMaxPrice ] = useState();
    const [ sort, setSort ] = useState();
    const [ category, setCategory ] = useState( [] );
    const [ size, setSize ] = useState( [] );
    const [ id, setId ] = useState( null );
    const [ data, setData ] = useState();
    const [ patchId, setPatchId ] = useState( null );

    const limit = 6; // Items per page
    const [ handleMutation ] = useApiHandler();

    // Fetch inventory items
    const {
        data: productData,
        isLoading: fetchLoading,
        error: fetchError,
    } = useGetInventoryItemsQuery( {
        page: currentPage,
        limit,
        category,
        size,
        sort,
        minPrice,
        maxPrice,
        search: searchTerm
    } );
    // Mutation for deleting inventory item
    const [
        deleteInventory,
        { isLoading: deleteLoading,
            isError: deleteError,
            isSuccess: deleteSuccess }
    ] = handleMutation( useDeleteInventoryMutation );
    const [
        patchInventory,
        { isLoading: patchLoading,
            error,
            isError: patchError,
            isSuccess: patchSuccess }
    ] = handleMutation( usePatchInventoryMutation );

    // Update inventory data when productData changes
    useEffect( () => {
        if ( productData ) {
            const { products, totalPages } = productData;
            setData( products || [] );
            setTotalPages( totalPages || 1 );
        }
    }, [ productData ] );

    const handleStatus = async ( inventory ) => {
        setPatchId( inventory._id )
        await patchInventory(
            { id: inventory._id, status: inventory?.status === 'active' ? 'inActive' : 'active' },
            {
                onSuccess: () => "inventory status updated successfully ",
                onError: ( err ) => err.message || "Failed to update product. Please try again.",
            }
        );
        setPatchId( null )
    }

    // Handles the deletion of an inventory item
    const handleDelete = async ( id ) => {
        setId( id );
        const result = await Swal.fire( {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b10202",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        } );

        if ( !result.isConfirmed ) return setId( null );

        await deleteInventory( id, {
            onSuccess: () => "Product deleted successfully",
            onError: ( err ) => err.message || "Failed to delete the product .Please try again",
            redirectPath: INVENTORY_URL
        } );
        setId( null );
    };

    // Handle page changes
    const handlePage = ( page ) => setCurrentPage( page );

    // Handle page filtration
    const handleFilter = ( data ) => {
        const { categories, sizes, maxPrice, minPrice, sort } = data
        setCategory( [ ...categories ] )
        setSize( [ ...sizes ] )
        setMinPrice( minPrice )
        setMaxPrice( maxPrice )
        setSort( sort )
    }

    const clearFilter = () => {
        setCategory( [] )
        setSize( [] )
        setMinPrice()
        setMaxPrice()
        setSort()
    }

    // Return values and functions for use in components
    return {
        // Fetching data
        fetchLoading,
        fetchError,
        data,
        totalPages,
        currentPage,
        handlePage,
        pageNumbers: generatePageNumbers( currentPage, totalPages ),

        // Deleting data
        deleteLoading,
        deleteError,
        deleteSuccess,
        handleDelete,

        // Patching data
        patchId,
        patchError,
        patchSuccess,
        handleStatus,
        patchLoading,

        // Filters and search
        handleFilter,
        clearFilter,

        // Utility
        id,
    };


};

export default useInventory;
