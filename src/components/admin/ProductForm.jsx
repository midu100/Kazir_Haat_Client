import React from 'react';

const ProductForm = ({
  onSubmit,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  discountPrice,
  setDiscountPrice,
  category,
  setCategory,
  categories,
  stock,
  setStock,
  size,
  setSize,
  color,
  setColor,
  featured,
  setFeatured,
  setImages,
  saving,
  editId,
  resetForm
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 animate-adminCardIn">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {editId ? 'Edit Product Details' : 'Add New Product'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Row 1: Name + Category */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Premium Brown Rice"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
          <textarea
            required
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product ingredients, benefits..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Row 2: Price, Discount, Stock */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Regular Price (BDT) *</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="500"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Discount Price (BDT)</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="450"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity *</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="100"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Row 3: Size, Color */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sizes (Comma separated)</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 1kg, 2kg, 5kg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Colors (Comma separated)</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. red, yellow, green"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-admin-blue focus:ring-1 focus:ring-admin-blue bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-5 outline-none bg-gray-50/30 text-gray-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1.5">Select up to 5 images. New uploads will replace previous images.</p>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            id="featured-checkbox"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 text-admin-blue focus:ring-admin-blue border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="featured-checkbox" className="text-sm font-medium text-gray-700 cursor-pointer">
            Feature this product on homepage
          </label>
        </div>

        {/* Actions */}
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
            {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
