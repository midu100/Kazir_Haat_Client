import React from 'react'
import SectionHeader from './common/SectionHeader'
import ProductCard from './common/ProductCard'

const RiceLentilSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader title="Rice & Lentils" viewAll />
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/rice.png" name="Miniket Rice 5 KG" price="520" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/rice.png" name="Basmati Rice 1 KG" price="280" badge="Premium" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/mustard.png" name="Red Lentil 1 KG" price="140" oldPrice="170" savePct="18%" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/onion.png" name="Chickpea Lentil 1 KG" price="160" />
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-2 mb-4">
          <ProductCard image="/images/rice.png" name="Whole Wheat Flour 2 KG" price="180" badge="Organic" />
        </div>
      </div>
    </section>
  )
}

export default RiceLentilSection
