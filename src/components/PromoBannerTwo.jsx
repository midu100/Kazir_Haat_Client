import React from 'react'

const PromoBannerTwo = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 rounded-xl
          p-8 md:p-10 min-h-[220px] flex items-center relative overflow-hidden cursor-pointer
          hover:shadow-lg transition-shadow duration-300 group"
          style={{ backgroundImage: 'url(/images/promo-ghee.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1200]/90 via-[#3a2800]/70 to-transparent group-hover:from-[#1a1200]/95 transition-all duration-500"></div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="font-poppins text-xl md:text-2xl font-bold text-white mb-2">
              Premium Pure Ghee
            </h3>
            <p className="text-white/80 font-poppins text-sm mb-4">
              Now at New Prices • 100% Pure
            </p>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2
              rounded font-poppins text-xs font-semibold transition-colors cursor-pointer">
              Buy Ghee
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 rounded-xl
          p-8 md:p-10 min-h-[220px] flex items-center relative overflow-hidden cursor-pointer
          hover:shadow-lg transition-shadow duration-300 group"
          style={{ backgroundImage: 'url(/images/promo-farm.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/70 to-transparent group-hover:from-primary-dark transition-all duration-500"></div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="font-poppins text-xl md:text-2xl font-bold text-white mb-2">
              Farm Fresh Products
            </h3>
            <p className="text-white/80 font-poppins text-sm mb-4">
              Direct to Your Home • Order Now
            </p>
            <button className="bg-white text-primary hover:bg-light px-5 py-2
              rounded font-poppins text-xs font-semibold transition-colors cursor-pointer">
              Explore Farm
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBannerTwo
