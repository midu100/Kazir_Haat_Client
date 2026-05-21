import React from 'react'
import SectionHeader from './common/SectionHeader'
import ProductCard from './common/ProductCard'

const SpiceSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader title="Spices" viewAll />
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/chili.png" name="Dried Red Chili 500g" price="180" oldPrice="220" savePct="18%" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Turmeric Powder 500g" price="150" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/chili.png" name="Cumin Seeds 500g" price="280" oldPrice="320" savePct="12%" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Coriander Powder 250g" price="120" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/chili.png" name="Black Pepper 100g" price="250" badge="Premium" />
        </div>
      </div>
    </section>
  )
}

export default SpiceSection
