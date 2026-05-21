import React from 'react'
import SectionTitle from './common/SectionTitle'
import ProductCard from './common/ProductCard'

const FeaturedSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <SectionTitle
          title="আমাদের পণ্যসমূহ"
          subtitle="সরাসরি খামার থেকে আপনার রান্নাঘরে"
        />

        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/onion.png"
              name="দেশি লাল পেঁয়াজ ৫ কেজি"
              price="২৫০"
              badge="নতুন"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/chili.png"
              name="শুকনো মরিচ ৫০০ গ্রাম"
              price="১৮০"
              oldPrice="২২০"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/mustard.png"
              name="সরিষা বীজ ১ কেজি"
              price="২২০"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/rice.png"
              name="হলুদ গুঁড়া ৫০০ গ্রাম"
              price="১৫০"
              badge="অর্গানিক"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/rice.png"
              name="মসুর ডাল ১ কেজি"
              price="১৪০"
              oldPrice="১৭০"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/mustard.png"
              name="তুলসী মধু ৫০০ গ্রাম"
              price="৪৫০"
              badge="প্রিমিয়াম"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/onion.png"
              name="দেশি ঘি ১ কেজি"
              price="১০৫০"
              oldPrice="১২০০"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-3">
            <ProductCard
              image="/images/chili.png"
              name="মিনিকেট চাল ৫ কেজি"
              price="৫২০"
            />
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary-dark text-white
            font-bangla font-semibold px-10 py-3.5 rounded-full
            transition-all duration-500 hover:shadow-xl
            hover:shadow-primary/20 cursor-pointer">
            সকল পণ্য দেখুন
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
