// Client-side Facebook service that uses our API route
import type { FacebookPost } from './facebook'

export interface FacebookAPIResponse {
  success: boolean
  data: FacebookPost[]
  count: number
  error?: string
}

export class FacebookClientService {
  async getPosts(limit: number = 10): Promise<FacebookPost[]> {
    try {
      const response = await fetch(`/api/facebook/posts?limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: FacebookAPIResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch posts')
      }
      
      return result.data
    } catch (error) {
      console.error('Error fetching Facebook posts:', error)
      return []
    }
  }
}

export const facebookClientService = new FacebookClientService()