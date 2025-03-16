import { useState } from 'react';

const usePagination = ( items = [], itemsPerPage ) => {
    const [ currentPage, setCurrentPage ] = useState( 1 );
    
    // alert( typeof items )
    if ( !items ) return;
    const totalPages = Math.ceil( items.length / itemsPerPage );

    const nextPage = () => {
        setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages ) );
    };

    const prevPage = () => {
        setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
    };

    const resetPage = () => {
        setCurrentPage( 1 );
    };

    const currentItems = () => {
        const startIndex = ( currentPage - 1 ) * itemsPerPage;
        return items.slice( startIndex, startIndex + itemsPerPage );
    };
    const handlePage = ( page ) => setCurrentPage( page )
    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        resetPage,
        handlePage,
        currentItems: currentItems(),
    };
};

export default usePagination;
