import React from 'react'

const CategoryCard = ({ icon, title, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-light border-2 border-transparent
        group-hover:border-secondary flex items-center justify-center
        text-primary text-2xl group-hover:text-secondary transition-all
        duration-300 group-hover:shadow-md">
        {icon}
      </div>
      <span className="font-poppins text-[14px] md:text-[16px] font-medium text-dark
        group-hover:text-secondary transition-colors duration-300 text-center">{title}</span>
    </div>
  )
}

export default CategoryCard
