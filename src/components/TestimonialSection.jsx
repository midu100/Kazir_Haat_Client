import React from 'react'
import SectionHeader from './common/SectionHeader'
import TestimonialCard from './common/TestimonialCard'

const TestimonialSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-10 mb-4">
      <SectionHeader title="Customer Reviews" />
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <TestimonialCard
            initial="R"
            name="Rahela Begum"
            role="Homemaker"
            text="The quality of Kazir Haat's mustard oil is amazing, completely pure. I order every week. The delivery is also very fast."
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <TestimonialCard
            initial="A"
            name="Abdul Karim"
            role="Businessman"
            text="I can now get authentic village ghee sitting in the city thanks to Kazir Haat. Both quality and taste are outstanding."
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <TestimonialCard
            initial="F"
            name="Fariya Akter"
            role="Entrepreneur"
            text="I ordered honey and it was completely genuine and pure. The whole family loved it. Will definitely reorder."
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
