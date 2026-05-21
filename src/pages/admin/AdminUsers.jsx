import React, { useEffect, useState } from 'react';
import { userServices } from '../../api';
import AdminAlert from '../../components/common/AdminAlert';
import AdminHeader from '../../components/common/AdminHeader';
import AdminSearch from '../../components/common/AdminSearch';
import UserTable from '../../components/admin/UserTable';
import UserDetailsModal from '../../components/admin/UserDetailsModal';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userServices.getAllUsers();
      if (res?.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user list.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    setUpdatingId(id);
    setError('');
    setMessage('');
    try {
      const res = await userServices.updateUserRole(id, newRole);
      if (res?.success) {
        setMessage('User role updated successfully!');
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        if (selectedUser && selectedUser._id === id) {
          setSelectedUser((prev) => ({ ...prev, role: newRole }));
        }
      } else {
        setError(res?.message || 'Failed to update user role.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update user role.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setError('');
    setMessage('');
    try {
      const res = await userServices.deleteUser(id);
      if (res?.success) {
        setMessage('User deleted successfully.');
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        setError(res?.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to delete user.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(searchLower) ||
      (u.email || '').toLowerCase().includes(searchLower) ||
      (u.phone || '').includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Users"
        subtitle="Manage user roles and registration accounts"
      />

      <AdminAlert message={message} error={error} />

      <AdminSearch
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email, or phone..."
        rightElement={
          <>
            Total Users: <span className="font-bold text-gray-800">{filteredUsers.length}</span>
          </>
        }
      />

      {/* Users Table */}
      <UserTable
        users={filteredUsers}
        loading={loading}
        updatingId={updatingId}
        onRoleChange={handleRoleChange}
        onViewDetails={setSelectedUser}
        onDelete={handleDelete}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        selectedUser={selectedUser}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default AdminUsers;
