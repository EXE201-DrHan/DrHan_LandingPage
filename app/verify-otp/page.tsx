"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URLS } from "@/lib/config";
import { AppResponse, VerifyOtpResponse, VerifyOtpCommand } from "@/types/api";

export default function VerifyOtpPage() {
  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage (set during registration)
    const storedEmail = localStorage.getItem('otpEmail');
    const storedFullName = localStorage.getItem('otpFullName');
    const storedUserId = localStorage.getItem('otpUserId');
    
    if (storedEmail && storedUserId) {
      setEmail(storedEmail);
      setUserId(parseInt(storedUserId));
    } else {
      // If no user data stored, redirect to registration
      router.push('/register');
      return;
    }
    
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage("");

    if (!otpCode.trim()) {
      setErrors(["Please enter the OTP code"]);
      setIsLoading(false);
      return;
    }

    if (otpCode.length !== 6) {
      setErrors(["OTP code must be 6 digits"]);
      setIsLoading(false);
      return;
    }

    if (!userId) {
      setErrors(["User ID not found. Please register again."]);
      setIsLoading(false);
      return;
    }

    const verifyOtpRequest: VerifyOtpCommand = {
      userId: userId,
      code: otpCode.trim(),
      type: "EmailVerification" // Adjust this based on your OTP type enum
    };

    try {
      console.log('Verifying OTP for userId:', userId);
      
      const response = await fetch(API_URLS.VERIFY_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyOtpRequest),
      });

      console.log('OTP verification response status:', response.status);

      let data;
      try {
        data = await response.json();
        console.log('OTP verification response data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }

      if (response.ok) {
        // Check if it's AppResponse<T> format or direct success
        if (data.isSucceeded !== undefined) {
          // AppResponse<T> format
          if (data.isSucceeded && data.data?.isVerified) {
            setSuccessMessage("Email verified successfully! Redirecting to login...");
            
            // Clear stored data
            localStorage.removeItem('otpEmail');
            localStorage.removeItem('otpFullName');
            localStorage.removeItem('otpUserId');
            
            // Redirect to login after a short delay
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else {
            const errorMessages: string[] = [];
            if (data.messages && typeof data.messages === 'object') {
              Object.entries(data.messages).forEach(([field, messages]) => {
                if (Array.isArray(messages)) {
                  messages.forEach(message => errorMessages.push(`${field}: ${message}`));
                } else {
                  errorMessages.push(`${field}: ${messages}`);
                }
              });
            }
            setErrors(errorMessages.length > 0 ? errorMessages : ["OTP verification failed"]);
          }
        } else {
          // Direct response format
          setSuccessMessage("Email verified successfully! Redirecting to login...");
          
          // Clear stored data
          localStorage.removeItem('otpEmail');
          localStorage.removeItem('otpFullName');
          localStorage.removeItem('otpUserId');
          
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } else {
        // Handle error responses - ASP.NET Core validation error format
        const errorMessages: string[] = [];
        
        if (data.errors && typeof data.errors === 'object') {
          // ASP.NET Core model validation error format
          Object.entries(data.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach(message => errorMessages.push(`${field}: ${message}`));
            } else {
              errorMessages.push(`${field}: ${messages}`);
            }
          });
        } else if (data.messages && typeof data.messages === 'object') {
          // AppResponse<T> error format
          Object.entries(data.messages).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach(message => errorMessages.push(`${field}: ${message}`));
            } else {
              errorMessages.push(`${field}: ${messages}`);
            }
          });
        } else if (data.title) {
          errorMessages.push(data.title);
        } else if (data.message) {
          errorMessages.push(data.message);
        } else {
          errorMessages.push("OTP verification failed. Please try again.");
        }
        
        setErrors(errorMessages);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors(["Network error. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only digits, max 6
    setOtpCode(value);
    
    if (errors.length > 0) {
      setErrors([]);
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
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
          {fullName && (
            <p className="mt-1 text-center text-sm text-gray-500">
              Welcome, {fullName}!
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="text-green-700 text-sm text-center">
                  {successMessage}
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

            {/* Remaining Attempts Warning */}
            {remainingAttempts !== null && remainingAttempts <= 3 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="text-yellow-700 text-sm text-center">
                  ⚠️ {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                </div>
              </div>
            )}

            {/* OTP Input */}
            <div>
              <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 text-center">
                Enter 6-digit code
              </label>
              <Input
                id="otpCode"
                name="otpCode"
                type="text"
                required
                value={otpCode}
                onChange={handleOtpInputChange}
                className="mt-2 text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </div>

            {/* Back to Registration */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need to change your email?{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Back to Registration
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 