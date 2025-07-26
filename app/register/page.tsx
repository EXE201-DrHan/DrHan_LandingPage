"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterRequest } from "@/types/auth";
import { AppResponse, RegisterUserResponse, RegisterUserCommand } from "@/types/api";
import { API_URLS } from "@/lib/config";
// Note: Install firebase first: npm install firebase
// import { FirebaseNotificationService } from "@/lib/firebase-notifications";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false);
  const router = useRouter();

  // Initialize Firebase push notifications on component mount
  useEffect(() => {
    const initializeFirebasePushNotifications = async () => {
      // Note: This is a placeholder - you need to implement Firebase initialization
      // After installing firebase: npm install firebase
      // Uncomment and implement the Firebase service
      
      /*
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
        console.error('Error initializing Firebase push notifications:', error);
      }
      */
      
      // Temporary fallback - basic notification support check
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          setPushNotificationEnabled(true);
        }
      }
    };

    initializeFirebasePushNotifications();
  }, []);

  // Enable Firebase push notifications
  const enablePushNotifications = async () => {
    // Note: This is a placeholder - implement Firebase token subscription
    // After setting up Firebase, uncomment and implement:
    
    /*
    try {
      const token = await FirebaseNotificationService.subscribeToPush();
      if (token) {
        setPushNotificationEnabled(true);
        console.log('Firebase push notifications enabled');
      }
    } catch (error) {
      console.error('Error enabling Firebase push notifications:', error);
    }
    */
    
    // Temporary fallback - basic permission request
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushNotificationEnabled(true);
        console.log('Basic notifications enabled (Firebase implementation needed)');
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Validate form data before submission
    if (!formData.email || !formData.password || !formData.fullName || !formData.dateOfBirth || !formData.gender) {
      setErrors(["Vui lòng điền vào tất cả các trường bắt buộc"]);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Mật khẩu không khớp"]);
      setIsLoading(false);
      return;
    }

    console.log('Submitting registration form:', {
      email: formData.email,
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      // Don't log passwords
    });

    try {
      console.log('Making API request to:', API_URLS.REGISTER);
      
      const response = await fetch(API_URLS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('API response status:', response.status, response.statusText);

      let data;
      try {
        data = await response.json();
        console.log('API response data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }

      if (response.ok && data.isSucceeded) {
        // Registration successful
        console.log('Registration successful - Firebase notification will be sent from backend');
        
        // Show local notification as fallback (if permission granted)
        if (pushNotificationEnabled && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification('Welcome to Nutri-Guardian! 🎉', {
              body: `Hi ${formData.fullName}! Your account has been created successfully.`,
              icon: '/icon-192x192.png',
              badge: '/badge-72x72.png'
            });
          } catch (notificationError) {
            console.warn('Could not show notification:', notificationError);
          }
        }
        
        // Store user data for OTP verification
        localStorage.setItem('otpEmail', formData.email);
        localStorage.setItem('otpFullName', formData.fullName);
        localStorage.setItem('otpUserId', data.data?.userId?.toString() || '');
        
        // Navigate to OTP verification page
        try {
          router.push("/verify-otp");
        } catch (routerError) {
          console.error('Router navigation error:', routerError);
          // Fallback navigation
          window.location.href = '/verify-otp';
        }
      } else {
        // Registration failed - handle AppResponse<T> error format
        const errorMessages: string[] = [];
        
        if (data.messages && typeof data.messages === 'object') {
          // Handle validation errors from Messages dictionary
          Object.entries(data.messages).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach(message => errorMessages.push(`${field}: ${message}`));
            } else {
              errorMessages.push(`${field}: ${messages}`);
            }
          });
        } else if (data.message) {
          errorMessages.push(data.message);
        } else {
          errorMessages.push("Đăng ký thất bại. Vui lòng thử lại.");
        }
        
        setErrors(errorMessages);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors(["Lỗi mạng. Vui lòng thử lại."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản của bạn
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Tham gia Nutri-Guardian ngay hôm nay
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
            {/* Push Notification Permission Banner */}
            {typeof window !== 'undefined' && 'Notification' in window && !pushNotificationEnabled && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">🔔</div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">
                        Bật Thông Báo Đẩy
                      </h3>
                      <p className="text-xs text-blue-600 mt-1">
                        Nhận thông báo về cập nhật tài khoản và thông tin quan trọng
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={enablePushNotifications}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                  >
                    Bật
                  </Button>
                </div>
              </div>
            )}

            {/* Success message for enabled notifications */}
            {pushNotificationEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">✅</div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">
                      Thông Báo Đẩy Đã Được Bật
                    </h3>
                    <p className="text-xs text-green-600 mt-1">
                      Bạn sẽ nhận được thông báo về cập nhật tài khoản
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-red-700 text-sm">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Họ và Tên
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Địa chỉ Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                placeholder="Nhập email của bạn"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Ngày Sinh
              </label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Giới Tính
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn giới tính của bạn</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
                <option value="prefer-not-to-say">Không muốn tiết lộ</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật Khẩu
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                placeholder="Nhập mật khẩu của bạn"
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">
                Mật khẩu phải có ít nhất 6 ký tự
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác Nhận Mật Khẩu
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1"
                placeholder="Xác nhận mật khẩu của bạn"
                minLength={6}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                {isLoading ? "Đang Tạo Tài Khoản..." : "Tạo Tài Khoản"}
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 