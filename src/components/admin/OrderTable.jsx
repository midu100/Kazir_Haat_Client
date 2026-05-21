import React from 'react';

const OrderTable = ({
  orders,
  loading,
  updatingId,
  onStatusChange,
  onViewDetails,
  statusColor,
  paymentColor
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-adminCardIn">
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <span className="text-4xl mb-3">📋</span>
          <p className="font-semibold text-lg text-gray-700">No orders found</p>
          <p className="text-sm text-gray-400 mt-1">There are no orders matching your filter criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    #{order._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {order.shippingAddress?.fullName || order.user?.fullName || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400">{order.shippingAddress?.phone || ''}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    ৳{order.totalAmount?.toLocaleString()}
                    <span className="block text-[10px] text-gray-400 font-normal">
                      {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        paymentColor[order.paymentStatus] || 'bg-gray-100 text-gray-600'
                      }`}>
                        {order.paymentStatus}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase font-medium">
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'SSLCommerz'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {updatingId === order._id ? (
                      <div className="w-5 h-5 border-2 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <select
                        value={order.orderStatus}
                        onChange={(e) => onStatusChange(order._id, e.target.value)}
                        className={`text-xs font-semibold rounded-xl px-2.5 py-1 border-0 focus:ring-2 focus:ring-admin-blue outline-none cursor-pointer ${
                          statusColor[order.orderStatus] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-admin-blue bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
