import React from 'react'
import { Link } from 'react-router'
import { LuLeaf } from 'react-icons/lu'
import { FiFacebook, FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-14 pb-5">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="flex flex-wrap -mx-2 mb-10">
          {/* Brand Info */}
          <div className="w-full lg:w-1/3 px-2 mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <LuLeaf className="text-white text-lg" />
              </div>
              <div className="leading-tight">
                <span className="font-poppins font-bold text-lg block">KAZIR HAAT</span>
                <span className="font-poppins text-[10px] text-white/40">Organic Marketplace</span>
              </div>
            </div>
            <p className="text-white/40 font-poppins text-sm leading-relaxed mb-5 pr-6">
              Bangladesh's finest organic & natural food online marketplace.
              Farm fresh products delivered directly to your doorstep.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"><FiFacebook size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"><FiInstagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"><FaWhatsapp size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"><FiYoutube size={14} /></a>
            </div>
          </div>

          {/* Information */}
          <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-6">
            <h3 className="font-poppins font-semibold text-sm mb-4 text-secondary">Information</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">About Us</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Contact</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Careers</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Terms & Conditions</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Shop */}
          <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-6">
            <h3 className="font-poppins font-semibold text-sm mb-4 text-secondary">Shop</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Oil & Ghee</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Spices</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Rice & Lentils</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Honey</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Vegetables</Link>
            </div>
          </div>

          {/* Help */}
          <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-6">
            <h3 className="font-poppins font-semibold text-sm mb-4 text-secondary">Help</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Support Center</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Order Tracking</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Return Policy</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">Shipping</Link>
              <Link to="/" className="text-white/40 text-sm font-poppins hover:text-secondary transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="w-1/2 sm:w-1/3 lg:w-1/6 px-2 mb-6">
            <h3 className="font-poppins font-semibold text-sm mb-4 text-secondary">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2"><FiMapPin size={13} className="text-secondary mt-0.5 shrink-0" /><span className="text-white/40 text-sm font-poppins">Dhaka, Bangladesh</span></div>
              <div className="flex items-center gap-2"><FiPhone size={13} className="text-secondary shrink-0" /><span className="text-white/40 text-sm">017XX-XXXXXX</span></div>
              <div className="flex items-center gap-2"><FiMail size={13} className="text-secondary shrink-0" /><span className="text-white/40 text-sm">info@kazirhaat.com</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-poppins">© 2026 KAZIR HAAT. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-white/25 text-xs font-poppins">Payment:</span>
            <span className="text-white/40 text-xs">bKash</span>
            <span className="text-white/40 text-xs">Nagad</span>
            <span className="text-white/40 text-xs">Rocket</span>
            <span className="text-white/40 text-xs">COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
