import React, { useState } from 'react';
import { Link } from 'react-router';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/cart" className="hover:text-green-600 transition-colors">Cart</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Forms */}
        <div className="flex-[2] flex flex-col gap-8">
          
          {/* Shipping Address */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">1</span>
              Shipping Information
            </h2>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all" placeholder="John" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all" placeholder="+880 1XXX-XXXXXX" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                <textarea rows="3" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all resize-none" placeholder="House no, Road no, Area, City..."></textarea>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">2</span>
              Payment Method
            </h2>

            <div className="flex flex-col gap-4">
              {/* Option 1: Cash on Delivery */}
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-green-300'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" 
                />
                <div className="ml-4 flex flex-col">
                  <span className="font-semibold text-gray-900">Cash on Delivery</span>
                  <span className="text-sm text-gray-500">Pay when you receive the product.</span>
                </div>
              </label>

              {/* Option 2: bKash/Nagad */}
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'mobile' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-green-300'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="mobile" 
                  checked={paymentMethod === 'mobile'}
                  onChange={() => setPaymentMethod('mobile')}
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" 
                />
                <div className="ml-4 flex flex-col">
                  <span className="font-semibold text-gray-900">Mobile Banking (bKash/Nagad)</span>
                  <span className="text-sm text-gray-500">Pay securely via your mobile wallet.</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="flex-1">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>
            
            {/* Minimal Item List */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1587049352847-4d4b12405451?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white" alt="Product" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">Mustard Oil (1L)</span>
                </div>
                <span className="font-medium text-gray-900">৳ 900</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1587049352851-8d4e89134a4c?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white" alt="Product" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">1</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">Organic Honey</span>
                </div>
                <span className="font-medium text-gray-900">৳ 800</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">৳ 1700</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-900">৳ 60</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-green-600">৳ 1760</span>
            </div>

            <button className="w-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-gray-900/20 transition-all transform hover:-translate-y-0.5">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
