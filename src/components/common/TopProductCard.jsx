import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

const TopProductCard = ({ product, image, name, price, oldPrice, saveAmount, badge }) => {
  const finalName = product ? product.name : name
  const finalPrice = product ? (product.discountPrice > 0 ? product.discountPrice : product.price) : price
  const finalOldPrice = product ? (product.discountPrice > 0 ? product.price : null) : oldPrice
  const finalImage = product ? (product.images?.[0]?.url || '/images/placeholder.png') : image
  
  let finalSaveAmount = saveAmount
  if (product && product.discountPrice > 0 && product.price > product.discountPrice) {
    finalSaveAmount = product.price - product.discountPrice
  }

  const finalBadge = product ? (product.featured ? 'Featured' : badge) : badge

  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg
      transition-all duration-300 flex overflow-hidden h-full">
      <div className="w-2/5 bg-gray-50 flex items-center justify-center p-5 relative">
        {finalBadge && (
          <span className="absolute top-3 right-3 bg-secondary text-white
            text-[10px] font-semibold px-2.5 py-0.5 rounded-full font-poppins">
            {finalBadge}
          </span>
        )}
        <img src={finalImage} alt={finalName} className="h-28 md:h-32 object-contain" />
      </div>
      <div className="w-3/5 p-5 flex flex-col justify-center">
        <h3 className="font-poppins font-semibold text-dark text-sm md:text-base
          mb-2 leading-snug">{finalName}</h3>
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
          <button className="border border-secondary text-secondary
            hover:bg-secondary hover:text-white text-[11px] py-2 px-3
            rounded transition-all duration-300 flex items-center gap-1
            cursor-pointer font-poppins">
            <FiShoppingCart size={11} /> Cart
          </button>
          <button className="bg-secondary text-white hover:bg-secondary-dark
            text-[11px] py-2 px-4 rounded transition-all duration-300
            flex items-center gap-1 cursor-pointer font-poppins font-semibold">
            <FiShoppingCart size={11} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopProductCard
