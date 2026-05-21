import React from 'react'
import SectionHeader from './common/SectionHeader'
import FeatureCard from './common/FeatureCard'
import { LuLeaf, LuTruck, LuShieldCheck, LuHeadphones } from 'react-icons/lu'

const WhyChooseUs = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-12">
      <SectionHeader title="Why Choose Kazir Haat?" />
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <FeatureCard
            icon={<LuLeaf size={24} />}
            title="100% Organic Products"
            description="Completely natural & chemical-free products sourced directly from local farms"
          />
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <FeatureCard
            icon={<LuTruck size={24} />}
            title="Fast Delivery"
            description="Nationwide delivery in 2-3 days. Same-day delivery available in Dhaka"
          />
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <FeatureCard
            icon={<LuShieldCheck size={24} />}
            title="Quality Assurance"
            description="Every product goes through strict quality control and testing processes"
          />
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <FeatureCard
            icon={<LuHeadphones size={24} />}
            title="24/7 Support"
            description="Our customer care team is always by your side for any queries or issues"
          />
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
