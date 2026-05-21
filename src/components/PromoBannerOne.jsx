import React from 'react'

const PromoBannerOne = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 rounded-xl
          p-8 md:p-10 min-h-[220px] flex items-center relative overflow-hidden cursor-pointer
          group hover:shadow-lg transition-shadow duration-300"
          style={{ backgroundImage: 'url(/images/promo-spice.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="font-poppins text-xl md:text-2xl font-bold text-white mb-2">
              20% Off on All Spices!
            </h3>
            <p className="text-white/80 font-poppins text-sm mb-4">
              Limited Time Offer • Hurry Up
            </p>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2
              rounded font-poppins text-xs font-semibold transition-colors cursor-pointer">
              Explore Spices
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 rounded-xl
          p-8 md:p-10 min-h-[220px] flex items-center relative overflow-hidden cursor-pointer
          group hover:shadow-lg transition-shadow duration-300"
          style={{ backgroundImage: 'url(/images/promo-delivery.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-transparent group-hover:from-primary-dark/95 transition-all duration-500"></div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="font-poppins text-xl md:text-2xl font-bold text-white mb-2">
              Free Delivery on ৳5,000+
            </h3>
            <p className="text-white/80 font-poppins text-sm mb-4">
              Fast & Safe Delivery Nationwide
            </p>
            <button className="bg-white text-primary hover:bg-light px-5 py-2
              rounded font-poppins text-xs font-semibold transition-colors cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBannerOne
