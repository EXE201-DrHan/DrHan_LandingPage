// Note: You need to install firebase first: npm install firebase

export interface FCMNotificationData {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  url?: string;
  data?: Record<string, string>;
}

export class FirebaseNotificationService {
  private static messaging: any = null;
  private static app: any = null;

  // Initialize Firebase (call this once in your app)
  static async initialize(): Promise<void> {
    if (typeof window === 'undefined') {
      return; // Server-side, skip initialization
    }

    try {
      // Dynamically import Firebase modules
      const { initializeApp, getApps } = await import('firebase/app');
      const { getMessaging, getToken, onMessage } = await import('firebase/messaging');

      // Firebase configuration
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      };

      // Initialize Firebase app
      this.app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

      // Register service worker
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Firebase service worker registered');
      }

      // Initialize messaging
      this.messaging = getMessaging(this.app);
      console.log('Firebase messaging initialized');

      // Set up foreground message listener
      this.setupForegroundMessageListener();
    } catch (error) {
      console.error('Error initializing Firebase:', error);
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

  // Get FCM registration token
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

      // Dynamic import to avoid SSR issues
      const { getToken } = await import('firebase/messaging');

      const currentToken = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });

      if (currentToken) {
        console.log('FCM Token obtained:', currentToken);
        return currentToken;
      } else {
        console.log('No FCM registration token available');
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
        await this.sendTokenToBackend(token);
        return token;
      }
      
      return null;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  }

  // Send FCM token to backend
  static async sendTokenToBackend(token: string): Promise<void> {
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
        throw new Error('Failed to send FCM token to backend');
      }

      console.log('FCM token sent to backend successfully');
    } catch (error) {
      console.error('Error sending FCM token to backend:', error);
      throw error;
    }
  }

  // Setup foreground message listener
  private static async setupForegroundMessageListener(): Promise<void> {
    if (!this.messaging) return;

    try {
      const { onMessage } = await import('firebase/messaging');
      
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
      });
    } catch (error) {
      console.error('Error setting up foreground message listener:', error);
    }
  }

  // Show local notification (when app is in foreground)
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
        //image: data.image,
        data: data.data,
        requireInteraction: true,
        tag: 'nutri-guardian-fcm-notification'
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

  // Send test notification (for development)
  static async sendTestNotification(): Promise<void> {
    try {
      const response = await fetch('/api/firebase/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Notification',
          body: 'This is a test Firebase notification from Nutri-Guardian',
          icon: '/icon-192x192.png',
          url: '/'
        }),
      });

      if (response.ok) {
        console.log('Test Firebase notification sent successfully');
      } else {
        console.error('Failed to send test Firebase notification');
      }
    } catch (error) {
      console.error('Error sending test Firebase notification:', error);
    }
  }
}

export default FirebaseNotificationService; 