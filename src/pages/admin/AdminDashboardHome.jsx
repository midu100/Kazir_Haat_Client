import React, { useEffect, useState } from 'react';
import { dashboardServices } from '../../api';
import AdminStatsCard from '../../components/common/AdminStatsCard';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyIncome: 0,
    topBuyer: null,
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await dashboardServices.getStats();
      if (res?.success) {
        const { totalProducts, totalCategories, totalOrders, totalRevenue, monthlyIncome, topBuyer, orderStats: backendOrderStats, recentOrders: backendRecentOrders } = res.data;
        setStats({
          totalProducts,
          totalCategories,
          totalOrders,
          totalRevenue,
          monthlyIncome,
          topBuyer,
        });
        setOrderStats(backendOrderStats);
        setRecentOrders(backendRecentOrders);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
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
      label: 'Monthly Income',
      value: `৳${(stats.monthlyIncome || 0).toLocaleString()}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bg: 'bg-pink-50',
      text: 'text-pink-600',
    },
    {
      label: 'Total Revenue',
      value: `৳${(stats.totalRevenue || 0).toLocaleString()}`,
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time store metrics powered securely by server calculations.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8.89M9 11l3-3 3 3m-3-3v12" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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

      {/* Top Buyer and Order Status Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Buyer Details */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between animate-adminCardIn" style={{ animationDelay: '300ms' }}>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Top Customer</h2>
              <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider">MVP</span>
            </div>
            {stats.topBuyer ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-500/10">
                    {stats.topBuyer.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{stats.topBuyer.fullName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{stats.topBuyer.email}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Contact Phone:</span>
                    <span className="font-semibold text-gray-700">{stats.topBuyer.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Orders Completed:</span>
                    <span className="font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">{stats.topBuyer.orderCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-3">
                    <span className="text-gray-400 font-medium">Total Spent:</span>
                    <span className="font-extrabold text-sm text-indigo-600">৳{stats.topBuyer.totalSpent?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                <span className="text-2xl mb-2">💎</span>
                <p className="text-xs">No buyer data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Status Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-adminCardIn" style={{ animationDelay: '350ms' }}>
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

