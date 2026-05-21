import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authServices } from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans bg-gray-50/50">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {showOtp ? 'Verify Your Email' : 'Create an Account'}
          </h2>
          <p className="text-gray-500 text-sm">
            {showOtp ? 'Enter the OTP code sent to your email' : 'Join us for premium organic products'}
          </p>
        </div>

        {/* Notifications */}
        {message && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {showOtp ? (
          /* OTP Form */
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code (OTP)</label>
              <input 
                type="text" 
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white text-center text-xl font-bold tracking-widest" 
                placeholder="123456" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-green-600/20 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5 mt-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button 
              type="button" 
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all mt-2 cursor-pointer disabled:opacity-50"
            >
              Resend OTP
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white" 
                placeholder="John Doe" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white" 
                placeholder="you@example.com" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white" 
                placeholder="+880 1XXX-XXXXXX" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <div className="relative flex items-center">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-4 pr-12 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="2"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-gray-50/50 focus:bg-white resize-none" 
                placeholder="Address..." 
              />
            </div>

            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input 
                  id="terms" 
                  name="terms" 
                  type="checkbox" 
                  required
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer mt-0.5" 
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="text-gray-600 cursor-pointer">
                  I agree to the <a href="#" className="font-medium text-green-600 hover:text-green-500">Terms of Service</a> and <a href="#" className="font-medium text-green-600 hover:text-green-500">Privacy Policy</a>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-green-600/20 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5 mt-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-green-600 hover:text-green-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
