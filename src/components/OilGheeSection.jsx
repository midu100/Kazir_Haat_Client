import React from 'react'
import SectionHeader from './common/SectionHeader'
import ProductCard from './common/ProductCard'

const OilGheeSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader title="Oil & Ghee" viewAll />
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Mustard Oil 1 Liter" price="350" badge="Best Seller" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Mustard Oil 2 Liters" price="680" oldPrice="750" savePct="9%" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/onion.png" name="Pure Cow Ghee 500g" price="900" oldPrice="950" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/rice.png" name="Coconut Oil 1 Liter" price="420" badge="New" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Mustard Oil 5 Liters" price="1,550" badge="Best Price" />
        </div>
      </div>
    </section>
  )
}

export default OilGheeSection
