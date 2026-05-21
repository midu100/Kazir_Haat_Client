import React from 'react'
import { useNavigate } from 'react-router'
import CategoryCard from './common/CategoryCard'
import { GiWheat, GiHoneyJar, GiCow, GiChiliPepper } from 'react-icons/gi'
import { LuDroplets, LuLeaf, LuBean, LuSprout } from 'react-icons/lu'

const getIcon = (name) => {
  const lowercase = name.toLowerCase()
  if (lowercase.includes('oil') || lowercase.includes('ghee')) return <LuDroplets size={38} />
  if (lowercase.includes('honey')) return <GiHoneyJar size={38} />
  if (lowercase.includes('spice')) return <GiChiliPepper size={38} />
  if (lowercase.includes('rice')) return <GiWheat size={38} />
  if (lowercase.includes('lentil') || lowercase.includes('grain')) return <LuBean size={38} />
  if (lowercase.includes('veg')) return <LuLeaf size={38} />
  if (lowercase.includes('cattle') || lowercase.includes('cow')) return <GiCow size={38} />
  if (lowercase.includes('seed')) return <LuSprout size={38} />
  return <LuLeaf size={38} />
}

const CategorySection = ({ categories = [] }) => {
  const navigate = useNavigate()

  if (categories.length === 0) return null

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 pb-10 pt-5">
      <h2 className="text-lg md:text-2xl font-bold text-dark font-poppins text-center mb-8">
        Shop by Category
      </h2>
      <div className="flex flex-wrap justify-center gap-5 md:gap-12">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat._id}
            icon={getIcon(cat.name)} 
            title={cat.name} 
            onClick={() => navigate(`/products?category=${cat._id}`)}
          />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
