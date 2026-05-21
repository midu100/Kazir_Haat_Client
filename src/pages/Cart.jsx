import React from 'react';
import { Link } from 'react-router';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Pure Cold-Pressed Mustard Oil',
      size: '1 Ltr',
      price: 450,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1587049352847-4d4b12405451?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Organic Sundarban Honey',
      size: '500 gm',
      price: 800,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134a4c?q=80&w=200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-[2] flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm gap-6 hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-cover mix-blend-multiply" />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">{item.name}</h3>
                <span className="text-sm text-gray-500 mb-3">Variant: {item.size}</span>
                <span className="text-green-600 font-bold text-lg">৳ {item.price}</span>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                <button className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Remove
                </button>
                
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-3xl sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Subtotal (3 items)</span>
                <span className="font-semibold text-gray-900">৳ 1700</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Estimated Total</span>
              <span className="text-2xl font-bold text-green-600">৳ 1700</span>
            </div>

            <Link to="/checkout" className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-green-600/30 transition-all transform hover:-translate-y-0.5 mb-4">
              Proceed to Checkout
            </Link>
            
            <Link to="/" className="w-full flex items-center justify-center text-gray-600 hover:text-green-600 font-medium transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
