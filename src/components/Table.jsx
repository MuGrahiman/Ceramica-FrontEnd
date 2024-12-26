import React from "react";
import Pagination from "./Pagination";

function Table({
	DATA,
	CONFIG,
	CURRENT_PAGE,
	TOTAL_PAGES,
	HANDLE_PAGE_CHANGE,
	KEYFN,
}) {
	const getClassName = (column) =>
		`px-6 py-4 ${column.hide ? `hidden ${column.showValue()}` : ""}`;

	return (
		<div className="overflow-x-auto shadow-md my-3 rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right  dark:text-gray-600">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr className="border-b">
						{CONFIG.map((column) => (
							<th
								key={column.label}
								aria-hidden={column.hide || undefined}
								className={getClassName(column)}>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{DATA &&
						DATA.map((data) => (
							<tr
								key={KEYFN(data)}
								className="hover:bg-white even:bg-gray-300 odd:bg-gray-200 border-b">
								{CONFIG.map((column) => (
									<td
										key={column.label}
										aria-hidden={column.hide || undefined}
										className={getClassName(column)}>
										{column.render(data)}
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
			<Pagination
				currentPage={CURRENT_PAGE}
				totalPages={TOTAL_PAGES}
				onPageChange={HANDLE_PAGE_CHANGE}
			/>
		</div>
	);
}

export default Table;
