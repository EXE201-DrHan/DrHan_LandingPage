import webpush from 'web-push';

// VAPID keys for web push (you should generate these and store them securely)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:your-email@example.com';

// Configure web-push with VAPID keys
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    VAPID_EMAIL,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
}

export interface PushNotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  data?: any;
}

export class PushNotificationService {
  // Check if push notifications are supported
  static isPushSupported(): boolean {
    return typeof window !== 'undefined' && 
           'serviceWorker' in navigator && 
           'PushManager' in window;
  }

  // Request permission for push notifications
  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isPushSupported()) {
      throw new Error('Push notifications are not supported');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Subscribe user to push notifications
  static async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.isPushSupported()) {
      throw new Error('Push notifications are not supported');
    }

    const permission = await this.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Push notification permission denied');
    }

    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    return subscription;
  }

  // Send push subscription to server
  static async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
  }

  // Send push notification (server-side)
  static async sendNotification(
    subscription: PushSubscription, 
    data: PushNotificationData
  ): Promise<void> {
    const payload = JSON.stringify({
      title: data.title,
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/badge-72x72.png',
      url: data.url || '/',
      data: data.data || {}
    });

    try {
      // Convert browser PushSubscription to web-push compatible format
      const webPushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.getKey('auth') ? Buffer.from(subscription.getKey('auth')!).toString('base64') : '',
          p256dh: subscription.getKey('p256dh') ? Buffer.from(subscription.getKey('p256dh')!).toString('base64') : ''
        }
      };
      
      await webpush.sendNotification(webPushSubscription, payload);
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }

  // Helper function to convert VAPID key
  private static urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Show local notification (fallback)
  static showLocalNotification(data: PushNotificationData): void {
    if (!this.isPushSupported()) {
      console.warn('Notifications not supported');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/badge-72x72.png',
      });
    }
  }
}

export { VAPID_PUBLIC_KEY }; 