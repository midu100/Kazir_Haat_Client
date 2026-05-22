import React, { useEffect, useState } from 'react';
import { videoServices } from '../../api';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  
  // Status messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await videoServices.getVideos();
      if (res?.success) {
        setVideos(res.data);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file.');
        setVideoFile(null);
        return;
      }
      setVideoFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Please provide a title.');
      return;
    }
    if (!videoFile) {
      setError('Please choose a video file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('video', videoFile);

    try {
      const res = await videoServices.addVideo(formData);
      if (res?.success) {
        setSuccess('Video uploaded successfully!');
        setTitle('');
        setDescription('');
        setVideoFile(null);
        // Clear file input manually
        document.getElementById('videoFileInput').value = '';
        fetchVideos();
      } else {
        setError(res?.message || 'Something went wrong during upload.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to upload video. Please make sure file is not too large.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await videoServices.deleteVideo(id);
      if (res?.success) {
        setVideos(videos.filter((v) => v._id !== id));
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Failed to delete video.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Product Videos</h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage promotional videos displayed on the public landing page.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Upload Form Card */}
        <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Post New Video</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 text-sm bg-red-50 border border-red-100 text-red-600 rounded-xl font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3.5 text-sm bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl font-medium">
                {success}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Video Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mustard Oil Extraction Process"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-admin-blue transition-colors"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a brief description about what this video shows..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-admin-blue transition-colors resize-none"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Select Video File *</label>
              <input
                id="videoFileInput"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-admin-blue/10 file:text-admin-blue hover:file:bg-admin-blue/20 cursor-pointer"
                disabled={uploading}
              />
              <p className="text-[10px] text-gray-400 mt-1.5">Maximum size: 50MB. Supported formats: .mp4, .webm, .mov, etc.</p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer
                ${uploading 
                  ? 'bg-admin-blue/70 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-admin-blue to-admin-blue-dark hover:shadow-lg hover:shadow-admin-blue/20'
                }`}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading to Cloudinary...
                </>
              ) : (
                'Upload Video'
              )}
            </button>
          </form>
        </div>

        {/* Videos List Card */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Videos ({videos.length})</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-10 h-10 border-4 border-admin-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm">Loading videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <span className="text-4xl mb-3 block">🎥</span>
              <p className="font-semibold text-gray-700">No videos uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">Use the upload form to add promotional videos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {videos.map((video) => (
                <div key={video._id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col bg-gray-50/50">
                  {/* Player area */}
                  <div className="aspect-video bg-black relative flex items-center justify-center">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="none"
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Info area */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{video.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{video.description || 'No description provided.'}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">
                        {new Date(video.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                      >
                        Delete Video
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVideos;
