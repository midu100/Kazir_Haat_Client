import React from 'react';

const AdminAlert = ({ message, error }) => {
  if (!message && !error) return null;

  return (
    <div className="space-y-3">
      {message && (
        <div className="p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200 animate-adminCardIn flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 animate-adminCardIn flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default AdminAlert;
