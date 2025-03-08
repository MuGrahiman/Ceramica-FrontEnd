import React from 'react';
import PropTypes from 'prop-types';

const CouponUser = ({ user, onSelect }) => {
    return (
        <div 
            className="flex items-center p-4  bg-white rounded-lg shadow transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => onSelect(user)}
        >
            <img 
                src={user.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                alt={`${user.firstName} ${user.lastName}`} 
                className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="text-gray-600 text-sm">{user.description}</p>
            </div>
        </div>
    );
};

CouponUser.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CouponUser;
