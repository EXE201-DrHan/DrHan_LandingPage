# Push Notifications Setup Guide

This guide explains how to set up and use push notifications in your Nutri-Guardian application.

## Overview

The push notification system has been implemented with the following components:

1. **Frontend Service** (`lib/push-notifications.ts`) - Handles web push subscription and client-side notifications
2. **Service Worker** (`public/sw.js`) - Manages background push events and displays notifications
3. **API Endpoints** - Handle subscription management and notification sending
4. **Integration with Registration** - Automatically sends welcome notifications

## Setup Instructions

### 1. Generate VAPID Keys

First, you need to generate VAPID keys for web push notifications:

```bash
npx web-push generate-vapid-keys
```

This will output something like:
```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa40HI0staDiUnSQkd8oqFJr5HCcIAQLVKfH5LNIpjcV8l5vLjJKrBzj5F8dXk

Private Key:
F6k4TVQFqRLd9L1lLM9lk3E7XjlDLOXkzUNjgkXgVwc
=======================================
```

### 2. Set Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Push Notification Configuration
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
VAPID_EMAIL=mailto:your-email@example.com
```

**Important**: Replace the placeholder values with your actual VAPID keys from step 1.

### 3. Add Icons

You need to add notification icons to your `public` folder:

- `public/icon-192x192.png` - Main notification icon (192x192 pixels)
- `public/badge-72x72.png` - Badge icon for some platforms (72x72 pixels)

### 4. Backend Integration (ASP.NET Core)

To integrate with your ASP.NET Core backend, you can call the Next.js push notification endpoints from your backend:

```csharp
// In your RegisterUserCommandHandler
public async Task<AppResponse<RegisterUserResponse>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
{
    // ... existing registration code ...

    try 
    {
        await _userService.InsertAsync(user, request.Password);
        await _userService.AssignRoleAsync(user, UserRoles.Customer.ToString());

        // Generate and send OTP via email
        var otpCode = await _otpService.GenerateOtpAsync(user.Id, OtpType.EmailVerification);
        await _emailService.SendOtpAsync(user.Email, user.FullName, otpCode);

        // Send push notification
        await SendPushNotificationAsync(user);

        // ... rest of the code ...
    }
    catch (Exception ex)
    {
        // ... error handling ...
    }
}

private async Task SendPushNotificationAsync(ApplicationUser user)
{
    try
    {
        var notification = new
        {
            title = "Welcome to Nutri-Guardian! 🎉",
            message = $"Hi {user.FullName}! Your account has been created successfully. Please check your email for OTP verification.",
            userId = user.Id,
            icon = "/icon-192x192.png",
            url = "/login"
        };

        // Call your Next.js API endpoint
        using var httpClient = new HttpClient();
        var json = JsonSerializer.Serialize(notification);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await httpClient.PostAsync("http://localhost:3000/api/push/send", content);
        
        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("Push notification sent successfully for user {UserId}", user.Id);
        }
        else
        {
            _logger.LogWarning("Failed to send push notification for user {UserId}", user.Id);
        }
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error sending push notification for user {UserId}", user.Id);
    }
}
```

## API Endpoints

### Subscribe to Push Notifications
```http
POST /api/push/subscribe
Content-Type: application/json

{
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "keys": {
      "p256dh": "...",
      "auth": "..."
    }
  },
  "timestamp": "2023-12-07T10:30:00Z"
}
```

### Send Push Notification
```http
POST /api/push/send
Content-Type: application/json

{
  "title": "Notification Title",
  "message": "Notification message",
  "userId": "optional-user-id",
  "icon": "/icon-192x192.png",
  "url": "/target-url"
}
```

## How It Works

1. **User Registration**: When a user visits the registration page, they're prompted to enable push notifications
2. **Service Worker Registration**: The service worker is automatically registered to handle background events
3. **Push Subscription**: When enabled, the browser creates a push subscription with the push service (FCM for Chrome, etc.)
4. **Subscription Storage**: The subscription is sent to your server and stored (currently in memory, should be in database for production)
5. **Notification Sending**: When registration is successful, a push notification is sent to all subscribed devices
6. **Notification Display**: The service worker receives the push event and displays the notification
7. **User Interaction**: Users can click notifications to navigate to specific pages

## Browser Support

- ✅ Chrome 50+
- ✅ Firefox 44+  
- ✅ Safari 16+
- ✅ Edge 17+
- ❌ Internet Explorer (not supported)

## Production Considerations

1. **Database Storage**: Replace in-memory subscription storage with database storage
2. **User Association**: Associate push subscriptions with user accounts
3. **Cleanup**: Remove expired or invalid subscriptions
4. **Rate Limiting**: Implement rate limiting for notification sending
5. **Analytics**: Track notification delivery and click-through rates
6. **Error Handling**: Handle failed notifications and retry logic

## Testing

1. **Local Testing**: Use `http://localhost:3000` for development
2. **HTTPS Required**: Push notifications require HTTPS in production
3. **Browser DevTools**: Use Application tab to inspect service worker and push subscriptions
4. **Test Notifications**: Use the `/api/push/send` endpoint to test notifications

## Troubleshooting

### Service Worker Not Registering
- Check console for errors
- Ensure service worker file is accessible at `/sw.js`
- Verify HTTPS in production

### Push Notifications Not Working
- Check VAPID keys are correctly set
- Verify notification permission is granted
- Check browser developer tools for push subscription status
- Ensure service worker is active

### Notifications Not Displaying
- Check service worker console logs
- Verify notification data format
- Test with simple notification first

## Security Notes

- Keep VAPID private key secure and never expose it in client-side code
- Only the public key should be accessible to the frontend
- Validate all push notification requests on the server
- Consider implementing user-specific notification preferences 