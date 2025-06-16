import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In production, store FCM tokens in database with user associations
const fcmTokens: Array<{
  token: string;
  timestamp: string;
  userAgent: string;
  platform: string;
  userId?: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, timestamp, userAgent, platform, userId } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'FCM token is required' },
        { status: 400 }
      );
    }

    // Check if token already exists
    const existingToken = fcmTokens.find(t => t.token === token);
    
    if (existingToken) {
      // Update existing token
      existingToken.timestamp = timestamp;
      existingToken.userAgent = userAgent;
      existingToken.platform = platform;
      if (userId) existingToken.userId = userId;
      
      console.log('FCM token updated:', {
        token: token.substring(0, 20) + '...',
        timestamp,
        userId
      });
    } else {
      // Add new token
      fcmTokens.push({
        token,
        timestamp,
        userAgent,
        platform,
        userId
      });
      
      console.log('New FCM token saved:', {
        token: token.substring(0, 20) + '...',
        timestamp,
        userId
      });
    }

    return NextResponse.json(
      { 
        message: 'FCM token saved successfully',
        tokenCount: fcmTokens.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('FCM token subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to save FCM token' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    tokenCount: fcmTokens.length,
    message: 'Firebase FCM subscription service is running'
  });
}

// Export the tokens array for use in send endpoint
export { fcmTokens }; 