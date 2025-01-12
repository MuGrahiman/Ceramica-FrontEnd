import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteInventoryMutation, useGetInventoryItemsQuery, usePatchInventoryMutation } from '../redux/store';
import useToast from './useToast';
import { useNavigate } from 'react-router-dom';

// Custom hook to manage inventory
const useInventory = () => {
    // State variables
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ minPrice, setMinPrice ] = useState();
    const [ maxPrice, setMaxPrice ] = useState();
    const [ sort, setSort ] = useState();
    const [ search, setSearch ] = useState();
    const [ category, setCategory ] = useState( [] );
    const [ size, setSize ] = useState( [] );
    const [ id, setId ] = useState( null );
    const [ data, setData ] = useState();
    const [ patchId, setPatchId ] = useState( null );

    const limit = 5; // Items per page
    const showToast = useToast(); // Custom toast notification

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
        search
    } );

    // Mutation for deleting inventory item
    const [
        deleteInventory,
        { isLoading: deleteLoading,
            isError: deleteError,
            isSuccess: deleteSuccess }
    ] = useDeleteInventoryMutation();
    const [
        patchInventory,
        { isLoading: patchLoading,
            isError: patchError,
            isSuccess: patchSuccess }
    ] = usePatchInventoryMutation();

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
        await patchInventory( { id: inventory._id, status: !inventory?.status } )
    }
    const navigate = useNavigate();

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

        try {
            const res = await deleteInventory( id ).unwrap();
            showToast( res.message, res.success ? "success" : "error" );
            navigate( "/dashboard/inventory" );

        } catch ( err ) {
            showToast( err?.data?.message || "Something went wrong", "error" );
            console.error( "Delete inventory error:", err );
        } finally {
            setId( null );
        }
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

    const handleSearch = ( { searchTerm } ) => { setSearch( searchTerm ) }
    const clearSearch = () => setSearch()
    // Return values and functions for use in components
    return {
        // Fetching data
        fetchLoading,
        fetchError,
        data,
        totalPages,
        currentPage,
        handlePage,
    
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
        handleSearch,
        clearSearch,
    
        // Utility
        id,
    };
    

};

export default useInventory;
