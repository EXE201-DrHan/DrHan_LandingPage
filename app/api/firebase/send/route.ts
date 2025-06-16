import { NextRequest, NextResponse } from 'next/server';

// This endpoint is for testing from frontend
// In production, your ASP.NET Core backend will send notifications directly to FCM
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: messageBody, userId, icon, url, imageUrl } = body;

    if (!title || !messageBody) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      );
    }

    // This is a placeholder endpoint for frontend testing
    // Your ASP.NET Core backend should send notifications directly to Firebase FCM API
    console.log('Firebase notification request received:', {
      title,
      body: messageBody,
      userId,
      icon,
      url,
      imageUrl
    });

    // Return success response
    return NextResponse.json(
      { 
        message: 'Notification request processed (this is a test endpoint)',
        data: {
          title,
          body: messageBody,
          userId,
          icon,
          url
        },
        note: 'In production, your ASP.NET Core backend should send notifications directly to Firebase FCM API'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Firebase notification send error:', error);
    return NextResponse.json(
      { error: 'Failed to process notification request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Firebase notification send service is running',
    note: 'This is a test endpoint. In production, use your ASP.NET Core backend to send notifications to Firebase FCM API.',
    documentation: 'See FIREBASE_SETUP.md for ASP.NET Core integration instructions'
  });
} 