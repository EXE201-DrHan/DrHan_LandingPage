// Facebook API service for fetching posts
export interface FacebookPost {
  id: string
  message?: string
  story?: string
  created_time: string
  full_picture?: string
  picture?: string
  permalink_url: string
  likes?: {
    summary: {
      total_count: number
    }
  }
  comments?: {
    summary: {
      total_count: number
    }
  }
  shares?: {
    count: number
  }
  from: {
    name: string
    picture: {
      data: {
        url: string
      }
    }
  }
  attachments?: {
    data: Array<{
      type: string
      media?: {
        image: {
          src: string
        }
      }
      url?: string
      title?: string
      description?: string
    }>
  }
}

export interface FacebookResponse {
  data: FacebookPost[]
  paging?: {
    next?: string
    previous?: string
  }
}

class FacebookService {
  private baseUrl = 'https://graph.facebook.com/v18.0'
  private pageId = process.env.FACEBOOK_PAGE_ID || '61576751584978'
  private accessToken = process.env.FACEBOOK_ACCESS_TOKEN

  // Test if access token is valid
  async testToken(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/me?access_token=${this.accessToken}`
      const response = await fetch(url)
      return response.ok
    } catch (error) {
      console.error('Token test failed:', error)
      return false
    }
  }

  async getPosts(limit: number = 10): Promise<FacebookPost[]> {
    if (!this.accessToken) {
      console.error('No Facebook access token provided')
      return []
    }

    try {
      // Start with very basic fields that should always work
      const fields = 'id,message,created_time,permalink_url'
      const url = `${this.baseUrl}/${this.pageId}/posts?fields=${fields}&limit=${limit}&access_token=${this.accessToken}`
      
      console.log('Fetching Facebook posts from:', url.replace(this.accessToken, 'TOKEN_HIDDEN'))
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Facebook API error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`Facebook API error: ${response.status} - ${errorText}`)
      }

      const data: FacebookResponse = await response.json()
      
      // Add default values for missing fields
      const posts = (data.data || []).map(post => ({
        ...post,
        from: post.from || { 
          name: 'Nutri-Guardian', 
          picture: { data: { url: '/images/logo.png' } } 
        },
        likes: post.likes || { summary: { total_count: 0 } },
        comments: post.comments || { summary: { total_count: 0 } },
        shares: post.shares || { count: 0 }
      }))
      
      console.log(`Successfully fetched ${posts.length} Facebook posts`)
      return posts

    } catch (error) {
      console.error('Error fetching Facebook posts:', error)
      return []
    }
  }

  async getPost(postId: string): Promise<FacebookPost | null> {
    try {
      const fields = 'id,message,created_time,permalink_url'
      const url = `${this.baseUrl}/${postId}?fields=${fields}&access_token=${this.accessToken}`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }
      })

      if (!response.ok) {
        throw new Error(`Facebook API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching Facebook post:', error)
      return null
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  extractText(text: string, maxLength: number = 300): { text: string, isTruncated: boolean } {
    if (!text) return { text: '', isTruncated: false }
    
    if (text.length <= maxLength) {
      return { text, isTruncated: false }
    }
    
    const truncated = text.substring(0, maxLength).trim()
    const lastSpace = truncated.lastIndexOf(' ')
    const finalText = lastSpace > -1 ? truncated.substring(0, lastSpace) : truncated
    
    return { text: finalText + '...', isTruncated: true }
  }
}

export const facebookService = new FacebookService()
