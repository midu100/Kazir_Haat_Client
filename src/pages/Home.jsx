import React, { useState, useEffect } from 'react'
import { categoryServices, productServices } from '../api'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import TopSellingSection from '../components/TopSellingSection'
import PromoBannerOne from '../components/PromoBannerOne'
import PromoBannerTwo from '../components/PromoBannerTwo'
import WhyChooseUs from '../components/WhyChooseUs'
import TestimonialSection from '../components/TestimonialSection'
import VideoSection from '../components/VideoSection'
import SectionHeader from '../components/common/SectionHeader'
import ProductCard from '../components/common/ProductCard'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true)
      try {
        const [catsRes, prodsRes] = await Promise.all([
          categoryServices.getCategories(),
          productServices.getProducts({ limit: 100 })
        ])

        if (catsRes?.success) {
          setCategories(catsRes.data)
        }
        if (prodsRes?.success) {
          setProducts(prodsRes.data)
        }
      } catch (err) {
        console.error('Error loading homepage data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadHomeData()
  }, [])

  // Filter featured products for the Top Selling row, fallback to first 4 products
  const featuredProducts = products.filter(p => p.featured)
  const topProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)

  // Filter categories that have at least 1 product
  const activeCategories = categories.filter(cat => {
    return products.some(p => p.category?._id === cat._id)
  })

  return (
    <div>
      <HeroSection />
      
      {/* Dynamic Categories Grid */}
      <CategorySection categories={categories} />

      {/* Dynamic Top Selling Section */}
      {loading ? (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8 animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-100 rounded-lg"></div>
            <div className="h-32 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      ) : (
        <TopSellingSection products={topProducts} />
      )}

      {/* Dynamic Category Shelves with Banners Interlaced */}
      {loading ? (
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8 animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-60 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : (
        activeCategories.map((cat, idx) => {
          const catProducts = products.filter(p => p.category?._id === cat._id)
          
          return (
            <React.Fragment key={cat._id}>
              {/* Category Product shelf */}
              <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
                <SectionHeader title={cat.name} viewAll to={`/products?category=${cat._id}`} />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {catProducts.slice(0, 5).map((product) => (
                    <div key={product._id} className="h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Interlace Promo Banner 1 after the 1st active category shelf */}
              {idx === 0 && <PromoBannerOne />}

              {/* Interlace Promo Banner 2 after the 3rd active category shelf */}
              {idx === 2 && <PromoBannerTwo />}
            </React.Fragment>
          )
        })
      )}

      {/* If there are fewer than 3 categories, ensure banners still show */}
      {!loading && activeCategories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-body text-sm font-poppins">No dynamic products loaded. Please add categories and products from the admin panel.</p>
        </div>
      )}
      {!loading && activeCategories.length < 1 && <PromoBannerOne />}
      {!loading && activeCategories.length < 3 && activeCategories.length >= 1 && <PromoBannerTwo />}

      <WhyChooseUs />
      <TestimonialSection />
      
      {/* Video Section remains at the bottom as requested */}
      <VideoSection />
    </div>
  )
}

export default Home