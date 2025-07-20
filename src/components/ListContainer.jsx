// components/ListContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ListContainer - Reusable wrapper for list components
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - List items
 * @param {string} [props.listClassName] - Classes for the <ul> element
 * @param {string} [props.containerClassName] - Classes for the wrapper <div>
 * @param {boolean} [props.divideItems] - Whether to show dividers between items
 * @param {boolean} [props.scrollable] - Whether the container should be scrollable
 * @param {number} [props.maxHeight] - Max height for scrollable containers (in rem)
 */
const ListContainer = ({
  children,
  listClassName = '',
  containerClassName = '',
  divideItems = false,
  scrollable = false,
  maxHeight = 15,
}) => {
  const baseListClasses = divideItems ? 'divide-y divide-gray-200' : 'space-y-4';
  const scrollClasses = scrollable ? 'overflow-y-auto' : '';
  
  return (
    <div 
      className={`${scrollClasses} ${containerClassName} `}
      style={scrollable ? { maxHeight: `${maxHeight}rem` } : {}}
    >
      <ul className={`${baseListClasses} ${listClassName}`}>
        {children}
      </ul>
    </div>
  );
};

ListContainer.propTypes = {
  children: PropTypes.node.isRequired,
  listClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  divideItems: PropTypes.bool,
  scrollable: PropTypes.bool,
  maxHeight: PropTypes.number,
};

export default ListContainer;