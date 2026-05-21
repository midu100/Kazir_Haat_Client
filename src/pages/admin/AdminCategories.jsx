import React, { useEffect, useState } from 'react';
import { categoryServices } from '../../api';
import AdminAlert from '../../components/common/AdminAlert';
import AdminHeader from '../../components/common/AdminHeader';
import CategoryForm from '../../components/admin/CategoryForm';
import CategoryTable from '../../components/admin/CategoryTable';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryServices.getCategories();
      if (res?.success) setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setStatus('active');
    setImage(null);
    setEditId(null);
    setFormOpen(false);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('status', status);
      if (image) formData.append('image', image);

      let res;
      if (editId) {
        res = await categoryServices.updateCategory(editId, formData);
      } else {
        res = await categoryServices.createCategory(formData);
      }

      if (res?.success) {
        setMessage(editId ? 'Category updated successfully!' : 'Category created successfully!');
        resetForm();
        fetchCategories();
      } else {
        setError(res?.message || 'Action failed');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setStatus(cat.status || 'active');
    setImage(null);
    setFormOpen(true);
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await categoryServices.deleteCategory(id);
      if (res?.success) {
        setMessage('Category deleted successfully!');
        fetchCategories();
      } else {
        setError(res?.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Categories"
        subtitle="Manage your product categories"
        buttonText={formOpen ? 'Back to List' : 'Add Category'}
        buttonIcon={
          formOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          )
        }
        onButtonClick={() => {
          resetForm();
          setFormOpen(!formOpen);
        }}
        buttonStyle={
          formOpen
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-admin-blue text-white hover:bg-admin-blue-dark shadow-admin-blue/20'
        }
      />

      <AdminAlert message={message} error={error} />

      {formOpen ? (
        <CategoryForm
          onSubmit={handleSubmit}
          name={name}
          setName={setName}
          status={status}
          setStatus={setStatus}
          setImage={setImage}
          resetForm={resetForm}
          saving={saving}
          editId={editId}
        />
      ) : (
        <CategoryTable
          categories={categories}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminCategories;
