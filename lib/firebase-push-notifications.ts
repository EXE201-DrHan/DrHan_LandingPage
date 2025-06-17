import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, MessagePayload } from 'firebase/messaging';

// Firebase configuration - these should be in your environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export interface FCMNotificationData {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  url?: string;
  data?: Record<string, string>;
}

export class FirebasePushNotificationService {
  private static messaging: any = null;

  // Initialize Firebase messaging
  static async initialize(): Promise<void> {
    if (typeof window === 'undefined') {
      return; // Server-side, skip initialization
    }

    try {
      // Register service worker first
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Firebase service worker registered:', registration);
      }

      // Initialize messaging
      this.messaging = getMessaging(app);
      console.log('Firebase messaging initialized');
    } catch (error) {
      console.error('Error initializing Firebase messaging:', error);
      throw error;
    }
  }

  // Check if push notifications are supported
  static isPushSupported(): boolean {
    return typeof window !== 'undefined' && 
           'serviceWorker' in navigator && 
           'PushManager' in window &&
           'Notification' in window;
  }

  // Request notification permission
  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isPushSupported()) {
      throw new Error('Push notifications are not supported');
    }

    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    return permission;
  }

  // Get FCM token
  static async getFCMToken(): Promise<string | null> {
    if (!this.messaging) {
      await this.initialize();
    }

    if (!this.messaging) {
      throw new Error('Firebase messaging not initialized');
    }

    try {
      const permission = await this.requestPermission();
      
      if (permission !== 'granted') {
        console.log('Notification permission denied');
        return null;
      }

      // Get FCM token
      const currentToken = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });

      if (currentToken) {
        console.log('FCM Token obtained:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw error;
    }
  }

  // Subscribe to push notifications
  static async subscribeToPush(): Promise<string | null> {
    try {
      const token = await this.getFCMToken();
      
      if (token) {
        // Send token to your backend
        await this.sendTokenToServer(token);
        return token;
      }
      
      return null;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  }

  // Send FCM token to server
  static async sendTokenToServer(token: string): Promise<void> {
    try {
      const response = await fetch('/api/firebase/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: navigator.platform
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }

      console.log('FCM token sent to server successfully');
    } catch (error) {
      console.error('Error sending token to server:', error);
      throw error;
    }
  }

  // Listen for foreground messages
  static onMessage(callback: (payload: MessagePayload) => void): void {
    if (!this.messaging) {
      console.error('Firebase messaging not initialized');
      return;
    }

    onMessage(this.messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      
      // Show notification when app is in foreground
      if (payload.notification) {
        this.showLocalNotification({
          title: payload.notification.title || 'Notification',
          body: payload.notification.body || '',
          icon: payload.notification.icon,
          image: payload.notification.image,
          url: payload.data?.url,
          data: payload.data
        });
      }
      
      callback(payload);
    });
  }

  // Show local notification (fallback)
  static showLocalNotification(data: FCMNotificationData): void {
    if (!this.isPushSupported()) {
      console.warn('Notifications not supported');
      return;
    }

    if (Notification.permission === 'granted') {
      const notification = new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/badge-72x72.png',
        data: data.data,
        requireInteraction: true,
        tag: 'nutri-guardian-notification'
      });

      // Handle notification click
      notification.onclick = function() {
        window.focus();
        if (data.url) {
          window.open(data.url, '_blank');
        }
        notification.close();
      };
    }
  }

  // Test notification (for development)
  static async sendTestNotification(): Promise<void> {
    try {
      const response = await fetch('/api/firebase/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Notification',
          body: 'This is a test notification from Nutri-Guardian',
          icon: '/icon-192x192.png',
          url: '/'
        }),
      });

      if (response.ok) {
        console.log('Test notification sent successfully');
      } else {
        console.error('Failed to send test notification');
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }

  // Get current FCM token (if already subscribed)
  static async getCurrentToken(): Promise<string | null> {
    if (!this.messaging) {
      await this.initialize();
    }

    if (!this.messaging) {
      return null;
    }

    try {
      const currentToken = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return currentToken;
    } catch (error) {
      console.error('Error getting current token:', error);
      return null;
    }
  }
}

export default FirebasePushNotificationService; 