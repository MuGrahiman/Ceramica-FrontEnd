import React from "react";

const SavedAddresses = () => {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 overflow-y-auto">
			<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
			<div className="space-y-4">
				{/* Address Card */}
				<div className="p-4 border rounded-lg">
					<p className="font-medium">John Doe</p>
					<p className="text-sm text-gray-600">123 Main St, Apt 4B</p>
					<p className="text-sm text-gray-600">New York, NY 10001</p>
					<p className="text-sm text-gray-600">USA</p>
				</div>
				{/* Add more address cards here */}
			</div>
		</div>
	);
};

export default SavedAddresses;
