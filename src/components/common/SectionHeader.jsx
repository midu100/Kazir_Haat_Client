import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router'

const SectionHeader = ({ title, viewAll, to }) => {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-lg md:text-2xl font-bold text-dark font-poppins">{title}</h2>
        <div className="w-12 h-[3px] bg-secondary rounded-full mt-2"></div>
      </div>
      {viewAll && (
        <Link to={to || "/products"} className="text-secondary hover:text-secondary-dark text-xs
          font-semibold flex items-center gap-1 transition-colors uppercase
          tracking-wider font-poppins cursor-pointer">
          View All <FiArrowRight size={12} />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
