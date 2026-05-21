import React from 'react';

const ProductTable = ({ products, loading, onEdit, onDelete, searchTerm }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-adminCardIn">
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <span className="text-4xl mb-3">📦</span>
          <p className="font-semibold text-lg text-gray-700">
            {searchTerm ? 'No products found' : 'No products registered yet'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm ? 'Try a different search term' : 'Start by clicking "Add Product" above'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (BDT)</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={prod.images?.[0]?.url || 'https://placehold.co/40'}
                      alt={prod.name}
                      className="w-11 h-11 object-cover rounded-xl border border-gray-100"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate max-w-[200px]">{prod.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{prod.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {prod.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {prod.discountPrice > 0 ? (
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">৳{prod.discountPrice}</span>
                        <span className="text-xs text-gray-400 line-through">৳{prod.price}</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-gray-800">৳{prod.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${prod.stock > 0 ? 'text-gray-700' : 'text-red-500'}`}>
                      {prod.stock > 0 ? prod.stock : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {prod.featured ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">⭐ Yes</span>
                    ) : (
                      <span className="text-xs text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(prod)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-admin-blue bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(prod._id)}
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

export default ProductTable;
