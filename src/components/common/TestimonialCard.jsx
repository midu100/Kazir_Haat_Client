import React from 'react'

const TestimonialCard = ({ name, role, text, initial }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5
      hover:shadow-md transition-all duration-300 h-full">
      <p className="text-body text-sm font-poppins mb-5 leading-relaxed
        line-clamp-3">"{text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center
          justify-center text-primary font-bold text-sm">{initial}</div>
        <div>
          <h4 className="font-semibold text-sm text-dark font-poppins">{name}</h4>
          <p className="text-[11px] text-gray-400 font-poppins">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
