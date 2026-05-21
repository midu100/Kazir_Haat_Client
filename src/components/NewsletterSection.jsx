import React from 'react'
import { FiSend } from 'react-icons/fi'

const NewsletterSection = () => {
  return (
    <section className="bg-primary">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-bangla text-xl md:text-2xl font-bold text-white mb-1">
              নিউজলেটার সাবস্ক্রাইব করুন
            </h2>
            <p className="text-white/50 font-bangla text-sm">
              অফার ও নতুন পণ্যের আপডেট পেতে সাবস্ক্রাইব করুন
            </p>
          </div>
          <div className="flex items-center bg-white rounded-lg overflow-hidden w-full md:w-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল..."
              className="px-4 py-3 text-sm font-bangla outline-none w-full md:w-72"
            />
            <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3
              font-bangla text-sm font-semibold transition-colors shrink-0 flex items-center
              gap-1.5 cursor-pointer">
              সাবস্ক্রাইব <FiSend size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
