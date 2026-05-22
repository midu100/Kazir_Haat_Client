import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { cartServices, orderServices } from '../api';
import { motion } from 'framer-motion';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Shipping form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [shippingCharge, setShippingCharge] = useState(60); // 60 for inside Dhaka, 120 for outside Dhaka

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod or sslcommerz

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await cartServices.getCart();
        if (res?.success) {
          setCart(res.data);
          if (!res.data.items || res.data.items.length === 0) {
            navigate('/cart');
          }
        } else {
          setError(res?.message || 'Failed to fetch cart details');
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || 'Failed to load checkout details');
      } finally {
        setLoading(false);
      }
    };
    fetchCartDetails();
  }, [navigate]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if (selectedCity.toLowerCase() === 'dhaka') {
      setShippingCharge(60);
    } else {
      setShippingCharge(120);
    }
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setConfirmLoading(true);
      setError('');

      const orderData = {
        shippingAddress: {
          fullName,
          phone,
          address,
          city,
          postalCode,
          country
        },
        paymentMethod,
        shippingCharge
      };

      const res = await orderServices.placeOrder(orderData);
      
      if (res?.success) {
        // Dispatch custom event to notify Navbar that cart has been cleared
        window.dispatchEvent(new Event('cartUpdated'));

        if (paymentMethod === 'sslcommerz' && res.url) {
          // Redirect to payment gateway URL
          window.location.href = res.url;
        } else if (res.data?._id) {
          // Cash on delivery: redirect to success page
          navigate(`/order/success/${res.data._id}`);
        } else {
          setError('Order confirmation response was invalid.');
        }
      } else {
        setError(res?.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setConfirmLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 font-sans">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">Secure Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-10 animate-pulse">
          <div className="flex-[2] flex flex-col gap-6">
            <div className="h-48 bg-gray-100 rounded-2xl" />
            <div className="h-48 bg-gray-100 rounded-2xl" />
          </div>
          <div className="flex-1 h-80 bg-gray-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;
  const grandTotal = totalPrice + shippingCharge;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 font-poppins">
        <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">Secure Checkout</h1>

      {error && (
        <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 font-poppins">
          {error}
        </div>
      )}

      <form onSubmit={handleConfirmOrder} className="flex flex-col lg:flex-row gap-10">
        {/* Left: Shipping & Payment Options */}
        <div className="flex-[2] flex flex-col gap-8 font-poppins">
          
          {/* Shipping Address */}
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-primary flex items-center justify-center mr-3 text-sm font-semibold">1</span>
              Shipping Information
            </h2>
            
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50/50 focus:bg-white" 
                  placeholder="John Doe" 
                />
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50/50 focus:bg-white" 
                    placeholder="+880 1XXX-XXXXXX" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">City *</label>
                  <select 
                    required
                    value={city}
                    onChange={handleCityChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50/50 focus:bg-white"
                  >
                    <option value="">Select City</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Address *</label>
                <textarea 
                  rows="3" 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none bg-gray-50/50 focus:bg-white" 
                  placeholder="House no, Road no, Area, Post Office..."
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50/50 focus:bg-white" 
                    placeholder="1207" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Country</label>
                  <input 
                    type="text" 
                    value={country}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-gray-100 text-gray-500 cursor-not-allowed" 
                    placeholder="Bangladesh" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-primary flex items-center justify-center mr-3 text-sm font-semibold">2</span>
              Payment Method
            </h2>

            <div className="flex flex-col gap-4">
              {/* Option 1: Cash on Delivery */}
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-primary-light'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" 
                />
                <div className="ml-4 flex flex-col">
                  <span className="font-semibold text-gray-900 text-sm">Cash on Delivery (COD)</span>
                  <span className="text-xs text-gray-500 mt-0.5">Pay in cash when you receive the product.</span>
                </div>
              </label>

              {/* Option 2: SSLCommerz */}
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'sslcommerz' ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-primary-light'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="sslcommerz" 
                  checked={paymentMethod === 'sslcommerz'}
                  onChange={() => setPaymentMethod('sslcommerz')}
                  className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" 
                />
                <div className="ml-4 flex flex-col">
                  <span className="font-semibold text-gray-900 text-sm">Pay Securely Online (SSLCommerz)</span>
                  <span className="text-xs text-gray-500 mt-0.5">Pay via bKash, Nagad, Credit/Debit Card, or Net Banking.</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="flex-1">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl sticky top-8 font-poppins">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>
            
            {/* Dynamic Items List */}
            <div className="flex flex-col gap-4 mb-6 max-h-48 overflow-y-auto pr-2">
              {items.map((item) => {
                const product = item.product;
                if (!product) return null;
                const finalImage = product.images?.[0]?.url || '/images/placeholder.png';
                const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

                return (
                  <div key={item._id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={finalImage} className="w-12 h-12 rounded-lg object-cover border border-gray-250 bg-white" alt={product.name} />
                        <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 max-w-[120px] truncate">{product.name}</span>
                        {item.size && <span className="text-[10px] text-gray-400">Variant: {item.size}</span>}
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">৳ {itemPrice * item.quantity}</span>
                  </div>
                );
              })}
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">৳ {totalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-900">৳ {shippingCharge}</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-primary">৳ {grandTotal}</span>
            </div>

            <button 
              type="submit"
              disabled={confirmLoading}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {confirmLoading ? 'Confirming Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
