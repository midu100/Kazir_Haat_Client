import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

const BannerSection = () => {
  return (
    <section className="py-10 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-primary-dark
        via-primary to-secondary rounded-3xl overflow-hidden relative">

        {/* Decorative Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5
            rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5
            rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5
            rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 py-14 md:py-16 px-8 md:px-16
          flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-secondary-light/80 font-poppins text-xs
              font-semibold tracking-widest uppercase mb-3">
              ✨ বিশেষ অফার
            </p>
            <h2 className="font-bangla text-3xl md:text-4xl font-bold
              text-white mb-3">
              প্রথম অর্ডারে <span className="text-accent">১৫% ছাড়</span>
            </h2>
            <p className="text-white/60 font-bangla text-sm">
              কুপন কোড ব্যবহার করুন: <span className="text-secondary-light
              font-semibold bg-white/10 px-3 py-1 rounded-full ml-1">FRESH15</span>
            </p>
          </div>
          <button className="bg-white text-primary font-bangla font-semibold
            px-8 py-3.5 rounded-full hover:bg-accent hover:text-white
            transition-all duration-500 flex items-center gap-2 shadow-lg
            hover:shadow-xl shrink-0 cursor-pointer">
            এখনই অর্ডার করুন <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default BannerSection
