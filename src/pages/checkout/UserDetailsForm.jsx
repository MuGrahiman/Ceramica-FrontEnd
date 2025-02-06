import React from "react";

const UserDetailsForm = () => {
	return (
		<div className="w-full md:w-1/2 lg:w-2/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">User Details</h2>
			<form className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							First Name
						</label>
						<input
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Last Name
						</label>
						<input
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Phone
					</label>
					<input
						type="tel"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Country
						</label>
						<input
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							State
						</label>
						<input
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Zip Code
						</label>
						<input
							type="text"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Street
					</label>
					<input
						type="text"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>
				<div className="flex gap-4">
					<button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
						Edit
					</button>
					<button
						type="button"
						className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserDetailsForm;
