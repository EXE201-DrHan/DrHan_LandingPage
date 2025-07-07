import { NextRequest, NextResponse } from 'next/server'
import { facebookService } from '@/lib/facebook'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const posts = await facebookService.getPosts(limit)
    
    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    })
  } catch (error) {
    console.error('Facebook API route error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Facebook posts',
      data: []
    }, { status: 500 })
  }
}