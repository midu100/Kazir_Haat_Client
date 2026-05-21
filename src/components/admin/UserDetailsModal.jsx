import React from 'react';
import AdminModal from '../common/AdminModal';

const UserDetailsModal = ({ isOpen, onClose, selectedUser, onRoleChange }) => {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="User Account Details"
      subtitle={selectedUser ? `Profile information for ID: ${selectedUser._id}` : ''}
    >
      {selectedUser && (
        <div className="space-y-5 text-sm text-gray-700">
          <div className="flex items-center gap-4 bg-gray-50/50 p-4 border border-gray-100 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-admin-blue to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-admin-blue/20">
              {selectedUser.fullName ? selectedUser.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">{selectedUser.fullName || 'N/A'}</h4>
              <p className="text-xs text-gray-400">Created: {new Date(selectedUser.createdAt).toLocaleString('en-GB')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
              <span className="text-gray-900 font-semibold">{selectedUser.email}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</span>
              <span className="text-gray-900 font-semibold">{selectedUser.phone || 'Not Provided'}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">System Role</span>
              <div className="mt-1">
                <select
                  value={selectedUser.role}
                  onChange={(e) => onRoleChange(selectedUser._id, e.target.value)}
                  className={`text-xs font-semibold rounded-xl px-2.5 py-1 border focus:ring-2 focus:ring-admin-blue outline-none cursor-pointer ${
                    selectedUser.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Email Verification</span>
              <span className={`inline-flex mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                selectedUser.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {selectedUser.isVerified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery/Postal Address</span>
            <p className="text-gray-700 bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 mt-1 leading-relaxed">
              {selectedUser.address || 'No address registered.'}
            </p>
          </div>
        </div>
      )}
    </AdminModal>
  );
};

export default UserDetailsModal;
