import React from "react";
import ListOptions from "./ListOptions";

const TabSwitcher = ({ tabs, activeTab, onSelectTab }) => {
	return (
		<div className="border-b border-gray-200">
			<nav className="flex -mb-px">
				<ListOptions
					OPTIONS={tabs}
					RENDER_ITEM={(tab) => (
						<button
							key={tab.key}
							onClick={() => onSelectTab(tab.key)}
							className={`w-1/2 py-4 px-1 text-center border-b-2 
                                text-md font-semibold mt-3 ${
																	activeTab === tab.key
																		? "border-blue-500 text-blue-600"
																		: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
																}`}>
							{tab.label}
						</button>
					)}
					EMPTY_MESSAGE="No Tabs available"
				/>
			</nav>
		</div>
	);
};

export default TabSwitcher;
