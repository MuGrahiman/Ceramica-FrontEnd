import React from "react";
import InquiryHeader from "./InquiryHeader";
import InquiryInfoCard from "./InquiryInfoCard";
import ReplyForm from "./ReplyForm";
import {
	useGetSingleInquiryQuery,
	useReplyInquiryMutation,
} from "../../redux/store";
import { useParams } from "react-router-dom";
import LoadingTemplate from "../../components/LoadingTemplate";
import useApiHandler from "../../hooks/useApiHandler";
import BreadCrumb from "../../components/BreadCrumb";
import PageTitle from "../../components/PageTitle";

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
const InquiryDetailsPage = () => {
	const { id } = useParams();
	const {
		data: inquiry,
		isLoading: fetchLoading,
		error: fetchError,
	} = useGetSingleInquiryQuery(id);
	const [handleMutation] = useApiHandler();
	const [replyToInquiry, { isLoading: isReplying, isSuccess }] = handleMutation(
		useReplyInquiryMutation
	);

	const handleSubmit = async (data) => {
		await replyToInquiry(
			{ inquiryId: id, replyData: { data } },
			{
				onSuccess: () => "Replied successfully",
				onError: (err) =>
					err.data.message || "Failed to reply. Please try again",
			}
		);
	};
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
				<PageTitle title="Inquiry Details"/>
						<BreadCrumb items={[
				{ label: "Inquiry", to: "/dashboard/inquiries" },
				{ label: inquiry._id },
			]} />

				<div className="flex flex-col  gap-8 mt-2">
					<InquiryInfoCard inquiry={inquiry} />

					<ReplyForm
						email={inquiry?.email}
						defaultSubject={`Re: ${inquiry.subject}`}
						isSending={isReplying}
						isSuccess={inquiry.status === "resolved" || isSuccess}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default InquiryDetailsPage;
