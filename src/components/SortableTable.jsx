import React from "react";
import Table from "./Table";
import useSort from "../hooks/useSort";
import SortIcons from "./SetIcons";

function SortableTable(props) {
	const config = props.config || [],
		datas = props.data || [];

	const { sortColumn, sortBy, sortedData, orderBy } = useSort(datas, config);
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
				<div
					className="flex items-center"
					onClick={() => {
						sortColumn(column.label);
					}}>
					{column.label}
					<SortIcons label={column.label} order={orderBy} sort={sortBy} />
				</div>
				// </th>
			),
		};
	});

	return (
		<div>
			<h1>sortable table</h1>
			{orderBy}-{sortBy}
			<Table
				{...props}
				CONFIG={updateConfig}
				DATA={sortedData}
				KEYFN={(data) => data.now}
			/>
		</div>
	);
}

export default SortableTable;
