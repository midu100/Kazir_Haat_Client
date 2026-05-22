import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { productServices, cartServices } from '../api';
import { getCookie } from '../components/common/Services';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await productServices.getProductDetails(id);
        if (res?.success && res.data) {
          setProduct(res.data);
          // Set initial active image
          if (res.data.images && res.data.images.length > 0) {
            setActiveImage(res.data.images[0].url);
          } else {
            setActiveImage('/images/placeholder.png');
          }
          // Set default size and color
          if (res.data.size && res.data.size.length > 0) {
            setSelectedSize(res.data.size[0]);
          }
          if (res.data.color && res.data.color.length > 0) {
            setSelectedColor(res.data.color[0]);
          }
        } else {
          setError(res?.message || 'Product not found');
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddToCart = async (isBuyNow = false) => {
    const token = getCookie('token');
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/signin');
      return;
    }

    try {
      setCartLoading(true);
      setError('');
      setCartSuccess(false);

      const cartData = {
        productId: id,
        quantity: Number(quantity),
        size: selectedSize,
        color: selectedColor
      };

      const res = await cartServices.addToCart(cartData);
      
      if (res?.success) {
        setCartSuccess(true);
        // Dispatch custom event to notify Navbar to update cart count
        window.dispatchEvent(new Event('cartUpdated'));

        if (isBuyNow) {
          navigate('/checkout');
        } else {
          // Reset success message after 3 seconds
          setTimeout(() => setCartSuccess(false), 3000);
        }
      } else {
        setError(res?.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to add to cart. Please try again.');
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 font-sans">
        <div className="flex flex-col md:flex-row gap-12 animate-pulse">
          {/* Left image skeleton */}
          <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl" />
              ))}
            </div>
            <div className="flex-1 bg-gray-200 rounded-2xl h-[450px]" />
          </div>
          {/* Right info skeleton */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-24 h-6 bg-gray-200 rounded-full" />
            <div className="w-3/4 h-10 bg-gray-200 rounded-lg" />
            <div className="w-1/2 h-6 bg-gray-200 rounded-lg" />
            <div className="w-1/3 h-8 bg-gray-200 rounded-lg" />
            <div className="w-full h-24 bg-gray-200 rounded-xl" />
            <div className="w-full h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 font-sans text-center">
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl p-8 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="mb-6">{error || 'Something went wrong while loading this product.'}</p>
          <Link to="/" className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPrice > 0 && product.price > product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const currentPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800"
    >
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 font-poppins">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Image Gallery */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.url)}
                  className={`w-20 h-20 shrink-0 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImage === img.url ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img.url} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main Image */}
          <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 shadow-sm relative min-h-[350px] md:min-h-[450px]">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage} 
              alt={product.name} 
              className="max-h-[450px] object-contain mix-blend-multiply" 
            />
            {discountPercentage > 0 && (
              <span className="absolute top-4 right-4 bg-save text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm font-poppins">
                Save {discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col">
          <div className={`inline-block font-semibold px-3 py-1 rounded-full text-xs w-max mb-4 font-poppins ${
            product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight font-poppins">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-amber-400 text-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(product.ratings) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-sm text-gray-500 font-poppins">({product.numOfReviews || 0} Reviews)</span>
          </div>

          <div className="flex items-end space-x-4 mb-6">
            <span className="text-3xl font-bold text-primary font-poppins">৳{currentPrice}</span>
            {product.discountPrice > 0 && (
              <span className="text-lg text-gray-400 line-through mb-1 font-poppins">৳{product.price}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
            {product.description}
          </p>

          <hr className="border-gray-200 mb-8" />

          {/* Size Variant */}
          {product.size && product.size.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 font-poppins">Select Size/Weight</h3>
              <div className="flex flex-wrap gap-2.5">
                {product.size.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all font-poppins ${
                      selectedSize === size 
                        ? 'border-primary text-primary bg-primary/5 shadow-sm font-semibold' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Variant */}
          {product.color && product.color.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3 font-poppins">Select Option</h3>
              <div className="flex flex-wrap gap-2.5">
                {product.color.map((color) => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2.5 rounded-xl border font-medium text-sm transition-all font-poppins ${
                      selectedColor === color 
                        ? 'border-primary text-primary bg-primary/5 shadow-sm font-semibold' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Success message / Error notification */}
          <AnimatePresence>
            {cartSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200 font-poppins"
              >
                Successfully added to cart!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-xl bg-white w-max overflow-hidden h-[50px] shadow-sm">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg select-none"
                disabled={product.stock <= 0}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly
                className="w-12 text-center font-bold text-gray-800 outline-none select-none font-poppins"
              />
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg select-none"
                disabled={product.stock <= 0 || quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button 
              onClick={() => handleAddToCart(false)}
              disabled={product.stock <= 0 || cartLoading}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 h-[50px] font-poppins"
            >
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => handleAddToCart(true)}
              disabled={product.stock <= 0 || cartLoading}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-gray-900/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 h-[50px] font-poppins"
            >
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100 font-poppins">
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              100% Organic & Chemical Free
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Fast Delivery inside Dhaka (24 Hours)
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Secure Payment Options (COD & SSLCommerz)
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
