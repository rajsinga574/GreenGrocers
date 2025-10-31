import React from 'react';
import type { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">Date Placed</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? orders.map((order, index) => (
              <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.quantity} {order.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  <p className="font-semibold">No orders found.</p>
                  <p className="text-sm mt-1">Place a new order on the Order Placement page to see it here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;