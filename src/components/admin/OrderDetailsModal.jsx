import React from 'react';
import AdminModal from '../common/AdminModal';

const OrderDetailsModal = ({
  isOpen,
  onClose,
  selectedOrder,
  updatingId,
  onStatusChange,
  statusColor,
  paymentColor
}) => {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedOrder ? `Order Details #${selectedOrder._id?.slice(-6).toUpperCase()}` : ''}
      subtitle={selectedOrder ? `Placed on ${new Date(selectedOrder.createdAt).toLocaleString('en-GB')}` : ''}
    >
      {selectedOrder && (
        <div className="space-y-6">
          {/* Row 1: Shipping and Status details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Info */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
                Shipping Address
              </h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <p className="font-semibold text-gray-950">
                  {selectedOrder.shippingAddress?.fullName}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  📞 {selectedOrder.shippingAddress?.phone}
                </p>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}
                  {selectedOrder.shippingAddress?.postalCode ? ` - ${selectedOrder.shippingAddress.postalCode}` : ''}
                </p>
                <p className="text-xs text-gray-400 font-semibold uppercase mt-1">
                  {selectedOrder.shippingAddress?.country || 'Bangladesh'}
                </p>
              </div>
            </div>

            {/* Status & Payment Overview */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
                  Status Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Order Status:</span>
                    {updatingId === selectedOrder._id ? (
                      <div className="w-4 h-4 border-2 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <select
                        value={selectedOrder.orderStatus}
                        onChange={(e) => onStatusChange(selectedOrder._id, e.target.value)}
                        className={`text-xs font-semibold rounded-xl px-2.5 py-1 border-0 focus:ring-2 focus:ring-admin-blue outline-none cursor-pointer ${
                          statusColor[selectedOrder.orderStatus] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Payment Status:</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      paymentColor[selectedOrder.paymentStatus] || 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Payment Method:</span>
                    <span className="font-semibold text-gray-800 uppercase">
                      {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'SSLCommerz'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.transactionId && (
                <div className="mt-3 pt-3 border-t border-gray-200/50">
                  <p className="text-xs text-gray-500">Transaction ID:</p>
                  <p className="text-xs font-mono font-semibold text-gray-800 break-all">{selectedOrder.transactionId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
              Ordered Items ({selectedOrder.items?.length || 0})
            </h4>
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedOrder.items?.map((item) => (
                    <tr key={item._id} className="text-sm text-gray-700">
                      <td className="px-4 py-3.5 flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                            No Img
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 max-w-[200px] sm:max-w-xs truncate">{item.name}</p>
                          {(item.size || item.color) && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.size ? `Size: ${item.size}` : ''}
                              {item.size && item.color ? ' | ' : ''}
                              {item.color ? `Color: ${item.color}` : ''}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center font-medium">{item.quantity}</td>
                      <td className="px-4 py-3.5 text-right">৳{item.price?.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-gray-950">
                        ৳{(item.price * item.quantity)?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50/30 border border-gray-100 rounded-2xl p-5 max-w-sm ml-auto space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">
                ৳{(selectedOrder.totalAmount - (selectedOrder.shippingCharge || 0)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping Charge</span>
              <span className="font-medium text-gray-800">
                ৳{(selectedOrder.shippingCharge || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-bold text-gray-950 border-t border-gray-200/60 pt-2">
              <span>Total Amount</span>
              <span>৳{selectedOrder.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </AdminModal>
  );
};

export default OrderDetailsModal;
