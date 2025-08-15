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
const useInventory = ( searchTerm = '' ) => {
    const limit = 9; // Items per page
    // State variables
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ minPrice, setMinPrice ] = useState();
    const [ maxPrice, setMaxPrice ] = useState();
    const [ sort, setSort ] = useState( '' );
    const [ category, setCategory ] = useState( [] );
    const [ size, setSize ] = useState( [] );
    const [ id, setId ] = useState( null );
    const [ data, setData ] = useState();
    const [ patchId, setPatchId ] = useState( null );

    const [ handleMutation ] = useApiHandler();

    // Fetch inventory items
    const {
        data: productData,
        isLoading: fetchLoading,
        isFetching,
        error: fetchError,
        isError: fetchIsError
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
        {
            isLoading: deleteLoading,
            isError: deleteError,
            isSuccess: deleteSuccess
        }
    ] = handleMutation( useDeleteInventoryMutation );
    const [
        patchInventory,
        {
            isLoading: patchLoading,
            isError: patchError,
            isSuccess: patchSuccess
        }
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
        if ( categories ) setCategory( [ ...categories ] )
        if ( sizes ) setSize( [ ...sizes ] )
        setMinPrice( minPrice )
        if ( maxPrice ) setMaxPrice( maxPrice )
        if ( sort ) setSort( sort )
    }

    const clearFilter = () => {
        setCategory( [] )
        setSize( [] )
        setMinPrice()
        setMaxPrice()
        setSort()
    }

    // Filter top rated products 
    const getTopRatedProducts = ( products, limit = 4 ) => {
        if ( !products ) return [];
        return [ ...products ]
            .sort( ( a, b ) => {
                if ( b.averageRating !== a.averageRating ) {
                    return b.averageRating - a.averageRating;
                }
                return b.totalCount - a.totalCount;
            } )
            .slice( 0, limit );
    };

    const topRatedProducts = React.useMemo(
        () => getTopRatedProducts( data ),
        [ data ]
    );

    // Return values and functions for use in components
    return {
        // Fetching data
        fetchLoading, isFetching,
        fetchError, fetchIsError,
        data,
        totalPages,
        currentPage,
        handlePage,
        pageNumbers: generatePageNumbers( currentPage, totalPages ),
        getTopRatedProducts,
        topRatedProducts,

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
