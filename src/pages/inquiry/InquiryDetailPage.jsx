import React from "react";
import InquiryHeader from "./InquiryHeader";
import InquiryInfoCard from "./InquiryInfoCard";
import ReplyForm from "./ReplyForm";
import { useGetSingleInquiryQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import LoadingTemplate from "../../components/LoadingTemplate";

/**
 * InquiryDetailPage - Displays customer inquiry details and reply form
 *
 * @param {Object} inquiry - Inquiry details object
 * @param {string} inquiry._id - Unique identifier
 * @param {string} inquiry.name - Customer name
 * @param {string} inquiry.email - Customer email
 * @param {string} inquiry.subject - Inquiry subject
 * @param {string} inquiry.message - Inquiry message
 * @param {'pending'|'resolved'} inquiry.status - Current status
 * @param {string} inquiry.createdAt - ISO date string
 * @param {string} inquiry.updatedAt - ISO date string
 */
const InquiryDetailPage = () => {
	const { id } = useParams();
	const {
		data: inquiry,
		isLoading: fetchLoading,
		error: fetchError,
	} = useGetSingleInquiryQuery(id);

    if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inquiries, please wait..." />
			</div>
		);
	}

	// Handle error state
	if (fetchError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching inquiries. Please try again later.</p>
			</div>
		);
	}
	return (
		<div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<InquiryHeader title="Inquiry Details" status={inquiry.status} />

				<div className="flex flex-col  gap-8">
					<InquiryInfoCard inquiry={inquiry} />

					<ReplyForm
						email={inquiry?.email}
						defaultSubject={`Re: ${inquiry.subject}`}
					/>
				</div>
			</div>
		</div>
	);
};


export default InquiryDetailPage;
