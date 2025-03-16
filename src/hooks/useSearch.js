import React, { useState } from 'react'

const useSearch = () => {
    const [ search, setSearch ] = useState();

    return {
        searchTerm: search,
        handleSearch: ( { searchTerm } ) => setSearch( searchTerm ),
        clearSearch: () => setSearch()
    }
}

export default useSearch
