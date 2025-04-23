import React from "react";
import PropTypes from "prop-types";

/**
 * Displays a personalized greeting message for the wishlist page.
 * @param {string} wishlistUser - The name of the user.
 */
const WishlistHeader = ({ wishlistUser }) => {
  return (
    <h1
      className="text-3xl md:text-4xl text-center font-bold 
        text-gray-800 mb-8 animate-fade-in max-w-md mx-auto overflow-hidden">
      {`Hello, ${wishlistUser} ..`}
    </h1>
  );
};

WishlistHeader.propTypes = {
  wishlistUser: PropTypes.string.isRequired,
};

export default WishlistHeader;