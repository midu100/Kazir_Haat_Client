import React, { useEffect, useState } from 'react';
import { productServices, categoryServices, orderServices } from '../../api';
import AdminStatsCard from '../../components/common/AdminStatsCard';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, orderRes] = await Promise.all([
        productServices.getProducts({ limit: 1000 }),
        categoryServices.getCategories(),
        orderServices.getAllOrders({ limit: 1000 }),
      ]);

      const products = prodRes?.success ? prodRes.data : [];
      const categories = catRes?.success ? catRes.data : [];
      const orders = orderRes?.success ? orderRes.data : [];

      // Calculate revenue from delivered/paid orders
      const revenue = orders.reduce((sum, o) => {
        if (o.paymentStatus === 'paid' || o.orderStatus === 'delivered') {
          return sum + (o.totalAmount || 0);
        }
        return sum;
      }, 0);

      // Order status counts
      const statusCounts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
      orders.forEach((o) => {
        if (statusCounts.hasOwnProperty(o.orderStatus)) {
          statusCounts[o.orderStatus]++;
        }
      });

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
      });
      setOrderStats(statusCounts);
      setRecentOrders(orders.slice(0, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
    {
      label: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
  ];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <AdminStatsCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            bg={card.bg}
            text={card.text}
            delay={idx * 80}
          />
        ))}
      </div>

      {/* Order Status Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-adminCardIn" style={{ animationDelay: '350ms' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-5">Order Status Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(orderStats).map(([status, count]) => (
            <div key={status} className="text-center p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-adminCardIn" style={{ animationDelay: '450ms' }}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm font-semibold text-admin-blue hover:text-admin-blue-dark transition-colors">
            View All →
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            <span className="text-4xl mb-3">📋</span>
            <p className="font-semibold text-lg text-gray-700">No orders yet</p>
            <p className="text-sm text-gray-400 mt-1">Orders will appear here once customers place them.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      #{order._id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">{order.user?.fullName || order.shippingAddress?.fullName || 'N/A'}</p>
                      <p className="text-xs text-gray-400">{order.user?.email || ''}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      ৳{order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${paymentColor[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[order.orderStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
