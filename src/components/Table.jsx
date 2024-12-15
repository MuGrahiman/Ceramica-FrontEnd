import React from "react";

function Table({ datas, config, KeyFn }) {
  
  const getClassName = (column) =>
    `px-6 py-4 ${column.hide ? `hidden ${column.showValue()}` : ""}`;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            {config.map((column) => (
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
          {datas.map((data) => (
            <tr
              key={KeyFn(data)}
              className="hover:bg-white even:bg-gray-300 odd:bg-gray-200 border-b">
              {config.map((column) => (
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
    </div>
  );
}

export default Table;
