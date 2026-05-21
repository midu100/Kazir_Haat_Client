import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { categoryServices, productServices } from '../api'
import ProductCard from '../components/common/ProductCard'
import { FiGrid, FiSearch, FiSliders, FiTrash2, FiInbox } from 'react-icons/fi'

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Search & Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Sync category param from URL to state
  useEffect(() => {
    setSelectedCategory(categoryParam || '')
  }, [categoryParam])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [catsRes, prodsRes] = await Promise.all([
          categoryServices.getCategories(),
          productServices.getProducts({ limit: 100 }) // Load up to 100 products for quick client-side filtering
        ])

        if (catsRes?.success) {
          setCategories(catsRes.data)
        }
        if (prodsRes?.success) {
          setProducts(prodsRes.data)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load shop catalog.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (selectedCategory && product.category?._id !== selectedCategory) {
      return false
    }
    // 2. Search Term Filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    return true
  }).sort((a, b) => {
    if (sortBy === 'price_asc') {
      const priceA = a.discountPrice > 0 ? a.discountPrice : a.price
      const priceB = b.discountPrice > 0 ? b.discountPrice : b.price
      return priceA - priceB
    }
    if (sortBy === 'price_desc') {
      const priceA = a.discountPrice > 0 ? a.discountPrice : a.price
      const priceB = b.discountPrice > 0 ? b.discountPrice : b.price
      return priceB - priceA
    }
    if (sortBy === 'name_asc') {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === 'name_desc') {
      return b.name.localeCompare(a.name)
    }
    // Default: 'newest'
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  // Handle changing category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    // Update URL param nicely
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('')
    setSearchTerm('')
    setSortBy('newest')
    setSearchParams({})
  }

  return (
    <div className="bg-cream min-h-screen pb-16 font-poppins">
      {/* Breadcrumb / Banner */}
      <div className="bg-primary py-8 md:py-12 mb-8">
        <div className="w-full max-w-[1400px] mx-auto px-5">
          <div className="text-white/70 text-xs mb-2">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => handleCategorySelect('')}>Home</span> &bull; <span>Shop Catalog</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-poppins">
            {selectedCategory 
              ? categories.find(c => c._id === selectedCategory)?.name || 'Category Shop'
              : 'All Organic Products'
            }
          </h1>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-5 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filter Section */}
        <aside className="w-full lg:w-1/4 shrink-0 bg-white rounded-xl border border-gray-100 p-5 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <h3 className="font-bold text-dark text-base flex items-center gap-2">
              <FiSliders className="text-primary" /> Filter Options
            </h3>
            {(selectedCategory || searchTerm) && (
              <button 
                onClick={resetFilters}
                className="text-xs font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FiTrash2 size={12} /> Clear All
              </button>
            )}
          </div>

          {/* Categories Filter list */}
          <div className="mb-6">
            <h4 className="font-bold text-sm text-dark/80 mb-3.5 uppercase tracking-wide">Categories</h4>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleCategorySelect('')}
                className={`w-full text-left py-2.5 px-3.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  !selectedCategory 
                    ? 'bg-primary text-white font-semibold shadow-sm'
                    : 'text-body hover:bg-light hover:text-dark'
                }`}
              >
                <span>All Categories</span>
                <span className={`text-[10px] py-0.5 px-2 rounded-full ${!selectedCategory ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {products.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = products.filter(p => p.category?._id === cat._id).length
                return (
                  <button
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat._id)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat._id 
                        ? 'bg-primary text-white font-semibold shadow-sm'
                        : 'text-body hover:bg-light hover:text-dark'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] py-0.5 px-2 rounded-full ${selectedCategory === cat._id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Grid Catalog */}
        <main className="w-full lg:w-3/4 flex flex-col gap-6">
          {/* Top filter bar controls */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full md:w-80 relative flex items-center">
              <span className="absolute left-3.5 text-gray-400"><FiSearch /></span>
              <input 
                type="text" 
                placeholder="Search catalog products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-lg text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-poppins"
              />
            </div>

            {/* Total count and Sort Selection */}
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-5">
              <span className="text-xs text-body font-medium flex items-center gap-1">
                <FiGrid className="text-primary/70" /> Showing <strong className="text-dark font-bold">{filteredProducts.length}</strong> products
              </span>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-gray-100 rounded-lg py-2 px-3 text-xs font-semibold text-body outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Product grid displaying matching results */}
          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-5 h-80 flex flex-col">
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>
                  <div className="mt-auto h-8 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* Error display */
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-sm">
              <p className="text-accent font-semibold text-sm mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-primary text-white text-xs px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark cursor-pointer transition-all"
              >
                Retry Loading
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* No results state */
            <div className="bg-white rounded-xl border border-gray-100 py-16 px-10 text-center shadow-sm flex flex-col items-center justify-center animate-fadeInUp">
              <div className="w-16 h-16 bg-light text-body/50 rounded-full flex items-center justify-center mb-4">
                <FiInbox size={32} />
              </div>
              <h3 className="font-bold text-dark text-lg mb-1.5 font-poppins">No Matching Products Found</h3>
              <p className="text-sm text-body max-w-sm mb-6 leading-relaxed">
                We couldn't find any products matching your search term or category filter. Try clearing filters or try a different term.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-primary text-white text-xs px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all cursor-pointer shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Content Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 animate-fadeInUp">
              {filteredProducts.map((product) => (
                <div key={product._id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AllProducts
