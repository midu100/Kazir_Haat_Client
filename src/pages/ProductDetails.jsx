import React, { useState } from 'react';
import { Link } from 'react-router';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('https://images.unsplash.com/photo-1587049352847-4d4b12405451?q=80&w=800&auto=format&fit=crop');

  const images = [
    'https://images.unsplash.com/photo-1587049352847-4d4b12405451?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587049352851-8d4e89134a4c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Premium Mustard Oil</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Image Gallery */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 shrink-0 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeImage === img ? 'border-green-600 shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-gray-100 shadow-sm">
            <img src={activeImage} alt="Product" className="max-h-[500px] object-contain mix-blend-multiply" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs w-max mb-4">
            In Stock
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">Pure Cold-Pressed Mustard Oil</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <span className="text-sm text-gray-500">(124 Reviews)</span>
          </div>

          <div className="flex items-end space-x-4 mb-6">
            <span className="text-3xl font-bold text-green-600">৳ 450</span>
            <span className="text-lg text-gray-400 line-through mb-1">৳ 550</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            Experience the authentic taste and health benefits of our 100% pure, cold-pressed mustard oil. Sourced from the finest local farms, it adds a rich, pungent flavor to your daily cooking. Perfect for traditional Bengali recipes and marinades.
          </p>

          <hr className="border-gray-200 mb-8" />

          {/* Size/Weight Variant */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Select Weight</h3>
            <div className="flex space-x-3">
              {['500 ml', '1 Ltr', '2 Ltr', '5 Ltr'].map((size, idx) => (
                <button key={idx} className={`px-5 py-2 rounded-xl border font-medium transition-all ${idx === 1 ? 'border-green-600 text-green-600 bg-green-50' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-xl bg-white w-max overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity} 
                readOnly
                className="w-12 text-center font-semibold text-gray-800 outline-none"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-green-600/30 transition-all transform hover:-translate-y-0.5">
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-gray-900/20 transition-all transform hover:-translate-y-0.5">
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              100% Organic & Chemical Free
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Fast Delivery inside Dhaka (24 Hours)
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Secure Payment Options
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
