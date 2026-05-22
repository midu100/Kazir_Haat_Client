import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authServices } from '../api';
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { LuLeaf } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

const SignUp = () => {
  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  
  // Verification field
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !phone) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await authServices.signup({ fullName, email, password, phone, address });
      if (res?.success) {
        setMessage('Sign up successful! An OTP code has been sent to your email.');
        setShowOtp(true);
      } else {
        setError(res?.message || 'Sign up failed');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Something went wrong during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await authServices.verifyOtp({ email, otp });
      if (res?.success) {
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setError(res?.message || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await authServices.resendOtp({ email });
      if (res?.success) {
        setMessage('A new OTP has been sent to your email.');
      } else {
        setError(res?.message || 'Resend failed');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Resend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050f] text-white flex font-poppins">
      
      {/* Left Panel: Decorative Split Screen (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-[#100d23]">
        {/* Background Image with Dark Purple Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/auth_decorative_bg.png" 
            alt="Desert twilight background" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07050f] via-[#100d23]/80 to-[#100d23]/40" />
        </div>

        {/* Top Header inside Left Panel */}
        <div className="z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
            <LuLeaf className="text-white text-xl" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-lg text-white block tracking-wide">
              KAZIR HAAT
            </span>
            <span className="text-[10px] text-purple-300 leading-none">
              Organic Marketplace
            </span>
          </div>
        </div>

        {/* Middle Tagline inside Left Panel */}
        <div className="z-10 max-w-md my-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl xl:text-5xl font-bold leading-tight mb-4"
          >
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#d8b4fe]">Organic</span> Movement
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm leading-relaxed"
          >
            Create an account to gain access to premium organic crops, cold pressed mustard oil, natural honey, fresh spices and more.
          </motion.p>
        </div>

        {/* Bottom Link inside Left Panel */}
        <div className="z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition-colors group font-semibold"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Website
          </Link>
        </div>
      </div>

      {/* Right Panel: SignUp / OTP Form */}
      <div className="w-full lg:w-1/2 bg-[#0a0816] flex flex-col justify-center px-6 py-12 md:px-16 lg:px-20 xl:px-28 relative">
        {/* Mobile Logo & Back Link */}
        <div className="flex justify-between items-center lg:hidden absolute top-6 left-6 right-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] rounded-lg flex items-center justify-center">
              <LuLeaf className="text-white text-base" />
            </div>
            <span className="font-bold text-sm text-white block tracking-wide">
              KAZIR HAAT
            </span>
          </Link>
          <Link to="/" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold">
            <FaArrowLeft size={10} /> Website
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-6">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-2"
            >
              {showOtp ? 'Verify Your Email' : 'Create an Account'}
            </motion.h2>
            <p className="text-gray-400 text-sm">
              {showOtp ? 'Enter the OTP code sent to your email' : 'Get started with your free account today'}
            </p>
          </div>

          {/* Notifications */}
          <AnimatePresence>
            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-xl text-xs font-semibold bg-green-950/40 text-green-400 border border-green-900/50"
              >
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-xl text-xs font-semibold bg-red-950/40 text-red-400 border border-red-900/50"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {showOtp ? (
            /* OTP Form */
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Verification Code (OTP)</label>
                <input 
                  type="text" 
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl px-4 py-3.5 text-lg outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white text-center font-bold tracking-widest placeholder-gray-600" 
                  placeholder="123456" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-purple-600/10 text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#9061f9] hover:from-[#6d28d9] hover:to-[#7c3aed] focus:outline-none transition-all transform hover:-translate-y-0.5 mt-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button 
                type="button" 
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-[#231b4d] rounded-xl text-sm font-semibold text-gray-300 bg-[#120e28] hover:bg-[#1a143a] transition-all mt-1 cursor-pointer disabled:opacity-50"
              >
                Resend OTP
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white placeholder-gray-500" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white placeholder-gray-500" 
                  placeholder="you@example.com" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white placeholder-gray-500" 
                  placeholder="+880 1XXX-XXXXXX" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Password *</label>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl pl-4 pr-12 py-3 text-sm outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white placeholder-[#2b2742]" 
                    placeholder="••••••••" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="2"
                  className="w-full bg-[#120e28] border border-[#231b4d] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all text-white placeholder-gray-500 resize-none" 
                  placeholder="Address..." 
                />
              </div>

              <div className="flex items-start mt-1">
                <label className="flex items-center cursor-pointer select-none">
                  <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    required
                    className="h-4 w-4 bg-[#120e28] border-[#231b4d] rounded text-[#7c3aed] focus:ring-[#7c3aed] focus:ring-offset-[#0a0816] cursor-pointer mt-0.5" 
                  />
                  <span className="ml-2.5 text-xs text-gray-300 leading-snug">
                    I agree to the <a href="#" className="font-semibold text-[#a78bfa] hover:underline">Terms</a> and <a href="#" className="font-semibold text-[#a78bfa] hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-purple-600/10 text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#9061f9] hover:from-[#6d28d9] hover:to-[#7c3aed] focus:outline-none transition-all transform hover:-translate-y-0.5 mt-3 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {!showOtp && (
            <>
              {/* Divider */}
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1e173e]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[#0a0816] text-gray-500 uppercase tracking-widest font-semibold">Or continue with</span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="mt-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#231b4d] rounded-xl shadow-sm bg-[#120e28] hover:bg-[#1a143a] text-xs font-semibold text-white transition-colors cursor-pointer">
                  <FaGoogle className="text-red-400" size={12} /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#231b4d] rounded-xl shadow-sm bg-[#120e28] hover:bg-[#1a143a] text-xs font-semibold text-white transition-colors cursor-pointer">
                  <FaApple size={12} /> Apple
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
