import React from 'react';

const AdminSearch = ({ value, onChange, placeholder = 'Search...', rightElement }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="relative w-full sm:w-80">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/20 focus:bg-white transition-all"
        />
      </div>
      {rightElement && (
        <div className="text-sm text-gray-500 font-medium">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default AdminSearch;
