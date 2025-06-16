import { NextRequest, NextResponse } from 'next/server';
import { PushNotificationService, PushNotificationData } from '@/lib/push-notifications';

// In production, you would get subscriptions from database
// This should match the subscriptions array from subscribe route
let subscriptions: PushSubscription[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, message, userId, icon, url } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const notificationData: PushNotificationData = {
      title,
      body: message,
      icon: icon || '/icon-192x192.png',
      url: url || '/',
      data: {
        userId: userId || null,
        timestamp: new Date().toISOString()
      }
    };

    // Get all subscriptions (in production, filter by userId if provided)
    const targetSubscriptions = subscriptions;

    if (targetSubscriptions.length === 0) {
      return NextResponse.json(
        { 
          message: 'No subscriptions found',
          sent: 0
        },
        { status: 200 }
      );
    }

    // Send notifications to all subscriptions
    const sendPromises = targetSubscriptions.map(async (subscription) => {
      try {
        await PushNotificationService.sendNotification(subscription, notificationData);
        return { success: true, endpoint: subscription.endpoint };
      } catch (error) {
        console.error('Failed to send to subscription:', error);
        return { success: false, endpoint: subscription.endpoint, error };
      }
    });

    const results = await Promise.allSettled(sendPromises);
    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;

    console.log(`Push notifications sent: ${successful}/${targetSubscriptions.length}`);

    return NextResponse.json(
      { 
        message: 'Push notifications processed',
        sent: successful,
        total: targetSubscriptions.length,
        data: notificationData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Push notification send error:', error);
    return NextResponse.json(
      { error: 'Failed to send push notifications' },
      { status: 500 }
    );
  }
}

// Test endpoint to check service status
export async function GET() {
  return NextResponse.json({
    message: 'Push notification send service is running',
    subscriptionCount: subscriptions.length,
    vapidConfigured: !!(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
  });
} 