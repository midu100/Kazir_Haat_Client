import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { LuLeaf } from 'react-icons/lu'
import { categoryServices } from '../api'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await categoryServices.getCategories()
        if (res?.success) setCategories(res.data)
      } catch (err) {
        console.error('Navbar category load error:', err)
      }
    }
    fetchCats()
  }, [])

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Ticker / Marquee Bar */}
        <div className="bg-primary-dark overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="flex items-center py-2.5 overflow-hidden">
              <div className="flex shrink-0 animate-marquee">
                <span className="text-white/70 text-[14px] font-bangla whitespace-nowrap px-8">
                  Oil & Ghee • Honey • Spices • Rice • Lentils & Grains • Vegetables • Cattle Products • Seeds • Pickles — Farm Fresh to Your Doorstep
                </span>
                <span className="text-white/70 text-[14px] font-bangla whitespace-nowrap px-8">
                  Oil & Ghee • Honey • Spices • Rice • Lentils & Grains • Vegetables • Cattle Products • Seeds • Pickles — Farm Fresh to Your Doorstep
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="bg-white border-b border-gray-100 shadow-sm">
          <div className="w-full max-w-[1400px] mx-auto px-5 py-2.5 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
    <LuLeaf className="text-white text-xl" />
  </div>

  {/* FIXED: show on mobile too */}
  <div className="leading-tight">
    <span className="font-poppins font-bold text-lg text-primary block tracking-wide">
      KAZIR HAAT
    </span>

    <span className="font-bangla text-[10px] text-body leading-none">
      Organic Marketplace
    </span>
  </div>
</Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 focus-within:border-primary transition-colors">
              <input type="text" placeholder="Search products..." className="flex-1 px-4 py-2.5 text-sm font-poppins outline-none bg-transparent" />
              <button className="bg-primary text-white px-5 py-2.5 hover:bg-primary-dark transition-colors cursor-pointer"><FiSearch size={18} /></button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-0.5">
              <button className="md:hidden p-2.5 text-dark cursor-pointer"><FiSearch size={20} /></button>
              <Link to="/" className="hidden lg:flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors">
                <FiPhone size={17} /><span className="text-[10px] font-poppins mt-0.5">Call Us</span>
              </Link>
              <Link to="/" className="hidden sm:flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors">
                <FiUser size={17} /><span className="text-[10px] font-poppins mt-0.5">Account</span>
              </Link>
              <Link to="/" className="hidden sm:flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors">
                <FiHeart size={17} /><span className="text-[10px] font-poppins mt-0.5">Wishlist</span>
              </Link>
              <Link to="/" className="flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors relative">
                <FiShoppingBag size={17} />
                <span className="absolute top-1 right-0 w-4 h-4 bg-secondary rounded-full text-[9px] text-white flex items-center justify-center font-bold">0</span>
                <span className="text-[10px] font-poppins mt-0.5 hidden sm:block">Cart</span>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 text-dark cursor-pointer ml-1">
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </header>

        {/* Category Navigation Bar */}
        <nav className="bg-primary hidden lg:block">
          <div className="w-full max-w-[1200px] mx-auto px-5 flex items-center justify-center gap-1 overflow-x-auto">
            <Link to="/products" className="text-white text-[13px] font-poppins font-medium py-3 px-5 hover:bg-white/15 transition-all whitespace-nowrap">All Products</Link>
            {categories.map((cat) => (
              <Link 
                key={cat._id} 
                to={`/products?category=${cat._id}`} 
                className="text-white text-[13px] font-poppins font-medium py-3 px-5 hover:bg-white/15 transition-all whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl animate-slideInLeft overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-bold text-lg text-primary font-poppins">Menu</span>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer"><FiX size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col p-3">
              <Link to="/products" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-primary font-bold py-3 px-4 rounded-lg hover:bg-light transition-colors">All Products</Link>
              {categories.map((cat) => (
                <Link 
                  key={cat._id} 
                  to={`/products?category=${cat._id}`} 
                  onClick={() => setIsOpen(false)}
                  className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar