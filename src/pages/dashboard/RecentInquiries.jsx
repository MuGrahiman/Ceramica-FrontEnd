// components/RecentInquiries.jsx
import React from "react";
import PropTypes from "prop-types";
import ListContainer from "../../components/ListContainer";
import ListOptions from "../../components/ListOptions";
import { IoIosArrowForward } from "react-icons/io";
import { INQUIRIES_STATUS_COLORS } from "../../constants/dashboard";

/**
 * RecentInquiriesCard - Individual card component for displaying an inquiry
 * @param {Object} props - Component props
 * @param {string} props._id - Id of the inquirer
 * @param {string} props.name - Name of the inquirer
 * @param {string} props.subject - Inquiry subject
 * @param {'pending'|'resolved'|'cancelled'} [props.status=pending] - Status of the inquiry
 * @returns {JSX.Element} Inquiry card component
 */
const RecentInquiriesCard = ({
	_id = "",
	name = "",
	subject = "",
	status = "pending",
}) => (
	<li key={_id} className="flex items-center group cursor-pointer">
		{/* Profile avatar  */}
		<div className="h-10 w-10 mr-3 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
			<span className="text-blue-600 font-medium group-hover:font-bold">
				{name.charAt(0).toUpperCase()}
			</span>
		</div>
		{/* Inquiry content */}
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium group-hover:font-bold text-gray-900 truncate">
				{name}
			</p>
			<p className="text-xs group-hover:font-bold text-gray-500 truncate">
				{subject}
			</p>
		</div>
		{/* Status and action indicator */}
		<div className="ml-4 flex items-center">
			<span
				className={`px-2 py-1 text-xs font-medium group-hover:font-bold rounded-full ${
					INQUIRIES_STATUS_COLORS[status] || INQUIRIES_STATUS_COLORS.pending
				}`}>
				{status}
			</span>
			<IoIosArrowForward
				className="ml-1 text-gray-400 group-hover:text-gray-500"
				aria-label="View details"
			/>
		</div>
	</li>
);

RecentInquiriesCard.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	status: PropTypes.oneOf(["pending"]).isRequired,
};

/**
 * RecentInquiries - Main component displaying list of recent inquiries
 * @param {Object} props - Component props
 * @param {Array} [props.inquiries=[]] - Array of inquiry objects
 * @returns {JSX.Element} Recent inquiries list component
 */
const RecentInquiries = ({ inquiries = [] }) => (
	<ListContainer scrollable containerClassName="p-2">
		<ListOptions
			OPTIONS={inquiries.slice(0, 8)}
			RENDER_ITEM={(inquiry) => <RecentInquiriesCard {...inquiry} />}
			EMPTY_MESSAGE={"No Inquiries available"}
		/>
	</ListContainer>
);

RecentInquiries.propTypes = {
	inquiries: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			subject: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default RecentInquiries;
