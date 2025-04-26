import React, { useState } from "react";
import {
	FiPackage,
	FiTruck,
	FiCheckCircle,
	FiClock,
	FiXCircle,
	FiMapPin,
	FiCreditCard,
	FiDownload,
} from "react-icons/fi";

const UserOrderDetailsPage = ({ order }) => {
	const [showTrackingModal, setShowTrackingModal] = useState(false);
	const [showInvoiceModal, setShowInvoiceModal] = useState(false);

	// Mock data structure based on your schema
	const mockOrder = {
		_id: "ORD-2023-4567",
		createdAt: "2023-06-15T10:30:00Z",
		status: "shipped",
		totalAmount: 189.97,
		trackingNumber: "UPS-7890-5678",
		items: [
			{
				productId: {
					_id: "PROD-123",
					title: "Premium Ergonomic Chair",
					price: 149.99,
					coverImage: {
						url:  'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
					},
					color: {
						name: "Midnight Black",
						hex: "#000000",
					},
					size: "Standard",
				},
				quantity: 1,
			},
		],
		addressId: {
			firstName: "John",
			lastName: "Doe",
			street: "123 Main St",
			city: "New York",
			state: "NY",
			country: "USA",
			zipCode: "10001",
			phoneNumber: "+1 (555) 123-4567",
		},
		paymentId: {
			status: "completed",
			transactionId: "PAY-789XYZ",
			createTime: "2023-06-15T10:32:45Z",
			amount: {
				value: "189.97",
				currencyCode: "USD",
			},
		},
	};

	// Use mock data if no order prop is passed
	const orderData = order || mockOrder;

	const getStatusDetails = () => {
		switch (orderData.status) {
			case "processing":
				return {
					icon: <FiClock className="text-yellow-500" />,
					color: "bg-yellow-100 text-yellow-800",
					text: "Processing",
				};
			case "shipped":
				return {
					icon: <FiTruck className="text-blue-500" />,
					color: "bg-blue-100 text-blue-800",
					text: "Shipped",
				};
			case "delivered":
				return {
					icon: <FiCheckCircle className="text-green-500" />,
					color: "bg-green-100 text-green-800",
					text: "Delivered",
				};
			case "cancelled":
				return {
					icon: <FiXCircle className="text-red-500" />,
					color: "bg-red-100 text-red-800",
					text: "Cancelled",
				};
			default:
				return {
					icon: <FiClock className="text-gray-500" />,
					color: "bg-gray-100 text-gray-800",
					text: "Processing",
				};
		}
	};

	const statusDetails = getStatusDetails();

	const handleTrackPackage = () => {
		setShowTrackingModal(true);
	};

	const handleViewInvoice = () => {
		setShowInvoiceModal(true);
	};

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

	const generateMockInvoice = () => {
		return {
			invoiceNumber: `INV-${orderData._id}`,
			date: new Date().toISOString(),
			items: orderData.items.map((item) => ({
				name: item.productId.title,
				quantity: item.quantity,
				price: item.productId.price,
				total: (item.productId.price * item.quantity).toFixed(2),
			})),
			subtotal: orderData.totalAmount.toFixed(2),
			tax: (orderData.totalAmount * 0.08).toFixed(2),
			total: (orderData.totalAmount * 1.08).toFixed(2),
		};
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			{/* Order Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
					Order Details
				</h1>
				<div className="mt-2 flex items-center gap-4">
					<p className="text-gray-600">Order #{orderData._id}</p>
					<p className="text-gray-600">
						Placed on{" "}
						{new Date(orderData.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Status Banner */}
			<div
				className={`mb-8 p-4 rounded-lg ${statusDetails.color} flex items-center gap-3`}>
				{statusDetails.icon}
				<div>
					<h3 className="font-medium">Order {statusDetails.text}</h3>
					{orderData.status === "shipped" && (
						<p className="text-sm">Your order is on its way</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Order Items */}
				<div className="lg:col-span-2">
					<h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
					<div className="bg-white shadow-sm rounded-lg overflow-hidden">
						<ul className="divide-y divide-gray-200">
							{orderData.items.map((item, index) => (
								<li key={index} className="p-4 sm:p-6">
									<div className="flex items-start sm:items-center">
										<div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
											<img
												src={item.productId.coverImage.url}
												alt={item.productId.title}
												className="w-full h-full object-cover object-center"
											/>
										</div>
										<div className="ml-4 flex-1">
											<div className="flex items-center justify-between">
												<h3 className="text-base font-medium text-gray-900">
													{item.productId.title}
												</h3>
												<p className="ml-4 font-medium text-gray-900">
													${(item.productId.price * item.quantity).toFixed(2)}
												</p>
											</div>
											<div className="mt-1 flex items-center text-sm text-gray-500">
												<span className="mr-2">
													Color: {item.productId.color.name}
												</span>
												<span
													className="inline-block w-3 h-3 rounded-full border border-gray-300"
													style={{
														backgroundColor: item.productId.color.hex,
													}}></span>
											</div>
											<div className="mt-1 text-sm text-gray-500">
												Size: {item.productId.size}
											</div>
											<div className="mt-2 text-sm text-gray-500">
												Qty: {item.quantity}
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Order Summary */}
				<div>
					<h2 className="text-lg font-medium text-gray-900 mb-4">
						Order Summary
					</h2>
					<div className="bg-white shadow-sm rounded-lg overflow-hidden p-6 space-y-4">
						{/* Shipping Address */}
						<div>
							<h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
								<FiMapPin className="mr-2 text-gray-500" />
								Shipping Address
							</h3>
							<address className="text-sm not-italic text-gray-600">
								<p>
									{orderData.addressId.firstName} {orderData.addressId.lastName}
								</p>
								<p>{orderData.addressId.street}</p>
								<p>
									{orderData.addressId.city}, {orderData.addressId.state}{" "}
									{orderData.addressId.zipCode}
								</p>
								<p>{orderData.addressId.country}</p>
								<p className="mt-1">{orderData.addressId.phoneNumber}</p>
							</address>
						</div>

						{/* Payment Information */}
						<div>
							<h3 className="flex items-center text-sm font-medium text-gray-900 mb-2">
								<FiCreditCard className="mr-2 text-gray-500" />
								Payment Information
							</h3>
							<div className="text-sm text-gray-600">
								<p>PayPal Transaction</p>
								<p>Transaction ID: {orderData.paymentId.transactionId}</p>
								<p className="mt-1">
									Total: {orderData.paymentId.amount.currencyCode}{" "}
									{orderData.paymentId.amount.value}
								</p>
								<p className="mt-1">
									Status:{" "}
									<span className="capitalize">
										{orderData.paymentId.status}
									</span>
								</p>
							</div>
						</div>

						{/* Order Total */}
						<div className="border-t border-gray-200 pt-4">
							<div className="flex justify-between text-base font-medium text-gray-900">
								<p>Order Total</p>
								<p>${orderData.totalAmount.toFixed(2)}</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="pt-4 space-y-3">
							{orderData.status === "shipped" && (
								<button
									onClick={handleTrackPackage}
									className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									Track Package
								</button>
							)}
							<button
								onClick={handleViewInvoice}
								className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								View Invoice
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Tracking Modal */}
			{showTrackingModal && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-medium text-gray-900">
									Package Tracking
								</h3>
								<button
									onClick={() => setShowTrackingModal(false)}
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
										<p className="text-sm text-gray-500">
											{orderData.trackingNumber}
										</p>
									</div>
								</div>
								<div className="flow-root">
									<ul className="-mb-8">
										{generateMockTrackingData().map((event, eventIdx) => (
											<li key={eventIdx}>
												<div className="relative pb-8">
													{eventIdx !==
													generateMockTrackingData().length - 1 ? (
														<span
															className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
															aria-hidden="true"
														/>
													) : null}
													<div className="relative flex space-x-3">
														<div>
															<span
																className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
																	eventIdx === 0
																		? "bg-green-500"
																		: "bg-blue-500"
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
									onClick={() => setShowTrackingModal(false)}>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Invoice Modal */}
			{showInvoiceModal && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-medium text-gray-900">
									Order Invoice
								</h3>
								<div className="flex space-x-2">
									<button className="text-blue-600 hover:text-blue-800 flex items-center">
										<FiDownload className="mr-1" /> PDF
									</button>
									<button
										onClick={() => setShowInvoiceModal(false)}
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
							</div>
							<div className="border-b border-gray-200 pb-4 mb-4">
								<div className="flex justify-between">
									<div>
										<h4 className="text-lg font-bold">INVOICE</h4>
										<p className="text-sm text-gray-600">
											#{generateMockInvoice().invoiceNumber}
										</p>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-600">
											Date:{" "}
											{new Date(
												generateMockInvoice().date
											).toLocaleDateString()}
										</p>
										<p className="text-sm text-gray-600">
											Order: #{orderData._id}
										</p>
									</div>
								</div>
							</div>
							<div className="mb-8">
								<div className="grid grid-cols-2 gap-4 mb-4">
									<div>
										<h5 className="font-medium text-gray-900 mb-1">Bill To:</h5>
										<p className="text-sm text-gray-600">
											{orderData.addressId.firstName}{" "}
											{orderData.addressId.lastName}
											<br />
											{orderData.addressId.street}
											<br />
											{orderData.addressId.city}, {orderData.addressId.state}{" "}
											{orderData.addressId.zipCode}
											<br />
											{orderData.addressId.country}
										</p>
									</div>
									<div>
										<h5 className="font-medium text-gray-900 mb-1">
											Payment Method:
										</h5>
										<p className="text-sm text-gray-600">
											PayPal
											<br />
											Transaction ID: {orderData.paymentId.transactionId}
											<br />
											Status: {orderData.paymentId.status}
										</p>
									</div>
								</div>
							</div>
							<div className="mb-8">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Item
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Qty
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Price
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Total
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{generateMockInvoice().items.map((item, idx) => (
											<tr key={idx}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{item.name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{item.quantity}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													${item.price}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													${item.total}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="border-t border-gray-200 pt-4">
								<div className="flex justify-end">
									<div className="w-64">
										<div className="flex justify-between py-2 text-sm text-gray-600">
											<span>Subtotal</span>
											<span>${generateMockInvoice().subtotal}</span>
										</div>
										<div className="flex justify-between py-2 text-sm text-gray-600">
											<span>Tax (8%)</span>
											<span>${generateMockInvoice().tax}</span>
										</div>
										<div className="flex justify-between py-2 font-medium text-gray-900">
											<span>Total</span>
											<span>${generateMockInvoice().total}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-8 pt-4 border-t border-gray-200">
								<p className="text-sm text-gray-500">
									Thank you for your business!
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserOrderDetailsPage;
