import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListOptions from "./ListOptions";

/**
 * A reusable breadcrumb navigation component with customizable items and separators.
 * @param {Object[]} items - Array of breadcrumb items (required).
 * @param {string} items[].label - Display text for the breadcrumb (required).
 * @param {string} [items[].to] - Optional link path (defaults to "#").
 */
const BreadCrumb = ({ items = [] }) => {
	return (
		<nav
			className="flex text-lg font-normal font-primary"
			aria-label="Breadcrumb">
			<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
				<ListOptions
					OPTIONS={items}
					RENDER_ITEM={(item, index) => (
						<li key={item.label || index}>
							<Link
								to={item.to || "#"}
								className={`inline-flex items-center hover:text-blue-600 dark:hover:text-gray-700 ${
									index === items.length - 1
										? "text-blue-600 dark:text-gray-700"
										: "text-gray-700 dark:text-gray-500"
								}`}
								aria-current={index === items.length - 1 ? "page" : undefined}>
								{item.label}
								{index !== items.length - 1 && <ChevronSeparator />}
							</Link>
						</li>
					)}
				/>
			</ol>
		</nav>
	);
};

const ChevronSeparator = () => (
	<svg
		className="rtl:rotate-180 w-3 h-3 mx-1"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 6 10">
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m1 9 4-4-4-4"
		/>
	</svg>
);

BreadCrumb.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			to: PropTypes.string,
		})
	).isRequired,
};

export default BreadCrumb;
