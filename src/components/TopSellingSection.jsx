import React from 'react'
import SectionHeader from './common/SectionHeader'
import TopProductCard from './common/TopProductCard'

const TopSellingSection = ({ products = [] }) => {
  if (products.length === 0) return null

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader title="Top Selling Products" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.slice(0, 4).map((product, index) => (
          <div key={product._id} className="h-full">
            <TopProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopSellingSection
