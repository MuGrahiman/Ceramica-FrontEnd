import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import InfoLayout from '../../components/InfoLayout';
import ListContainer from '../../components/ListContainer';
import ListOptions from '../../components/ListOptions';
import ItemInfoIndicator from '../../components/ItemInfoIndicator';
import { formatCurrency } from '../../utils/generals';

/**
 * Displays a list of order items with subtotal calculation
 * 
 * @param {Object} props
 * @param {Array} props.orderItems - Array of order items to display
 */
const UserOrderItemsList = ({ orderItems = [] }) => {
    // Memoized calculations for performance
    const subtotal = useMemo(() => 
        orderItems.reduce(
            (acc, item) => acc + (item.productId?.price || 0) * (item.quantity || 0),
            0
        ), 
        [orderItems]
    );

    const itemCount = orderItems.length;

    return (
        <InfoLayout title="Order Items">
            <ListContainer divideItems>
                <ListOptions
                    OPTIONS={orderItems}
                    EMPTY_MESSAGE="No order items found."
                    RENDER_ITEM={(item, index) => (
                        <ItemInfoIndicator
                            key={`${item.productId?._id}-${index}`}
                            title={item.productId?.title || 'Unknown Product'}
                            coverImage={item.productId?.coverImage}
                            quantity={item.quantity || 0}
                            price={item.productId?.price || 0}
                            productId={item.productId?._id}
                            size="lg"
                        />
                    )}
                />
            </ListContainer>
            
            {/* Subtotal Section */}
            {itemCount > 0 && (
                <div
                    className="border-t border-gray-200 p-4 transition-all duration-300 ease-in-out"
                    aria-label="Order subtotal"
                >
                    <div className="mt-2 flex items-center justify-end gap-3 font-semibold">
                        <p id="product-subtotal" className="text-gray-500">
                            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):
                        </p>
                        <p className="text-gray-900">{formatCurrency(subtotal)}</p>
                    </div>
                </div>
            )}
        </InfoLayout>
    );
};

UserOrderItemsList.propTypes = {
    orderItems: PropTypes.arrayOf(PropTypes.shape({
        productId: PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            price: PropTypes.number,
            coverImage: PropTypes.string,
        }),
        quantity: PropTypes.number,
    })),
};

export default UserOrderItemsList;