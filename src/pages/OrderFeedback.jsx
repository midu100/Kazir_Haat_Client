import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router';
import { orderServices } from '../api';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaShoppingBag } from 'react-icons/fa';

const OrderFeedback = () => {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSuccess = path.includes('/success');
  const isFailed = path.includes('/failed');
  const isCancelled = path.includes('/cancelled');

  useEffect(() => {
    if (isSuccess && id) {
      const fetchOrder = async () => {
        try {
          setLoading(true);
          const res = await orderServices.getOrderDetails(id);
          if (res?.success) {
            setOrder(res.data);
          } else {
            setError(res?.message || 'Order details not found');
          }
        } catch (err) {
          console.error(err);
          setError(err?.response?.data?.message || 'Failed to fetch order details');
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, isSuccess]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm font-poppins">Loading order status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-16 font-sans text-gray-850">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm text-center"
      >
        {isSuccess && (
          <>
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">Order Placed Successfully!</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm font-poppins">
              Thank you for shopping with Kazir Haat. Your order has been placed and is currently being processed.
            </p>

            {order && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 text-left font-poppins">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">Order Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-400 mb-1">Order ID</p>
                    <p className="font-semibold text-gray-800 break-all">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Transaction ID</p>
                    <p className="font-semibold text-gray-800 break-all">{order.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-850 uppercase">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Total Amount</p>
                    <p className="font-bold text-primary text-sm">৳ {order.totalAmount}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4 text-xs">
                  <p className="text-gray-400 mb-1">Shipping Address</p>
                  <p className="font-semibold text-gray-800">
                    {order.shippingAddress?.fullName} ({order.shippingAddress?.phone})
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {isFailed && (
          <>
            <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">Payment Failed</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm font-poppins">
              We were unable to process your payment. Please try again or use another payment method.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/checkout" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md font-poppins text-sm">
                Try Again
              </Link>
            </div>
          </>
        )}

        {isCancelled && (
          <>
            <FaExclamationTriangle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">Payment Cancelled</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm font-poppins">
              Your payment transaction was cancelled. If this was an accident, you can return to checkout to complete your purchase.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/checkout" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md font-poppins text-sm">
                Return to Checkout
              </Link>
            </div>
          </>
        )}

        <div className="mt-8 border-t border-gray-100 pt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors font-semibold font-poppins">
            <FaShoppingBag size={14} /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderFeedback;
