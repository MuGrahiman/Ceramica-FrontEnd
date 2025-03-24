/**
 * Generates an array of page numbers for pagination.
 * 
 * @param {number} currentPage - The current active page number.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} pagesToShow - The number of pages to display in the pagination.
 * @returns {number[]} - An array of page numbers to display.
 */
function generatePageNumbers ( currentPage, totalPages, pagesToShow = 10 ) {
    // Ensure pagesToShow is a positive integer
    if ( pagesToShow <= 0 ) {
        throw new Error( "pagesToShow must be a positive integer." );
    }

    // Calculate the starting page number for the pagination
    const startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor( pagesToShow / 2 ),
            totalPages - pagesToShow + 1
        )
    );

    // Calculate the ending page number for the pagination
    const endPage = Math.min( startPage + pagesToShow - 1, totalPages );

    // Generate and return the array of page numbers to display
    return Array.from(
        { length: endPage - startPage + 1 },
        ( _, index ) => startPage + index
    );
}

export default generatePageNumbers