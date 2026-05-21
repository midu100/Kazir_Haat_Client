import React from 'react';

const AdminHeader = ({ title, subtitle, buttonText, buttonIcon, onButtonClick, buttonStyle }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer ${
            buttonStyle || 'bg-admin-blue text-white hover:bg-admin-blue-dark shadow-admin-blue/20'
          }`}
        >
          {buttonIcon && <span className="flex-shrink-0">{buttonIcon}</span>}
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default AdminHeader;
