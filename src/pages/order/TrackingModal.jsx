import React from "react";
import { FiCheckCircle, FiPackage, FiTruck } from "react-icons/fi";

const TrackingModal = ({ onTrackingModal, trackingNumber }) => {
	const generateMockTrackingData = () => {
		return [
			{
				date: "2023-06-17 09:30",
				status: "Delivered",
				location: "New York, NY",
			},
			{
				date: "2023-06-16 07:15",
				status: "Out for delivery",
				location: "Brooklyn, NY",
			},
			{
				date: "2023-06-15 18:45",
				status: "Arrived at facility",
				location: "Jersey City, NJ",
			},
			{ date: "2023-06-15 14:20", status: "Shipped", location: "Warehouse" },
		];
	};
	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h4 className="text-lg font-medium text-gray-900">
							Package Tracking
						</h4>
						<button
							onClick={onTrackingModal}
							className="text-gray-400 hover:text-gray-500">
							<span className="sr-only">Close</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="space-y-4">
						<div className="flex items-start">
							<div className="flex-shrink-0 pt-0.5">
								<FiPackage className="h-5 w-5 text-blue-500" />
							</div>
							<div className="ml-3">
								<p className="text-sm font-medium text-gray-900">
									Tracking Number
								</p>
								<p className="text-sm text-gray-500">{trackingNumber}</p>
							</div>
						</div>
						<div className="flow-root">
							<ul className="-mb-8">
								{generateMockTrackingData().map((event, eventIdx) => (
									<li key={eventIdx}>
										<div className="relative pb-8">
											{eventIdx !== generateMockTrackingData().length - 1 ? (
												<span
													className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
													aria-hidden="true"
												/>
											) : null}
											<div className="relative flex space-x-3">
												<div>
													<span
														className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
															eventIdx === 0 ? "bg-green-500" : "bg-blue-500"
														}`}>
														{eventIdx === 0 ? (
															<FiCheckCircle className="h-5 w-5 text-white" />
														) : (
															<FiTruck className="h-5 w-5 text-white" />
														)}
													</span>
												</div>
												<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
													<div>
														<p className="text-sm text-gray-800">
															{event.status}
														</p>
														<p className="text-sm text-gray-500">
															{event.location}
														</p>
													</div>
													<div className="whitespace-nowrap text-right text-sm text-gray-500">
														<time dateTime={event.date}>{event.date}</time>
													</div>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="mt-5 sm:mt-6">
						<button
							type="button"
							className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
							onClick={onTrackingModal}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackingModal;
