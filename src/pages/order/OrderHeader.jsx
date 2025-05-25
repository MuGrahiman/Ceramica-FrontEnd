import React from "react";
import PropTypes from "prop-types";
import { formatToLocaleDateString } from "../../utils/date";
import AnimatedH1 from "../../components/AnimatedH1";
import { FiCalendar, FiCopy, FiHash } from "react-icons/fi";
import useToast from "../../hooks/useToast";

/**
 * Displays order header information with order ID and creation date
 * @param {Object} props - Component props
 * @param {Object} props.orderData - Order details
 * @param {string} props.orderData._id - Order ID
 * @param {string} props.orderData.createdAt - Order creation timestamp
 */
const OrderHeader = ({ orderData }) => {
	const showToast = useToast();

	const handleCopy = async () => {
		await navigator.clipboard.writeText(orderData._id);
		showToast("Order ID copied to clipboard", "success");
	};

	return (
		<div className="mb-8 space-y-4">
			<AnimatedH1 title="Order Details" />

			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				{/* Order ID Section */}
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<FiHash className="h-4 w-4 text-gray-400 flex-shrink-0" />
						<p className="text-xs font-medium text-gray-500 tracking-wider">
							ORDER ID
						</p>
					</div>
					<div className="flex items-center gap-1">
						<p className="font-mono text-sm text-gray-700">{orderData._id}</p>
						<button
							onClick={handleCopy}
							className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
							aria-label="Copy order ID"
							title="Copy to clipboard">
							<FiCopy className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* Order Date Section */}
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<FiCalendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
						<p className="text-xs font-medium text-gray-500 tracking-wider">
							ORDER DATE
						</p>
					</div>
					<p className="text-sm text-gray-700">
						{formatToLocaleDateString(orderData.createdAt)}
					</p>
				</div>
			</div>
		</div>
	);
};

OrderHeader.propTypes = {
	orderData: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
	}).isRequired,
};

export default React.memo(OrderHeader);
