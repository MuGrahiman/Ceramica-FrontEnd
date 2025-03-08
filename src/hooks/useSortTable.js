import { useState } from 'react'
import { handleIteration } from '../utils/generals';

function useSortTable ( collection, config ) {
  const [ orderBy, setOrderBy ] = useState( null );
  const [ sortBy, setSortBy ] = useState( null );

  const sortColumn = ( column ) => {
    if ( sortBy && column !== sortBy ) {
      setSortBy( column )
      setOrderBy( 'ASC' )
      return
    }
    if ( orderBy === null ) {
      setOrderBy( "ASC" );
      setSortBy( column );
    } else if ( orderBy === "ASC" ) {
      setOrderBy( "DSC" );
      setSortBy( column );
    } else if ( orderBy === "DSC" ) {
      setOrderBy( null );
      setSortBy( column );
    }
  }
  let sortedData = collection;
  if ( orderBy && sortBy ) {
    const { sortValue } = config.find( ( column ) => column.label === sortBy );
    sortedData = [ ...collection ].sort( ( a, b ) => {
      const valueA = sortValue( a );
      const valueB = sortValue( b );

      const reverseOrder = orderBy === "ASC" ? 1 : -1;
      if ( typeof valueA === "string" ) {
        return valueA.localeCompare( valueB ) * reverseOrder;
      } else {
        return ( valueA - valueB ) * reverseOrder;
      }
    } );
  }

  const updateConfig = ( update ) => handleIteration( config, ( ( column ) => {
    if ( !column.sortValue ) {
      return column;
    }
    
    return {
      ...column,
      header: update( {
        sortColumn,
        label: column.label,
        order: orderBy,
        sort: sortBy
      } )

    };
  } ) );

  return { updateConfig, sortedData }
}

export default useSortTable;
