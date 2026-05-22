import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { cartServices } from '../../api'
import { getCookie } from './Services'

const ProductCard = ({ product, image, name, price, oldPrice, badge, savePct, index = 0 }) => {
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)

  const finalName = product ? product.name : name
  const finalPrice = product ? (product.discountPrice > 0 ? product.discountPrice : product.price) : price
  const finalOldPrice = product ? (product.discountPrice > 0 ? product.price : null) : oldPrice
  const finalImage = product ? (product.images?.[0]?.url || '/images/placeholder.png') : image
  const productId = product?._id
  
  let finalSavePct = savePct
  if (product && product.discountPrice > 0 && product.price > product.discountPrice) {
    const pct = Math.round(((product.price - product.discountPrice) / product.price) * 100)
    finalSavePct = `${pct}%`
  }

  const finalBadge = product ? (product.featured ? 'Featured' : badge) : badge

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!productId) return

    const token = getCookie('token')
    if (!token) {
      navigate('/signin')
      return
    }

    try {
      setAdding(true)
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
      }
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      setAdding(false)
    }
  }

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-lg border border-gray-100
        transition-all duration-300 group overflow-hidden h-full flex flex-col cursor-pointer"
    >
      <div className="relative p-5 pb-2 flex items-center justify-center overflow-hidden">
        {finalBadge && (
          <span className="absolute top-3 left-3 bg-secondary text-white
            text-[10px] font-semibold px-2.5 py-0.5 rounded-full z-10 font-poppins">
            {finalBadge}
          </span>
        )}
        {finalSavePct && (
          <span className="absolute top-3 right-3 bg-save text-white
            text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 font-poppins">
            {finalSavePct}
          </span>
        )}
        <motion.img 
          src={finalImage} 
          alt={finalName}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-40 object-contain" 
        />
      </div>
      <div className="p-4 pt-3 flex flex-col flex-1">
        <h3 className="font-poppins font-medium text-dark text-sm mb-2
          leading-relaxed line-clamp-2">{finalName}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base font-bold text-secondary font-poppins">৳{finalPrice}</span>
          {finalOldPrice && (
            <span className="text-xs text-gray-400 line-through font-poppins">৳{finalOldPrice}</span>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={adding || (product && product.stock <= 0)}
          className="mt-auto w-full border border-gray-200 text-secondary
            hover:bg-secondary hover:text-white hover:border-secondary
            disabled:opacity-50 disabled:cursor-not-allowed
            font-poppins text-xs py-2.5 rounded transition-all duration-300
            flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FiShoppingCart size={13} /> {product && product.stock <= 0 ? 'Out of Stock' : (adding ? 'Adding...' : 'Add to Cart')}
        </button>
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

export default ProductCard
