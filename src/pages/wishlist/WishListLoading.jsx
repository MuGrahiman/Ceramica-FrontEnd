import React from 'react';
import LoadingTemplate from '../../components/LoadingTemplate';

/**
 * Displays a loading template for the wishlist.
 * This component can be reused for other loading states if needed.
 */
const WishListLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <LoadingTemplate message="Loading your wishlist..." />
    </div>
  );
};

export default WishListLoading;