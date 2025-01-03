import { useState } from 'react'

function useSort(datas,config) {
    const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

   const sortColumn = (column) => {
    if (sortBy && column !== sortBy) {
        setSortBy(column)
        setOrderBy('ASC')
        return
    }
    if (orderBy === null) {
      setOrderBy("ASC");
      setSortBy(column);
    } else if (orderBy === "ASC") {
      setOrderBy("DSC");
      setSortBy(column);
    } else if (orderBy === "DSC") {
      setOrderBy(null);
      setSortBy(column);
    }
  }
  let sortedData = datas;
  if (orderBy && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...datas].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = orderBy === "ASC" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return {orderBy,sortBy,sortColumn,sortedData}
}

export default useSort;
