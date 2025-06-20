import { NextRequest, NextResponse } from 'next/server';

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

    // Here you would typically store the token in a database
    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: 'Token registered successfully',
      data: {
        token,
        timestamp,
        userAgent,
        platform,
        userId
      }
    });

  } catch (error) {
    console.error('Error in subscription handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Firebase FCM subscription service is running'
  });
}