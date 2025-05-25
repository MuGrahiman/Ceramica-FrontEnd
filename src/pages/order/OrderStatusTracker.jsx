import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import ListOptions from "../../components/ListOptions";
import {
	ORDER_STATUS,
	ORDER_STATUS_COLOR_VARIANTS,
} from "../../constants/order";

/**
 * Icon component for progress tracker
 * @param {Object} props
 * @param {React.Component} props.Icon - Icon component to display
 * @param {boolean} props.completed - Whether step is completed
 * @param {boolean} props.current - Whether step is current
 * @param {boolean} props.next - Whether step is next in sequence
 * @param {string} props.color - Color for the icon
 */
const ProgressIcon = ({ Icon, completed, current, next, color }) => {
	const baseClasses =
		"mt-0 md:mt-7 ml-[5rem] md:ml-0 rounded-full text-center px-2 border-4 w-10 h-10";

	const statusClasses =
		completed || current
			? ORDER_STATUS_COLOR_VARIANTS.green
			: next
			? color
			: ORDER_STATUS_COLOR_VARIANTS.gray;

	return completed || current ? (
		<FaCheck className={`${baseClasses} ${statusClasses}`} />
	) : (
		<Icon className={`${baseClasses} ${statusClasses}`} />
	);
};

ProgressIcon.propTypes = {
	Icon: PropTypes.elementType.isRequired,
	completed: PropTypes.bool,
	current: PropTypes.bool,
	next: PropTypes.bool,
	color: PropTypes.oneOf(Object.keys(ORDER_STATUS_COLOR_VARIANTS)).isRequired,
};

/**
 * Connector between progress steps
 * @param {Object} props
 * @param {boolean} props.isConnected - Whether connector should be active
 */
const ProgressConnector = ({ isConnected }) => {
	const connectorRef = useRef(null);

	useEffect(() => {
		if (connectorRef.current) {
			if (isConnected) {
				connectorRef.current.classList.remove("w-0", "h-0");
				connectorRef.current.classList.add("w-full", "h-full");
			} else {
				connectorRef.current.classList.remove("w-full", "h-full");
				connectorRef.current.classList.add("w-0", "h-0");
			}
		}
	}, [isConnected]);

	return (
		<div className="w-1.5 md:w-1/6 h-24 md:h-1.5 flex items-center">
			<div className="w-full h-full bg-gray-300 rounded">
				<div
					ref={connectorRef}
					className={`h-full rounded bg-green-500 transition-all duration-500 ease-in-out ${
						isConnected ? "w-full h-full" : "w-0 h-0"
					}`}
				/>
			</div>
		</div>
	);
};

ProgressConnector.propTypes = {
	isConnected: PropTypes.bool,
};

/**
 * Displays cancellation message
 * @param {Object} props
 * @param {string} props.color - Color variant for banner
 */
const CancellationBanner = () => (
	<div
		className={`${ORDER_STATUS_COLOR_VARIANTS.red} px-6 py-4 my-4 rounded-lg   mx-auto mt-10 animate-fade-in`}>
		<h2 className="text-lg font-semibold mb-2">We're Sorry to See You Go!</h2>
		<p className="mb-4">
			Remember, our products are crafted with care to enhance your experience.
			If you have any concerns or questions, we're here to help. Don’t miss out
			on the benefits our product offers—let us assist you in making the right
			choice. Your satisfaction is our priority!
		</p>
		<a
			href="/contact"
			className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
			Contact Us
		</a>
	</div>
);

/**
 * Displays a visual progress tracker for order status
 * @param {Object} props - Component props
 * @param {Array} props.statusSteps - Array of status step configurations
 * @returns {React.Element} - Progress tracker component
 */
const OrderStatusTracker = ({
	status = ORDER_STATUS.ORDERED,
	statusSteps = [],
}) => {
	const currentIndex = Math.max(
		0,
		statusSteps.findIndex((step) => step.id === status)
	);
	const currentColor = statusSteps[currentIndex].color;

	if (status === ORDER_STATUS.CANCELLED) {
		return <CancellationBanner color={currentColor} />;
	}

	return (
		<div
			className="flex md:block w-full my-4  pb-4"
			role="progressbar"
			aria-valuenow={currentIndex + 1}
			aria-valuemin="1"
			aria-valuemax={statusSteps.length}>
			<div className="flex flex-col md:flex-row items-center justify-start">
				<ListOptions
					OPTIONS={statusSteps}
					RENDER_ITEM={(step, index) => {
						const isCompleted = index < currentIndex;
						const isCurrent = index === currentIndex;
						const isNext = index === currentIndex + 1;
						const isLast = index === statusSteps.length - 2;
						const isCancelled = step.id === ORDER_STATUS.CANCELLED;

						return (
							!isCancelled && (
								<React.Fragment key={step.id}>
									<div className="flex-1 w-full">
										<div className="flex md:flex-col flex-row items-center justify-between md:justify-center text-xs content-center gap-3">
											<ProgressIcon
												Icon={step.icon}
												completed={isCompleted}
												current={isCurrent}
												next={isNext}
												color={currentColor}
											/>
											<h4
												className={`font-medium leading-tight ${
													isCompleted || isCurrent
														? "text-gray-800"
														: "text-gray-500"
												}`}>
												{step.label}
											</h4>
										</div>
									</div>
									{!isLast && !isCancelled && (
										<ProgressConnector isConnected={isCompleted || isCurrent} />
									)}
								</React.Fragment>
							)
						);
					}}
				/>
			</div>
		</div>
	);
};

OrderStatusTracker.propTypes = {
	status: PropTypes.oneOf(Object.values(ORDER_STATUS)).isRequired,
	statusSteps: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOf(Object.values(ORDER_STATUS)).isRequired,
			label: PropTypes.string.isRequired,
			icon: PropTypes.elementType.isRequired,
			color: PropTypes.oneOf(Object.keys(ORDER_STATUS_COLOR_VARIANTS)),
		}).isRequired
	),
};

export default OrderStatusTracker;
