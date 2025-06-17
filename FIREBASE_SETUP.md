# Firebase Push Notifications with ASP.NET Core

This guide shows how to implement Firebase Cloud Messaging (FCM) push notifications with your ASP.NET Core backend and Next.js frontend.

## Overview

Firebase Cloud Messaging (FCM) is Google's cross-platform messaging solution that lets you reliably send messages at no cost. It's more robust than web push and provides better analytics and targeting.

## Setup Steps

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Cloud Messaging API**
4. Go to Project Settings > General > Your apps
5. Add a web app and get your config
6. Go to Project Settings > Cloud Messaging
7. Generate a new key pair for VAPID (Web Push certificates)

### 2. Frontend Environment Variables

Create `.env.local` in your Next.js project:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 3. Install Firebase SDK

```bash
npm install firebase
```

### 4. Update Service Worker Configuration

Edit `public/firebase-messaging-sw.js` and replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your_actual_api_key",
  authDomain: "your_actual_project.firebaseapp.com",
  projectId: "your_actual_project_id",
  storageBucket: "your_actual_project.appspot.com",
  messagingSenderId: "your_actual_sender_id",
  appId: "your_actual_app_id"
};
```

### 5. ASP.NET Core Backend Integration

#### Install Firebase Admin SDK

In your ASP.NET Core project, install the Firebase Admin SDK:

```bash
dotnet add package FirebaseAdmin
```

#### Create Firebase Service

Create a Firebase service in your ASP.NET Core project:

```csharp
// Services/IFirebaseNotificationService.cs
public interface IFirebaseNotificationService
{
    Task<string> SendNotificationAsync(string fcmToken, string title, string body, string imageUrl = null, Dictionary<string, string> data = null);
    Task<string> SendToMultipleAsync(List<string> fcmTokens, string title, string body, string imageUrl = null, Dictionary<string, string> data = null);
}

// Services/FirebaseNotificationService.cs
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;

public class FirebaseNotificationService : IFirebaseNotificationService
{
    private readonly ILogger<FirebaseNotificationService> _logger;

    public FirebaseNotificationService(ILogger<FirebaseNotificationService> logger)
    {
        _logger = logger;
        
        // Initialize Firebase Admin SDK
        if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("path/to/your/firebase-service-account-key.json"),
                ProjectId = "your-firebase-project-id"
            });
        }
    }

    public async Task<string> SendNotificationAsync(string fcmToken, string title, string body, string imageUrl = null, Dictionary<string, string> data = null)
    {
        try
        {
            var message = new Message()
            {
                Token = fcmToken,
                Notification = new Notification()
                {
                    Title = title,
                    Body = body,
                    ImageUrl = imageUrl
                },
                Data = data ?? new Dictionary<string, string>(),
                Webpush = new WebpushConfig()
                {
                    Notification = new WebpushNotification()
                    {
                        Icon = "/icon-192x192.png",
                        Badge = "/badge-72x72.png",
                        RequireInteraction = true
                    },
                    FcmOptions = new WebpushFcmOptions()
                    {
                        Link = data?.ContainsKey("url") == true ? data["url"] : "/"
                    }
                }
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            _logger.LogInformation($"Successfully sent message: {response}");
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending FCM notification");
            throw;
        }
    }

    public async Task<string> SendToMultipleAsync(List<string> fcmTokens, string title, string body, string imageUrl = null, Dictionary<string, string> data = null)
    {
        try
        {
            var message = new MulticastMessage()
            {
                Tokens = fcmTokens,
                Notification = new Notification()
                {
                    Title = title,
                    Body = body,
                    ImageUrl = imageUrl
                },
                Data = data ?? new Dictionary<string, string>(),
                Webpush = new WebpushConfig()
                {
                    Notification = new WebpushNotification()
                    {
                        Icon = "/icon-192x192.png",
                        Badge = "/badge-72x72.png",
                        RequireInteraction = true
                    }
                }
            };

            BatchResponse response = await FirebaseMessaging.DefaultInstance.SendMulticastAsync(message);
            _logger.LogInformation($"Successfully sent {response.SuccessCount} messages out of {fcmTokens.Count}");
            
            return $"Success: {response.SuccessCount}/{fcmTokens.Count}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending FCM notifications to multiple tokens");
            throw;
        }
    }
}
```

#### Register Service in Program.cs

```csharp
// Program.cs
builder.Services.AddScoped<IFirebaseNotificationService, FirebaseNotificationService>();
```

#### Update Your Registration Handler

Update your registration command handler to send Firebase notifications:

```csharp
public async Task<AppResponse<RegisterUserResponse>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
{
    var existingUser = await _userService.GetUserByEmailAsync(request.Email);
    if (existingUser != null)
    {
        return new AppResponse<RegisterUserResponse>()
            .SetErrorResponse("Email", "User with this email already exists");
    }

    if (!Enum.TryParse<Gender>(request.Gender, true, out var genderEnum))
    {
        return new AppResponse<RegisterUserResponse>()
            .SetErrorResponse("Gender", "Invalid gender value");
    }

    var user = new ApplicationUser
    {
        UserName = request.Email,
        Email = request.Email,
        FullName = request.FullName,
        DateOfBirth = request.DateOfBirth,
        Gender = genderEnum,
        Status = UserStatus.Enabled,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    try
    {
        await _userService.InsertAsync(user, request.Password);
        await _userService.AssignRoleAsync(user, UserRoles.Customer.ToString());

        // Generate and send OTP via email
        var otpCode = await _otpService.GenerateOtpAsync(user.Id, OtpType.EmailVerification);
        await _emailService.SendOtpAsync(user.Email, user.FullName, otpCode);

        // Send Firebase push notification
        await SendFirebaseWelcomeNotification(user);

        var role = await _userService.GetUserRoleAsync(user);
        var accessToken = _tokenService.CreateAccessToken(user, role);
        var refreshToken = _tokenService.CreateRefreshToken(user);

        return new AppResponse<RegisterUserResponse>()
            .SetSuccessResponse(new RegisterUserResponse
            {
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                ProfileImageUrl = user.ProfileImageUrl,
                SubscriptionTier = user.SubscriptionTier,
                SubscriptionStatus = user.SubscriptionStatus,
                SubscriptionExpiresAt = user.SubscriptionExpiresAt,
                LastLoginAt = user.LastLoginAt,
                Token = accessToken,
                RefreshToken = refreshToken
            });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex.Message);
        return new AppResponse<RegisterUserResponse>()
            .SetErrorResponse("Registration", ex.Message);
    }
}

private async Task SendFirebaseWelcomeNotification(ApplicationUser user)
{
    try
    {
        // Get FCM tokens for this user (from your database)
        var fcmTokens = await _fcmTokenService.GetTokensByUserIdAsync(user.Id);
        
        if (fcmTokens?.Any() == true)
        {
            var title = "Welcome to Nutri-Guardian! 🎉";
            var body = $"Hi {user.FullName}! Your account has been created successfully. Please check your email for OTP verification.";
            var data = new Dictionary<string, string>
            {
                {"type", "registration_success"},
                {"userId", user.Id},
                {"url", "/login"}
            };

            await _firebaseNotificationService.SendToMultipleAsync(
                fcmTokens.ToList(), 
                title, 
                body, 
                null, // No image for this notification
                data
            );
            
            _logger.LogInformation("Firebase welcome notification sent to user {UserId}", user.Id);
        }
        else
        {
            _logger.LogInformation("No FCM tokens found for user {UserId}", user.Id);
        }
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error sending Firebase welcome notification to user {UserId}", user.Id);
        // Don't throw - registration should succeed even if notification fails
    }
}
```

### 6. FCM Token Storage

Create a service to store and manage FCM tokens:

```csharp
// Models/FcmToken.cs
public class FcmToken
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Token { get; set; }
    public string DeviceType { get; set; }
    public string UserAgent { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsActive { get; set; }
}

// Services/IFcmTokenService.cs
public interface IFcmTokenService
{
    Task<bool> SaveTokenAsync(string userId, string fcmToken, string deviceType, string userAgent);
    Task<List<string>> GetTokensByUserIdAsync(string userId);
    Task<bool> RemoveTokenAsync(string fcmToken);
    Task<bool> DeactivateTokenAsync(string fcmToken);
}
```

### 7. Frontend Integration

Update your registration page to use Firebase:

```typescript
// In your registration component
import { FirebaseNotificationService } from '@/lib/firebase-notifications';

// Initialize Firebase when component mounts
useEffect(() => {
  const initFirebase = async () => {
    try {
      await FirebaseNotificationService.initialize();
      
      // Check if user already has permission
      if (Notification.permission === 'granted') {
        const token = await FirebaseNotificationService.getCurrentToken();
        if (token) {
          setPushNotificationEnabled(true);
        }
      }
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  };

  initFirebase();
}, []);

// Enable push notifications
const enablePushNotifications = async () => {
  try {
    const token = await FirebaseNotificationService.subscribeToPush();
    if (token) {
      setPushNotificationEnabled(true);
      console.log('Firebase push notifications enabled');
    }
  } catch (error) {
    console.error('Error enabling Firebase push notifications:', error);
  }
};
```

### 8. Testing

1. Start your Next.js app: `npm run dev`
2. Register a new user
3. Enable push notifications when prompted
4. Check your ASP.NET Core logs to see if the notification was sent
5. You should receive a push notification

### 9. Production Considerations

1. **Service Account Key**: Download your Firebase service account key from Firebase Console > Project Settings > Service accounts
2. **Environment Variables**: Store your Firebase service account key path and project ID in environment variables
3. **Database Storage**: Store FCM tokens in your database with proper user associations
4. **Token Cleanup**: Implement cleanup of expired/invalid FCM tokens
5. **Error Handling**: Handle FCM errors (invalid tokens, quota exceeded, etc.)
6. **Analytics**: Implement tracking for notification delivery and engagement

### 10. Firebase Console Analytics

Firebase provides rich analytics for your push notifications:
- Delivery rates
- Open rates
- Conversion tracking
- A/B testing capabilities

### 11. Advanced Features

You can implement additional features like:
- **Topic Messaging**: Send to groups of users
- **Conditional Messaging**: Send based on user conditions  
- **Scheduled Notifications**: Schedule notifications for later
- **Rich Notifications**: Include images, action buttons, etc.

## Troubleshooting

### Common Issues:

1. **Service Worker Not Loading**: Ensure `firebase-messaging-sw.js` is in the `public` folder
2. **Token Not Generated**: Check VAPID key configuration
3. **Notifications Not Received**: Verify Firebase project configuration
4. **CORS Issues**: Ensure proper domain configuration in Firebase Console

### Debug Steps:

1. Check browser console for errors
2. Verify Firebase configuration
3. Test with Firebase Console message composer
4. Check ASP.NET Core logs for Firebase API responses 