// components/RecentInquiries.jsx
import React from "react";

const statusColors = {
	pending: "bg-yellow-100 text-yellow-800",
	resolved: "bg-green-100 text-green-800",
	cancelled: "bg-gray-100 text-gray-800",
};

const RecentInquiries = ({ inquiries }) => (
	<div className="row-span-3 bg-white shadow rounded-lg">
		<div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
			<span>Recent Inquiries</span>
			<button
				type="button"
				className="inline-flex items-center justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-blue-600 hover:text-blue-800"
				aria-haspopup="true"
				aria-expanded="true">
				View All
				<svg
					className="-mr-1 ml-1 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<div className="overflow-y-auto max-h-52">
			<ul className="p-6 space-y-4">
				{inquiries.slice(0, 8).map((inquiry) => (
					<li key={inquiry._id} className="flex items-center">
						<div className="h-10 w-10 mr-3 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
							{inquiry.image ? (
								<img
									src={inquiry.image}
									alt={`${inquiry.name} profile`}
									className="h-full w-full object-cover"
								/>
							) : (
								<span className="text-blue-600 font-medium">
									{inquiry.name.charAt(0)}
								</span>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 truncate">
								{inquiry.name}
							</p>
							<p className="text-xs text-gray-500 truncate">
								{inquiry.subject}
							</p>
						</div>
						<div className="ml-4 flex items-center">
							<span
								className={`px-2 py-1 text-xs font-medium rounded-full ${
									statusColors[inquiry.status]
								}`}>
								{inquiry.status}
							</span>
							<button className="ml-2 text-gray-400 hover:text-gray-500">
								<svg
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	</div>
);

export default RecentInquiries;
