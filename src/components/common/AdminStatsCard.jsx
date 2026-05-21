import React from 'react';

const AdminStatsCard = ({ label, value, icon, bg, text, delay }) => {
  return (
    <div
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-adminCardIn"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${text}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};

export default AdminStatsCard;
