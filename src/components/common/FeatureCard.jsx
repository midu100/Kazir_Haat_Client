import React from 'react'

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 p-5 rounded-lg bg-light
      hover:bg-primary hover:text-white transition-all duration-500
      group cursor-pointer h-full">
      <div className="w-12 h-12 shrink-0 rounded-lg bg-primary/10
        group-hover:bg-white/20 flex items-center justify-center
        text-primary group-hover:text-white text-xl transition-all duration-500">
        {icon}
      </div>
      <div>
        <h3 className="font-poppins font-bold text-dark group-hover:text-white
          text-sm mb-1 transition-colors duration-500">{title}</h3>
        <p className="text-xs text-body group-hover:text-white/70 font-poppins
          leading-relaxed transition-colors duration-500">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
