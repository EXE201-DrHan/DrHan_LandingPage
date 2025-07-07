'use client'

import { useState, useEffect } from 'react'
import { Megaphone, Loader2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react"
import { facebookClientService } from '@/lib/facebook-client'
import type { FacebookPost } from '@/lib/facebook'
import { FacebookPostComponent } from '@/components/facebook-post'

const staticAnnouncements = [
  {
    title: "Welcome to Nutri-Guardian!",
    date: "2025-06-01",
    description: "We are excited to launch our new platform for allergy-friendly eating and food allergy management.",
  },
  {
    title: "New Article Series: Allergy Safety",
    date: "2025-06-05",
    description: "Check out our latest articles on how to stay safe and healthy with food allergies.",
  },
  {
    title: "Community Forum Coming Soon",
    date: "2025-06-10",
    description: "We're building a space for you to connect, share, and support each other. Stay tuned!",
  },
];

export default function UpdatePage() {
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showStaticPosts, setShowStaticPosts] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const posts = await facebookClientService.getPosts(10)
      setFacebookPosts(posts)
      
      // If no Facebook posts are available, show static announcements
      if (posts.length === 0) {
        setShowStaticPosts(true)
      }
    } catch (err) {
      console.error('Error fetching Facebook posts:', err)
      setError('Unable to load latest updates. Please try again later.')
      setShowStaticPosts(true) // Fallback to static posts on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleRetry = () => {
    setShowStaticPosts(false)
    fetchPosts()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Megaphone className="w-16 h-16 text-blue-400 mb-4 mx-auto" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Latest Updates</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Stay informed with the latest news, tips, and announcements from the Nutri-Guardian community.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-3" />
            <span className="text-gray-600">Loading latest updates...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-red-800">Connection Issue</h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        )}

        {/* Facebook Posts */}
        {!loading && !showStaticPosts && facebookPosts.length > 0 && (
          <div className="space-y-6">
            {facebookPosts.map((post) => (
              <FacebookPostComponent key={post.id} post={post} />
            ))}
            
            {/* Load More Button */}
            <div className="text-center pt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61576751584978"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                View More on Facebook
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        )}

        {/* Static Announcements Fallback */}
        {!loading && (showStaticPosts || facebookPosts.length === 0) && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-amber-800 text-sm">
                  Showing local announcements. Visit our{' '}
                  <a 
                    href="https://www.facebook.com/profile.php?id=61576751584978"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Facebook page
                  </a>{' '}
                  for the latest updates.
                </span>
              </div>
            </div>
            
            {staticAnnouncements.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center mb-3">
                  <span className="text-blue-600 font-semibold text-lg mr-2">{item.title}</span>
                  <span className="text-sm text-gray-500 ml-auto">{item.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 