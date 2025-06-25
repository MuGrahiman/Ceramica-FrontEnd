import React from "react";

const StatsBar = ({aboutData}) => {

	return (
		<div className="bg-amber-900 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					{aboutData.stats.map((stat, index) => (
						<div key={index} className="p-4">
							<p className="text-3xl font-bold mb-1">{stat.value}</p>
							<p className="text-sm uppercase tracking-wider">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StatsBar;
