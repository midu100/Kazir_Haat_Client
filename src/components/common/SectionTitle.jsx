import React from 'react'

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-dark font-bangla mb-3">
        {title}
      </h2>
      <p className="text-base text-body/60 font-bangla max-w-md mx-auto">
        {subtitle}
      </p>
      <div className="flex items-center justify-center gap-2 mt-5">
        <span className="w-8 h-[2px] bg-secondary/40 rounded-full"></span>
        <span className="w-3 h-3 bg-secondary rounded-full"></span>
        <span className="w-8 h-[2px] bg-secondary/40 rounded-full"></span>
      </div>
    </div>
  )
}

export default SectionTitle
