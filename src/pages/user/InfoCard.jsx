import React from 'react';
import PropTypes from 'prop-types';

/**
 * InfoCard - Reusable card component for displaying grouped information
 * @param {string} title - Card title
 * @param {ReactNode} children - Card content
 */
const InfoCard = ({ title = "Untitled", children }) => {
    return (
        <div className="animate-slide-up bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 id="info-card-title" className="text-xl font-semibold text-gray-900">
                    {title}
                </h3>
            </div>
            <div className="px-4 py-5 sm:p-6" aria-labelledby="info-card-title">
                {children}
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default InfoCard;