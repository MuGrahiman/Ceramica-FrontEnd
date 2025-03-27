import React from 'react';
import PropTypes from 'prop-types';
import { formatToLocaleDateString } from '../../utils/date';

/**
 * InquiryInfoCard - Displays detailed inquiry information
 */
const InquiryInfoCard = ({ inquiry }) => (
  <div className="w-full  animate-slide-in-left">
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Inquiry Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Submitted on {formatToLocaleDateString(inquiry?.createdAt)}
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">From</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {inquiry?.name} ({inquiry?.email})
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Subject</dt>
            <dd className="mt-1 text-sm text-gray-900">{inquiry?.subject}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Message</dt>
            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
              {inquiry?.message}
            </dd>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50">
        <div className="text-sm text-gray-500">
          Last updated on {formatToLocaleDateString(inquiry?.updatedAt)}
        </div>
      </div>
    </div>
  </div>
);

InquiryInfoCard.propTypes = {
  inquiry: PropTypes.object.isRequired,
};

export default InquiryInfoCard;