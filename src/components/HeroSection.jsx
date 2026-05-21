import React from "react";
import hero from '../assets/videos/hero-main.mp4'

const HeroSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4">

        {/* ================= LEFT: VIDEO ================= */}
        <div className="w-full md:w-3/5 rounded-xl overflow-hidden relative min-h-[380px] flex items-center p-8 group">

  {/* Image Background */}
  <div
  className="absolute inset-0 w-full h-full bg-cover bg-center"
  style={{ backgroundImage: "url('/images/hero-banner.png')" }}
/>

  {/* Premium overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent group-hover:from-black/60 transition-all duration-500"></div>

  {/* Glow effect */}
  <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>

  {/* Content */}
  <div className="relative z-10">
    <span className="bg-secondary text-white text-[11px] font-semibold px-3 py-1 rounded-full inline-block mb-4">
      🔥 Special Offer
    </span>

    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
      Fresh Organic Market
    </h2>

    <p className="text-white/80 text-sm mb-5 max-w-md">
      Discover fresh organic products directly from farmers with premium quality assurance.
    </p>

    <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition">
      Shop Now →
    </button>
  </div>
</div>

        {/* ================= RIGHT: IMAGE ================= */}
        <div className="w-full md:w-2/5 rounded-xl overflow-hidden relative min-h-[380px] group">

          {/* Image */}
          <img
            src="/images/hero-side1.png"
            alt="Mustard Oil"
            className="w-full h-full object-cover"
          />

          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-500"></div>

          {/* Glow */}
          <div className="absolute -left-10 -bottom-10 w-52 h-52 bg-yellow-400/10 rounded-full blur-2xl"></div>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-10 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Pure Mustard Oil
            </h2>

            <p className="text-white/80 text-sm mb-3">
              100% Pure & Cold Pressed
            </p>

            <span className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold">
              ৳350 / Liter
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;