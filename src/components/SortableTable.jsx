import React from "react";
import Table from "./Table";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import useSort from "../hooks/useSort";

function SortableTable(props) {
  const { config, datas } = props;
  const {sortColumn,sortBy,sortedData,orderBy} = useSort(datas,config)


  const updateConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: () => (
        // <th
        //           scope="col" className="px-6 py-3"
              
        // >
          <div className="flex items-center"      onClick={() => {
            sortColumn(column.label);
          }}>
            {column.label}
            {getIcons(column.label, sortBy, orderBy)}
          </div>
        // </th>
      ),
    };
  });
  
  return (
    <div>
      {orderBy}-{sortBy}
      <Table {...props} datas={datas} config={config} />
    </div>
  );
}

function getIcons(label, sort, order) {
  if (label !== sort) {
    return (
      <div className="border">
        <GoChevronUp />
        <GoChevronDown />
      </div>
    );
  }
  if (order === null) {
    return (
      <div className="cursor-pointer hover:bg-green-100 border">
        <GoChevronUp />
        <GoChevronDown />
      </div>
    );
  } else if (order === "ASC") {
    return (
      <div className="cursor-pointer hover:bg-green-100 border">
        <GoChevronUp />
      </div>
    );
  } else if (order === "DSC") {
    return (
      <div className="cursor-pointer hover:bg-green-100 border">
        <GoChevronDown />
      </div>
    );
  }
}
export default SortableTable;
