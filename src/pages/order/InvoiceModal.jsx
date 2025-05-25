import React from "react";
import PropTypes from "prop-types";
import { FiPrinter, FiX } from "react-icons/fi";
import ListOptions from "../../components/ListOptions";

/**
 * Displays an order invoice in a modal dialog
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Object} props.orderData - Order details
 */
const InvoiceModal = ({ onClose, orderData }) => {
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

	const invoice = generateMockInvoice();

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
				<div className="p-6">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<h4 className="text-xl font-bold text-gray-900">Order Invoice</h4>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 transition-colors"
							aria-label="Close invoice">
							<FiX className="h-6 w-6 text-red-500 hover:scale-110" />
						</button>
					</div>

					{/* Invoice Content */}
					<div className="border-b border-gray-200 pb-4 mb-4">
						<div className="flex justify-between">
							<div>
								<h4 className="text-lg font-bold">INVOICE</h4>
								<p className="text-sm text-gray-600">
									#{invoice.invoiceNumber}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-600">
									Date: {new Date(invoice.date).toLocaleDateString()}
								</p>
								<p className="text-sm text-gray-600">Order: #{orderData._id}</p>
							</div>
						</div>
					</div>

					{/* Billing Information */}
					<div className="mb-8">
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div>
								<h5 className="font-medium text-gray-900 mb-1">Bill To:</h5>
								<p className="text-sm text-gray-600">
									{orderData.addressId.firstName} {orderData.addressId.lastName}
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

					{/* Items Table */}
					<div className="mb-8 overflow-auto">
						<table className="w-full divide-y divide-gray-200 ">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Item
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Qty
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Price
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Total
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 ">
								<ListOptions 
								OPTIONS={invoice.items} RENDER_ITEM={((item, idx) => (
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
								))} />
							</tbody>
						</table>
					</div>

					{/* Totals */}
					<div className="border-t border-gray-200 pt-4">
						<div className="flex justify-end">
							<div className="w-64">
								<div className="flex justify-between py-2 text-sm text-gray-600">
									<span>Subtotal</span>
									<span>${invoice.subtotal}</span>
								</div>
								<div className="flex justify-between py-2 text-sm text-gray-600">
									<span>Tax (8%)</span>
									<span>${invoice.tax}</span>
								</div>
								<div className="flex justify-between py-2 font-medium text-gray-900">
									<span>Total</span>
									<span>${invoice.total}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
						<p className="text-sm text-gray-500">
							Thank you for your business!
						</p>
						<button
							className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							onClick={() => console.log("Download PDF")}>
							<FiPrinter className="mr-2" />
							Print Invoice
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

InvoiceModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	orderData: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape({
				productId: PropTypes.shape({
					title: PropTypes.string.isRequired,
					price: PropTypes.number.isRequired,
				}).isRequired,
				quantity: PropTypes.number.isRequired,
			})
		).isRequired,
		totalAmount: PropTypes.number.isRequired,
		addressId: PropTypes.shape({
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			street: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			state: PropTypes.string.isRequired,
			zipCode: PropTypes.string.isRequired,
			country: PropTypes.string.isRequired,
		}).isRequired,
		paymentId: PropTypes.shape({
			transactionId: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default InvoiceModal;
