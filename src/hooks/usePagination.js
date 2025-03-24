import { useEffect, useState } from 'react';
import generatePageNumbers from '../utils/pagination';

/**
 * Custom hook for pagination functionality.
 * 
 * @param {Array} data - The array of items to paginate.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @returns {Object} - An object containing pagination state and functions.
 */
const usePagination = (data = [], itemsPerPage = 10) => {
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [items, setItems] = useState(data);
    const [totalPages, setTotalPages] = useState(Math.ceil(data?.length / itemsPerPage));    

    useEffect(() => {
        setItems(data);
        setTotalPages(Math.ceil(data?.length / itemsPerPage));
        setCurrentPage(1); 
    }, [data, itemsPerPage]);

    const nextPage = () => {
        setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages ) );
    };

    const prevPage = () => {
        setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
    };

    const resetPage = () => {
        setCurrentPage( 1 );
    };

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items?.slice(startIndex, startIndex + itemsPerPage);
    };

    const handlePage = ( page ) => setCurrentPage( page )


    return {
        pageNumbers: generatePageNumbers( currentPage, totalPages ) || [],
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        resetPage,
        handlePage,
        currentItems: getCurrentItems(),
    };
};

export default usePagination;
