import React from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Pagination component for navigating through multiple pages of data.
 *
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The current active page number.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {function} props.onPageChange - Function to call when the page changes.
 */
const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	pageNumbers = [],
}) => {
	return (
		<div className="w-full flex justify-between items-center space-x-2 rounded-b-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 p-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`p-2 rounded ${
					currentPage === 1
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-gray-200 dark:hover:bg-gray-600"
				}`}>
				<FaChevronLeft />
			</button>

			<div className="flex space-x-1">
				{pageNumbers.map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`px-3 py-1 rounded text-xs ${
							currentPage === page
								? "bg-blue-500 text-white"
								: "text-gray-700 dark:text-gray-400"
						} hover:bg-gray-200 dark:hover:bg-gray-600`}>
						{page}
					</button>
				))}
			</div>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`p-2 rounded ${
					currentPage === totalPages
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-gray-200 dark:hover:bg-gray-600"
				}`}>
				<FaChevronRight />
			</button>
		</div>
	);
};

Pagination.propTypes = {
	pageNumbers: PropTypes.array.isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
