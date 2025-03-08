import React, { useEffect, useState } from "react";
import SuccessPaymentCard from "../success/SuccessPaymentCard";
import Skeleton from "../../components/Skeleton";
import SortableTable from "../../components/SortableTable";
import demoData from "./DemoData.json";
import Table from "../../components/Table";
import useSortTable from "../../hooks/useSortTable";
import SortIcons from "../../components/SetIcons";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
// Now you can use the coupons array

function DemoPage() {
	const navigate = useNavigate();
	const [coupons, setCoupons] = useState(demoData);
	const KeyFn = () => Date.now();
	const data = [
		{ name: "Orange", color: "bg-orange-500", score: 5 },
		{ name: "Apple", color: "bg-red-500", score: 2 },
		{ name: "Banana", color: "bg-yellow-500", score: 4 },
		{ name: "Lime", color: "bg-green-500", score: 1 },
	];
	const config = [
		{
			label: "Name",
			render: (data) => data.name,
			sortValue: (value) => value.name,
		},
		{
			label: "Color",
			render: (data) => <div className={`p-3 ${data.color} m-2 `}></div>,
		},
		{
			label: "Score",
			render: (data) => data.score,
			sortValue: (value) => value.score,
		},
	];
	const { updateConfig, sortedData } = useSortTable(data, config);
	const { currentPage, totalPages, handlePage, currentItems } = usePagination(
		sortedData,
		5
	);
	return (
		<div className="container mx-auto">
			<Table
				CONFIG={updateConfig(({ sortColumn, label, order, sort }) => (
					<div className="flex items-center" onClick={() => sortColumn(label)}>
						{label}
						<SortIcons label={label} order={order} sort={sort} />
					</div>
				))}
				onRowNavigate={(data) => navigate(data)}
				DATA={currentItems}
				KEYFN={(data) => data.now}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePage}
			/>
		</div>
	);
}

export default DemoPage;
