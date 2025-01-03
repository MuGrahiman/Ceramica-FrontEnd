import React from "react";
import PropTypes from "prop-types"; 
import Pagination from "./Pagination";

/**
 * Table component that renders a data table with pagination.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.DATA - Data to be displayed in the table.
 * @param {Array} props.CONFIG - Configuration for table columns.
 * @param {number} props.CURRENT_PAGE - Current active page number.
 * @param {number} props.TOTAL_PAGES - Total number of pages for pagination.
 * @param {function} props.HANDLE_PAGE_CHANGE - Function to handle page changes.
 * @param {function} props.KEYFN - Function to generate keys for table rows.
 */
function Table({
    DATA,
    CONFIG,
    CURRENT_PAGE,
    TOTAL_PAGES,
    HANDLE_PAGE_CHANGE,
    KEYFN,
}) {
    // Returns the class name for a table column based on visibility settings
    const getClassName = (column) =>
        `px-6 py-4 ${column.hide ? `hidden ${column.showValue()}` : ""}`;

    return (
        <div className="overflow-x-auto shadow-md mt-3 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right dark:text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="border-b">
                        {CONFIG.map((column) => (
                            <th
                                key={column.label}
                                aria-hidden={column.hide || undefined}
                                className={getClassName(column)}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {DATA && DATA.map((data) => (
                        <tr
                            key={KEYFN(data)}
                            className="hover:bg-white even:bg-gray-300 odd:bg-gray-200 border-b"
                        >
                            {CONFIG.map((column) => (
                                <td
                                    key={column.label}
                                    aria-hidden={column.hide || undefined}
                                    className={getClassName(column)}
                                >
                                    {column.render(data)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
          
        </div>
    );
}

// PropTypes validation for the Table component
Table.propTypes = {
    DATA: PropTypes.array.isRequired,
    CONFIG: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            hide: PropTypes.bool,
            showValue: PropTypes.func,
            render: PropTypes.func.isRequired,
        })
    ).isRequired,
    CURRENT_PAGE: PropTypes.number.isRequired,
    TOTAL_PAGES: PropTypes.number.isRequired,
    HANDLE_PAGE_CHANGE: PropTypes.func.isRequired,
    KEYFN: PropTypes.func.isRequired,
};

export default Table;
