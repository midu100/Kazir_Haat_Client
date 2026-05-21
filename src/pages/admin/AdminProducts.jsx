import React, { useEffect, useState } from 'react';
import { productServices, categoryServices } from '../../api';
import AdminAlert from '../../components/common/AdminAlert';
import AdminHeader from '../../components/common/AdminHeader';
import AdminSearch from '../../components/common/AdminSearch';
import ProductForm from '../../components/admin/ProductForm';
import ProductTable from '../../components/admin/ProductTable';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState([]);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productServices.getProducts({ limit: 1000 }),
        categoryServices.getCategories(),
      ]);
      if (prodRes?.success) setProducts(prodRes.data);
      if (catRes?.success) setCategories(catRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products or categories data.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setDiscountPrice('');
    setCategory('');
    setStock('');
    setSize('');
    setColor('');
    setFeatured(false);
    setImages([]);
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
      formData.append('description', description);
      formData.append('price', price);
      formData.append('discountPrice', discountPrice || 0);
      formData.append('category', category);
      formData.append('stock', stock || 0);
      formData.append('featured', featured);

      if (size) {
        const sizeArr = size.split(',').map((s) => s.trim());
        formData.append('size', JSON.stringify(sizeArr));
      }
      if (color) {
        const colorArr = color.split(',').map((c) => c.trim());
        formData.append('color', JSON.stringify(colorArr));
      }
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }

      let res;
      if (editId) {
        res = await productServices.updateProduct(editId, formData);
      } else {
        res = await productServices.addProduct(formData);
      }

      if (res?.success) {
        setMessage(editId ? 'Product updated successfully!' : 'Product added successfully!');
        resetForm();
        fetchData();
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

  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setDiscountPrice(product.discountPrice || '');
    setCategory(product.category?._id || product.category || '');
    setStock(product.stock || '');
    setSize(product.size ? product.size.join(', ') : '');
    setColor(product.color ? product.color.join(', ') : '');
    setFeatured(product.featured || false);
    setFormOpen(true);
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await productServices.deleteProduct(id);
      if (res?.success) {
        setMessage('Product deleted successfully!');
        fetchData();
      } else {
        setError(res?.message || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Products"
        subtitle={`${products.length} products in your catalog`}
        buttonText={formOpen ? 'Back to List' : 'Add Product'}
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
        <ProductForm
          onSubmit={handleSubmit}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          category={category}
          setCategory={setCategory}
          categories={categories}
          stock={stock}
          setStock={setStock}
          size={size}
          setSize={setSize}
          color={color}
          setColor={setColor}
          featured={featured}
          setFeatured={setFeatured}
          setImages={setImages}
          saving={saving}
          editId={editId}
          resetForm={resetForm}
        />
      ) : (
        <>
          <AdminSearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            rightElement={<>Total Products: <span className="font-bold text-gray-800">{filteredProducts.length}</span></>}
          />
          <div className="mt-4"></div>
          <ProductTable
            products={filteredProducts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
          />
        </>
      )}
    </div>
  );
};

export default AdminProducts;
