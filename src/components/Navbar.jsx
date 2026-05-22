import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { LuLeaf } from 'react-icons/lu'
import { categoryServices, authServices, cartServices } from '../api'
import { getCookie, deleteCookie } from './common/Services'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const navigate = useNavigate()

  const fetchCats = async () => {
    try {
      const res = await categoryServices.getCategories()
      if (res?.success) setCategories(res.data)
    } catch (err) {
      console.error('Navbar category load error:', err)
    }
  }

  const fetchUserProfileAndCart = async () => {
    const token = getCookie('token')
    if (token) {
      try {
        const profileRes = await authServices.getProfile()
        if (profileRes?.success) {
          setUser(profileRes.data)
          
          // Only fetch cart if authenticated
          const cartRes = await cartServices.getCart()
          if (cartRes?.success && cartRes.data) {
            const count = cartRes.data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
            setCartCount(count)
          }
        } else {
          setUser(null)
          setCartCount(0)
        }
      } catch (err) {
        console.error('Navbar auth check error:', err)
        setUser(null)
        setCartCount(0)
      }
    } else {
      setUser(null)
      setCartCount(0)
    }
  }

  useEffect(() => {
    fetchCats()
    fetchUserProfileAndCart()

    // Listen to custom event when cart is updated on other pages
    const handleCartUpdate = () => {
      fetchUserProfileAndCart()
    }
    window.addEventListener('cartUpdated', handleCartUpdate)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await authServices.logout()
    } catch (err) {
      console.error('Logout API call error (proceeding to clear local state):', err)
    } finally {
      deleteCookie('token')
      setUser(null)
      setCartCount(0)
      setShowUserDropdown(false)
      navigate('/')
    }
  }

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
              
              {/* Account Dropdown */}
              <div 
                className="relative hidden sm:flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors cursor-pointer group"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <FiUser size={17} />
                <span className="text-[10px] font-poppins mt-0.5">
                  {user ? user.fullName.split(' ')[0] : 'Account'}
                </span>
                
                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 top-full pt-2 w-48 z-50">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 flex flex-col font-poppins text-xs text-gray-700 animate-slideDown">
                      {user ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-50 font-semibold text-gray-900 truncate">
                            Hi, {user.fullName}
                          </div>
                          {user.role === 'admin' && (
                            <Link to="/admin" className="px-4 py-2.5 hover:bg-light hover:text-primary transition-colors text-left font-medium">
                              Admin Panel
                            </Link>
                          )}
                          <Link to="/profile" className="px-4 py-2.5 hover:bg-light hover:text-primary transition-colors text-left font-medium">
                            My Profile
                          </Link>
                          <Link to="/orders" className="px-4 py-2.5 hover:bg-light hover:text-primary transition-colors text-left font-medium">
                            My Orders
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="px-4 py-2.5 hover:bg-red-50 hover:text-red-600 transition-colors text-left font-semibold border-t border-gray-50 cursor-pointer"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/signin" className="px-4 py-2.5 hover:bg-light hover:text-primary transition-colors text-left font-medium">
                            Sign In
                          </Link>
                          <Link to="/signup" className="px-4 py-2.5 hover:bg-light hover:text-primary transition-colors text-left font-medium">
                            Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/" className="hidden sm:flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors">
                <FiHeart size={17} /><span className="text-[10px] font-poppins mt-0.5">Wishlist</span>
              </Link>
              
              {/* Cart Button redirecting to /cart */}
              <Link to="/cart" className="flex flex-col items-center p-2.5 text-dark hover:text-primary transition-colors relative">
                <FiShoppingBag size={17} />
                <span className="absolute top-1 right-0 w-4 h-4 bg-secondary rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                  {cartCount}
                </span>
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

              <div className="border-t border-gray-100 my-4 pt-4">
                <span className="px-4 text-xs font-semibold text-gray-400 uppercase font-poppins">Account</span>
                {user ? (
                  <>
                    <div className="font-poppins text-sm font-semibold text-gray-700 py-3 px-4 truncate">
                      Hi, {user.fullName}
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors block">Admin Panel</Link>
                    )}
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors block">My Profile</Link>
                    <Link to="/orders" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors block">My Orders</Link>
                    <button 
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full text-left font-poppins text-sm text-red-600 font-semibold py-3 px-4 rounded-lg hover:bg-red-50 transition-colors block cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors block">Sign In</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="font-poppins text-sm text-dark py-3 px-4 rounded-lg hover:bg-light transition-colors block">Create Account</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar