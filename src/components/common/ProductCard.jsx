import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

const ProductCard = ({ product, image, name, price, oldPrice, badge, savePct }) => {
  const finalName = product ? product.name : name
  const finalPrice = product ? (product.discountPrice > 0 ? product.discountPrice : product.price) : price
  const finalOldPrice = product ? (product.discountPrice > 0 ? product.price : null) : oldPrice
  const finalImage = product ? (product.images?.[0]?.url || '/images/placeholder.png') : image
  
  let finalSavePct = savePct
  if (product && product.discountPrice > 0 && product.price > product.discountPrice) {
    const pct = Math.round(((product.price - product.discountPrice) / product.price) * 100)
    finalSavePct = `${pct}%`
  }

  const finalBadge = product ? (product.featured ? 'Featured' : badge) : badge

  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg
      transition-all duration-300 group overflow-hidden h-full flex flex-col">
      <div className="relative p-5 pb-2 flex items-center justify-center">
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
        <img src={finalImage} alt={finalName}
          className="h-40 object-contain group-hover:scale-105
          transition-transform duration-500" />
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
        <button className="mt-auto w-full border border-gray-200 text-secondary
          hover:bg-secondary hover:text-white hover:border-secondary
          font-poppins text-xs py-2.5 rounded transition-all duration-300
          flex items-center justify-center gap-1.5 cursor-pointer">
          <FiShoppingCart size={13} /> Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
