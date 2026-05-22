import React, { useEffect, useState } from 'react'
import { FiPlay } from 'react-icons/fi'
import { videoServices } from '../api'

const VideoSection = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  // Default placeholders in case no videos are uploaded yet
  const placeholders = [
    {
      _id: 'p1',
      title: 'How We Make Pure Mustard Oil',
      thumbnail: '/images/mustard.png',
      duration: '3:25',
      videoUrl: ''
    },
    {
      _id: 'p2',
      title: 'Sundarbans Honey Collection',
      thumbnail: '/images/onion.png',
      duration: '2:48',
      videoUrl: ''
    },
    {
      _id: 'p3',
      title: 'Our Organic Spice Process',
      thumbnail: '/images/chili.png',
      duration: '4:12',
      videoUrl: ''
    }
  ]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await videoServices.getVideos()
        if (res?.success && res.data?.length > 0) {
          setVideos(res.data)
        } else {
          setVideos([])
        }
      } catch (err) {
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const displayVideos = videos.length > 0 ? videos : placeholders

  return (
    <section className="bg-light">
      <div className="w-full max-w-[1400px] mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-poppins text-2xl md:text-3xl font-bold text-dark mb-2">
            Watch Our Products
          </h2>
          <p className="text-body text-sm font-poppins max-w-md mx-auto">
            See how we source, process, and deliver farm-fresh organic products
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-8 h-[2px] bg-secondary/40 rounded-full"></span>
            <span className="w-3 h-3 bg-secondary rounded-full"></span>
            <span className="w-8 h-[2px] bg-secondary/40 rounded-full"></span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Video Grid */
          <div className="flex flex-wrap -mx-3">
            {displayVideos.map((video) => (
              <div key={video._id} className="w-full md:w-1/3 px-3 mb-6 animate-fadeIn">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 
                  hover:shadow-xl transition-all duration-500 group cursor-pointer h-full">
                  {/* Video Thumbnail / Player Area */}
                  <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                    {video.videoUrl ? (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        {/* Thumbnail Placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 
                          flex items-center justify-center">
                          <img src={video.thumbnail} alt={video.title}
                            className="h-24 object-contain opacity-60 group-hover:scale-110 
                            transition-transform duration-500" />
                        </div>
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center
                          bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                          <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center 
                            justify-center group-hover:scale-110 group-hover:bg-secondary 
                            transition-all duration-300">
                            <FiPlay size={22} className="text-primary group-hover:text-white ml-1 
                              transition-colors duration-300" />
                          </div>
                        </div>
                        {/* Duration Badge */}
                        <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] 
                          font-poppins px-2 py-0.5 rounded">{video.duration}</span>
                      </>
                    )}
                  </div>
                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-poppins font-semibold text-sm text-dark 
                      group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-body mt-1 font-poppins line-clamp-2">
                      {video.description || 'Kazir Haat Organic'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Notice */}
        <div className="text-center mt-4">
          <p className="text-body/50 text-xs font-poppins">
            More product videos coming soon • Stay tuned!
          </p>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
