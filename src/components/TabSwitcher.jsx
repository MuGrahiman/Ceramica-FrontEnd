import React from "react";
import PropTypes from "prop-types"; // Suggested addition
import ListOptions from "./ListOptions";

/**
 * Tab navigation component with stateful switching.
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects {key: string, label: string}
 * @param {string} props.activeTab - Currently active tab key
 * @param {function} props.onSelectTab - (tabKey: string) => void
 */
const TabSwitcher = ({ tabs = [], activeTab = "", onSelectTab = () => {} }) => {
	return (
		<div className="border-b border-gray-200">
			<nav className="flex -mb-px" role="tablist">
				<ListOptions
					OPTIONS={tabs}
					RENDER_ITEM={(tab) => (
						<button
							key={tab.key}
							onClick={() => onSelectTab(tab.key)}
							className={`w-1/2 py-4 px-1 text-center border-b-2 
                  						text-md font-semibold mt-3 
										${
											activeTab === tab.key
												? "border-blue-500 text-blue-600"
												: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
										}`}
							aria-selected={activeTab === tab.key}
							aria-controls={`panel-${tab.key}`}
							role="tab">
							{tab.label}
						</button>
					)}
					EMPTY_MESSAGE="No Tabs available"
				/>
			</nav>
		</div>
	);
};

TabSwitcher.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	activeTab: PropTypes.string.isRequired,
	onSelectTab: PropTypes.func.isRequired,
};

export default TabSwitcher;
