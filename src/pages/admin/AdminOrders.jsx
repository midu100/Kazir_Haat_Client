import React, { useEffect, useState } from 'react';
import { orderServices } from '../../api';
import OrderTable from '../../components/admin/OrderTable';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderServices.getAllOrders({ limit: 1000 });
      if (res?.success) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    setError('');
    setMessage('');
    try {
      const res = await orderServices.updateOrderStatus(id, newStatus);
      if (res?.success) {
        setMessage(`Order status updated to "${newStatus}" successfully!`);
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, orderStatus: newStatus } : order
          )
        );
        // If modal is open, update selected order status too
        if (selectedOrder && selectedOrder._id === id) {
          setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
        }
      } else {
        setError(res?.message || 'Failed to update order status');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const paymentColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const orderId = order._id || '';
    const fullName = order.shippingAddress?.fullName || order.user?.fullName || '';
    const phone = order.shippingAddress?.phone || '';
    const matchesSearch =
      orderId.toLowerCase().includes(searchLower) ||
      fullName.toLowerCase().includes(searchLower) ||
      phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.orderStatus === 'pending').length,
    processing: orders.filter((o) => o.orderStatus === 'processing').length,
    shipped: orders.filter((o) => o.orderStatus === 'shipped').length,
    delivered: orders.filter((o) => o.orderStatus === 'delivered').length,
    cancelled: orders.filter((o) => o.orderStatus === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and track customer order statuses</p>
      </div>

      {/* Notifications */}
      {message && (
        <div className="p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200 animate-adminCardIn">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 animate-adminCardIn">
          {error}
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Scrollable Tabs */}
        <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-1.5 scrollbar-thin scrollbar-thumb-gray-200">
          {Object.entries(orderCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer
                ${statusFilter === status
                  ? 'bg-admin-blue text-white shadow-sm shadow-admin-blue/25'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                statusFilter === status ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search ID, name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <OrderTable
        orders={filteredOrders}
        loading={loading}
        updatingId={updatingId}
        onStatusChange={handleStatusChange}
        onViewDetails={setSelectedOrder}
        statusColor={statusColor}
        paymentColor={paymentColor}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        selectedOrder={selectedOrder}
        updatingId={updatingId}
        onStatusChange={handleStatusChange}
        statusColor={statusColor}
        paymentColor={paymentColor}
      />
    </div>
  );
};

export default AdminOrders;
