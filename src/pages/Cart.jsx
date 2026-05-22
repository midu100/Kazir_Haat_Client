import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { cartServices } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCartDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await cartServices.getCart();
      if (res?.success) {
        setCart(res.data);
      } else {
        setError(res?.message || 'Failed to fetch cart');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const handleUpdateQuantity = async (itemId, currentQty, amount, stock) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return;
    if (stock && newQty > stock) return;

    try {
      const res = await cartServices.updateCartItem(itemId, newQty);
      if (res?.success) {
        setCart(res.data);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await cartServices.removeFromCart(itemId);
      if (res?.success) {
        setCart(res.data);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 font-sans">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">Your Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
          <div className="flex-[2] flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
            ))}
          </div>
          <div className="flex-1 h-64 bg-gray-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-poppins">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6 font-poppins">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md font-poppins">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-[2] flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => {
                const product = item.product;
                if (!product) return null;
                const finalImage = product.images?.[0]?.url || '/images/placeholder.png';
                const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

                return (
                  <motion.div 
                    key={item._id} 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm gap-6 hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                      <img src={finalImage} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full font-poppins">
                      <h3 className="font-semibold text-base text-gray-900 leading-tight mb-1 line-clamp-1">{product.name}</h3>
                      {item.size && <span className="text-xs text-gray-400 mb-2">Variant: {item.size}</span>}
                      {item.color && <span className="text-xs text-gray-400 mb-2">Option: {item.color}</span>}
                      <span className="text-primary font-bold text-base mt-1">৳ {itemPrice}</span>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 font-poppins">
                      <button 
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-600 text-xs font-semibold flex items-center transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Remove
                      </button>
                      
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, -1, product.stock)}
                          className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 transition-colors font-bold select-none cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, item.quantity, 1, product.stock)}
                          className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 transition-colors font-bold select-none cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="flex-1">
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl sticky top-8 font-poppins">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 text-gray-600 mb-6 text-sm">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-900">৳ {totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-xs text-gray-400">Calculated at checkout</span>
                </div>
              </div>

              <hr className="border-gray-200 mb-6" />

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-bold text-gray-900">Estimated Total</span>
                <span className="text-xl font-bold text-primary">৳ {totalPrice}</span>
              </div>

              <Link to="/checkout" className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 mb-4 text-center">
                Proceed to Checkout
              </Link>
              
              <Link to="/products" className="w-full flex items-center justify-center text-gray-600 hover:text-primary font-medium transition-colors text-center text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
