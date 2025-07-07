'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, ExternalLink, Clock } from 'lucide-react'
import Image from 'next/image'
import type { FacebookPost } from '@/lib/facebook'
import { facebookService } from '@/lib/facebook'

interface FacebookPostComponentProps {
  post: FacebookPost
}

// Helper function to get the best image URL
function getPostImageUrl(post: FacebookPost): string | null {
  // Priority: full_picture > attachments > picture
  if (post.full_picture) {
    return post.full_picture
  }
  
  if (post.attachments?.data && post.attachments.data.length > 0) {
    for (const attachment of post.attachments.data) {
      if (attachment.type === 'photo' && attachment.media?.image?.src) {
        return attachment.media.image.src
      }
    }
  }
  
  if (post.picture) {
    return post.picture
  }
  
  return null
}

export function FacebookPostComponent({ post }: FacebookPostComponentProps) {
  const [showFullText, setShowFullText] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [imageViewMode, setImageViewMode] = useState<'contain' | 'cover'>('contain')

  const { text: displayText, isTruncated } = facebookService.extractText(
    post.message || post.story || '', 
    showFullText ? 5000 : 300
  )

  const formattedDate = facebookService.formatDate(post.created_time)
  const imageUrl = getPostImageUrl(post)

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3">
        <div className="relative w-10 h-10">
          <Image
            src={post.from?.picture?.data?.url || '/images/logo.png'}
            alt={post.from?.name || 'Nutri-Guardian'}
            fill
            className="rounded-full object-cover"
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {post.from?.name || 'Nutri-Guardian'}
          </h3>
          <div className="flex items-center text-gray-500 text-xs space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <a
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="View on Facebook"
        >
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </a>
      </div>

      {/* Post Content */}
      {displayText && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {displayText}
          </p>
          {isTruncated && !showFullText && (
            <button
              onClick={() => setShowFullText(true)}
              className="text-blue-600 hover:text-blue-700 font-medium mt-2 text-sm"
            >
              See more
            </button>
          )}
          {showFullText && isTruncated && (
            <button
              onClick={() => setShowFullText(false)}
              className="text-blue-600 hover:text-blue-700 font-medium mt-2 text-sm"
            >
              See less
            </button>
          )}
        </div>
      )}

      {/* Post Image */}
      {imageUrl && !imageError && (
        <div className="relative">
          <div className="relative w-full bg-gray-100">
            <Image
              src={imageUrl}
              alt="Post image"
              width={600}
              height={400}
              className={`w-full h-auto object-${imageViewMode} max-h-96`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false)
                setImageError(true)
              }}
              loading="lazy"
              unoptimized // Fallback for problematic Facebook URLs
            />
            
            {/* Image View Toggle Button */}
            <button
              onClick={() => setImageViewMode(imageViewMode === 'contain' ? 'cover' : 'contain')}
              className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-xs px-2 py-1 rounded transition-all"
              title={imageViewMode === 'contain' ? 'Crop to fit' : 'Show full image'}
            >
              {imageViewMode === 'contain' ? '🔍' : '📐'}
            </button>

            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Attachments */}
      {post.attachments?.data && post.attachments.data.length > 0 && (
        <div className="border-t border-gray-100">
          {post.attachments.data.map((attachment, index) => (
            <div key={index} className="p-4 border-b border-gray-50 last:border-b-0">
              {attachment.type === 'photo' && attachment.media?.image && (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={attachment.media.image.src}
                    alt="Attachment image"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {attachment.title && (
                <h4 className="font-semibold text-gray-900 mt-2">{attachment.title}</h4>
              )}
              {attachment.description && (
                <p className="text-gray-600 text-sm mt-1">{attachment.description}</p>
              )}
              {attachment.url && (
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            {post.likes?.summary?.total_count && post.likes.summary.total_count > 0 && (
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>{post.likes.summary.total_count}</span>
              </div>
            )}
            {post.comments?.summary?.total_count && post.comments.summary.total_count > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.summary.total_count} comments</span>
              </div>
            )}
            {post.shares?.count && post.shares.count > 0 && (
              <div className="flex items-center space-x-1">
                <Share2 className="w-4 h-4" />
                <span>{post.shares.count} shares</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-center">
          <a
            href={post.permalink_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600 font-medium text-sm flex-1"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Facebook</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function FacebookPostSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4 animate-pulse">
      <div className="p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-64 bg-gray-200"></div>
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}
