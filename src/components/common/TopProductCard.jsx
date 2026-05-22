import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { cartServices } from '../../api'
import { getCookie } from './Services'

const TopProductCard = ({ product, image, name, price, oldPrice, saveAmount, badge, index = 0 }) => {
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const [buying, setBuying] = useState(false)

  const finalName = product ? product.name : name
  const finalPrice = product ? (product.discountPrice > 0 ? product.discountPrice : product.price) : price
  const finalOldPrice = product ? (product.discountPrice > 0 ? product.price : null) : oldPrice
  const finalImage = product ? (product.images?.[0]?.url || '/images/placeholder.png') : image
  const productId = product?._id
  
  let finalSaveAmount = saveAmount
  if (product && product.discountPrice > 0 && product.price > product.discountPrice) {
    finalSaveAmount = product.price - product.discountPrice
  }

  const finalBadge = product ? (product.featured ? 'Featured' : badge) : badge

  const handleAddToCart = async (e, isBuyNow = false) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!productId) return

    const token = getCookie('token')
    if (!token) {
      navigate('/signin')
      return
    }

    try {
      if (isBuyNow) setBuying(true)
      else setAdding(true)

      const defaultSize = product?.size?.[0] || ''
      const defaultColor = product?.color?.[0] || ''
      const res = await cartServices.addToCart({
        productId,
        quantity: 1,
        size: defaultSize,
        color: defaultColor
      })
      if (res?.success) {
        window.dispatchEvent(new Event('cartUpdated'))
        if (isBuyNow) {
          navigate('/checkout')
        }
      }
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      if (isBuyNow) setBuying(false)
      else setAdding(false)
    }
  }

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
      className="bg-white rounded-lg border border-gray-100 transition-all duration-300 flex overflow-hidden h-full cursor-pointer group"
    >
      <div className="w-2/5 bg-gray-50 flex items-center justify-center p-5 relative overflow-hidden">
        {finalBadge && (
          <span className="absolute top-3 right-3 bg-secondary text-white
            text-[10px] font-semibold px-2.5 py-0.5 rounded-full font-poppins z-10">
            {finalBadge}
          </span>
        )}
        <motion.img 
          src={finalImage} 
          alt={finalName} 
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
          className="h-28 md:h-32 object-contain" 
        />
      </div>
      <div className="w-3/5 p-5 flex flex-col justify-center">
        <h3 className="font-poppins font-semibold text-dark text-sm md:text-base
          mb-2 leading-snug line-clamp-2">{finalName}</h3>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-secondary font-poppins">৳{finalPrice}</span>
          {finalOldPrice && (
            <span className="text-xs text-gray-400 line-through font-poppins">৳{finalOldPrice}</span>
          )}
        </div>
        {finalSaveAmount && (
          <span className="inline-block bg-save text-white text-[10px] font-bold
            px-2.5 py-0.5 rounded mb-3 w-fit font-poppins font-semibold">Save: ৳{finalSaveAmount}</span>
        )}
        <div className="flex items-center gap-2 mt-1">
          <button 
            onClick={(e) => handleAddToCart(e, false)}
            disabled={adding || buying || (product && product.stock <= 0)}
            className="border border-secondary text-secondary
              hover:bg-secondary hover:text-white text-[11px] py-2 px-3
              disabled:opacity-50 disabled:cursor-not-allowed
              rounded transition-all duration-300 flex items-center gap-1
              cursor-pointer font-poppins"
          >
            <FiShoppingCart size={11} /> {adding ? 'Adding...' : 'Cart'}
          </button>
          <button 
            onClick={(e) => handleAddToCart(e, true)}
            disabled={adding || buying || (product && product.stock <= 0)}
            className="bg-secondary text-white hover:bg-secondary-dark
              text-[11px] py-2 px-4 rounded transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-1 cursor-pointer font-poppins font-semibold"
          >
            <FiShoppingCart size={11} /> {buying ? 'Buying...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </motion.div>
  )

  if (productId) {
    return (
      <Link to={`/productdetails/${productId}`} className="block h-full no-underline">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

export default TopProductCard
