import React from 'react';

const UserTable = ({
  users,
  loading,
  updatingId,
  onRoleChange,
  onViewDetails,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-adminCardIn">
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <span className="text-4xl mb-3">👥</span>
          <p className="font-semibold text-lg text-gray-700">No users found</p>
          <p className="text-sm text-gray-400 mt-1">Try matching another keyword.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Verified</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-admin-blue to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate max-w-[180px]">{user.fullName || 'N/A'}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[180px]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800">{user.phone || 'N/A'}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[150px]">{user.address || ''}</p>
                  </td>
                  <td className="px-6 py-4">
                    {updatingId === user._id ? (
                      <div className="w-5 h-5 border-2 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <select
                        value={user.role}
                        onChange={(e) => onRoleChange(user._id, e.target.value)}
                        className={`text-xs font-semibold rounded-xl px-2.5 py-1 border-0 focus:ring-2 focus:ring-admin-blue outline-none cursor-pointer ${
                          user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      user.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewDetails(user)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-admin-blue bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onDelete(user._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
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

export default UserTable;
