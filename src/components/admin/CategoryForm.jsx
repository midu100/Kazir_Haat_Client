import React from 'react';

const CategoryForm = ({
  onSubmit,
  name,
  setName,
  status,
  setStatus,
  setImage,
  resetForm,
  saving,
  editId
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 animate-adminCardIn">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {editId ? 'Edit Category' : 'Add New Category'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. মশলা, চাল ও ডাল"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-3 outline-none bg-gray-50/30 text-gray-500 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 rounded-xl bg-admin-blue hover:bg-admin-blue-dark text-sm font-semibold text-white shadow-sm shadow-admin-blue/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : editId ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
