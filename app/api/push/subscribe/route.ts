import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In production, you should store this in a database
const subscriptions: PushSubscription[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, timestamp } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription data' },
        { status: 400 }
      );
    }

    // Store the subscription (in production, save to database with user ID)
    subscriptions.push(subscription);

    console.log('New push subscription saved:', {
      endpoint: subscription.endpoint,
      timestamp
    });

    return NextResponse.json(
      { 
        message: 'Subscription saved successfully',
        subscriptionCount: subscriptions.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Push subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    subscriptionCount: subscriptions.length,
    message: 'Push subscription service is running'
  });
} 