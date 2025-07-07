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
      // Enhanced fields with engagement data and images
      const enhancedFields = [
        'id',
        'message',
        'story',
        'created_time',
        'permalink_url',
        'full_picture',
        'picture',
        'object_id',
        'likes.summary(true)',
        'comments.summary(true)', 
        'shares',
        'from{name,picture}',
        'attachments{type,media{image},url,title,description,subattachments{media{image}}}'
      ].join(',')

      // Basic fields with images as fallback
      const basicFieldsWithImages = [
        'id',
        'message',
        'created_time',
        'permalink_url',
        'full_picture',
        'picture',
        'attachments{type,media{image},url}'
      ].join(',')

      // Minimal fields as last resort
      const minimalFields = 'id,message,created_time,permalink_url'
      
      // Try enhanced fields first
      let url = `${this.baseUrl}/${this.pageId}/posts?fields=${enhancedFields}&limit=${limit}&access_token=${this.accessToken}`
      console.log('Trying posts endpoint with enhanced fields:', url.replace(this.accessToken, 'TOKEN_HIDDEN'))
      
      let response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      })

      let data: FacebookResponse | null = null

      if (response.ok) {
        data = await response.json()
        console.log('Enhanced posts endpoint response:', data)
        
        if (data && data.data && data.data.length > 0) {
          return this.formatPosts(data.data)
        }
      } else {
        console.log('Enhanced fields failed, trying basic fields with images...')
        // Fallback to basic fields with images
        url = `${this.baseUrl}/${this.pageId}/posts?fields=${basicFieldsWithImages}&limit=${limit}&access_token=${this.accessToken}`
        console.log('Trying posts endpoint with basic image fields:', url.replace(this.accessToken, 'TOKEN_HIDDEN'))
        
        response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 300 }
        })

        if (response.ok) {
          data = await response.json()
          console.log('Basic image posts endpoint response:', data)
          
          if (data && data.data && data.data.length > 0) {
            return this.formatPosts(data.data)
          }
        } else {
          console.log('Basic image fields also failed, trying minimal fields...')
          // Last resort - minimal fields
          url = `${this.baseUrl}/${this.pageId}/posts?fields=${minimalFields}&limit=${limit}&access_token=${this.accessToken}`
          console.log('Trying posts endpoint with minimal fields:', url.replace(this.accessToken, 'TOKEN_HIDDEN'))
          
          response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
            },
            next: { revalidate: 300 }
          })

          if (response.ok) {
            data = await response.json()
            console.log('Minimal posts endpoint response:', data)
            
            if (data && data.data && data.data.length > 0) {
              return this.formatPosts(data.data)
            }
          }
        }
      }

      // If posts endpoint returns empty, try feed endpoint with minimal fields
      console.log('Posts endpoint returned 0 results, trying feed endpoint...')
      url = `${this.baseUrl}/${this.pageId}/feed?fields=${minimalFields}&limit=${limit}&access_token=${this.accessToken}`
      console.log('Trying feed endpoint:', url.replace(this.accessToken, 'TOKEN_HIDDEN'))
      
      response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }
      })

      if (response.ok) {
        data = await response.json()
        console.log('Feed endpoint response:', data)
        
        if (data && data.data && data.data.length > 0) {
          return this.formatPosts(data.data)
        }
      }

      // If both fail, try to get page info to verify connection
      console.log('Both endpoints returned 0 results, checking page info...')
      const pageUrl = `${this.baseUrl}/${this.pageId}?fields=id,name,posts_count&access_token=${this.accessToken}`
      console.log('Checking page info:', pageUrl.replace(this.accessToken, 'TOKEN_HIDDEN'))
      
      const pageResponse = await fetch(pageUrl)
      if (pageResponse.ok) {
        const pageData = await pageResponse.json()
        console.log('Page info:', pageData)
      }

      console.log('No posts found on the page')
      return []

    } catch (error) {
      console.error('Error fetching Facebook posts:', error)
      return []
    }
  }

  private formatPosts(posts: FacebookPost[]): FacebookPost[] {
    return posts.map(post => ({
      ...post,
      from: post.from || { 
        name: 'Nutri-Guardian', 
        picture: { data: { url: '/images/logo.png' } } 
      },
      likes: post.likes || { summary: { total_count: 0 } },
      comments: post.comments || { summary: { total_count: 0 } },
      shares: post.shares || { count: 0 }
    }))
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
