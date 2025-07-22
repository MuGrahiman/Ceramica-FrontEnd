// components/RecentInquiries.jsx
import React from "react";
import PropTypes from "prop-types";
import ListContainer from "../../components/ListContainer";
import ListOptions from "../../components/ListOptions";
import { IoIosArrowForward } from "react-icons/io";
import { INQUIRIES_STATUS_COLORS } from "../../constants/dashboard";
import { Link } from "react-router-dom";

const inquiriesPropShape = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	status: PropTypes.oneOf(["pending"]).isRequired,
};

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
	<Link to={`/dashboard/inquiry-item/${_id}`} className="group block">
		<li
			className={`
				flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
				transform bg-white hover:shadow-md hover:scale-[1.015]
				cursor-pointer
			`}>
			{/* Profile avatar */}
			<div className="h-10 w-10 mr-3 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
				<span className="text-blue-600 font-medium group-hover:font-bold">
					{name.charAt(0).toUpperCase()}
				</span>
			</div>

			{/* Inquiry content */}
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-gray-900 truncate group-hover:font-semibold">
					{name}
				</p>
				<p className="text-xs text-gray-500 truncate group-hover:font-medium">
					{subject}
				</p>
			</div>

			{/* Status and arrow */}
			<div className="ml-4 flex items-center">
				<span
					className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
						INQUIRIES_STATUS_COLORS[status] || INQUIRIES_STATUS_COLORS.pending
					} group-hover:brightness-110`}>
					{status}
				</span>
				<IoIosArrowForward
					className="ml-1 text-gray-400 group-hover:text-gray-500 transition-colors duration-300"
					aria-label="View details"
				/>
			</div>
		</li>
	</Link>
);

RecentInquiriesCard.propTypes = inquiriesPropShape;

/**
 * RecentInquiries - Main component displaying list of recent inquiries
 * @param {Object} props - Component props
 * @param {Array} [props.inquiries=[]] - Array of inquiry objects
 * @returns {JSX.Element} Recent inquiries list component
 */
const RecentInquiries = ({ inquiries = [] }) => {
	return (
		<ListContainer scrollable containerClassName="p-2">
			<ListOptions
				OPTIONS={inquiries.slice(0, 8)}
				RENDER_ITEM={(inquiry) => <RecentInquiriesCard {...inquiry} />}
				EMPTY_MESSAGE={"No Inquiries available"}
			/>
		</ListContainer>
	);
};

RecentInquiries.propTypes = {
	inquiries: PropTypes.arrayOf(PropTypes.shape(inquiriesPropShape)).isRequired,
};

export default RecentInquiries;
