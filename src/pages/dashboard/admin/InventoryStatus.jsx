// components/InventoryStatus.jsx
import React from 'react';

const InventoryStatus = ({ inventory }) => {
  const lowStockItems = inventory.filter(item => item.stock < 10);
  const activeItems = inventory.filter(item => item.status === 'active');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Status</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total Products</p>
          <p className="text-2xl font-bold text-blue-900">{inventory.length}</p>
        </div>
        <div className={`p-4 rounded-lg ${lowStockItems.length > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
          <p className="text-sm">Low Stock Items</p>
          <p className={`text-2xl font-bold ${lowStockItems.length > 0 ? 'text-red-900' : 'text-green-900'}`}>
            {lowStockItems.length}
          </p>
        </div>
      </div>
      
      <h4 className="text-md font-medium text-gray-700 mb-2">Recently Added</h4>
      <ul className="space-y-3">
        {inventory.slice(0, 3).map(item => (
          <li key={item._id} className="flex items-center">
            <img 
              src={item.coverImage.url} 
              alt={item.title} 
              className="h-10 w-10 rounded-md object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500">
                Stock: {item.stock} | ${item.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryStatus;