// API Response Types matching ASP.NET Core AppResponse<T> structure

export interface AppResponse<T> {
  isSucceeded: boolean;
  timestamp: string;
  messages: Record<string, string[]>;
  data?: T;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Registration Types
export interface RegisterUserResponse {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImageUrl?: string;
  subscriptionTier?: string;
  subscriptionStatus?: string;
  subscriptionExpiresAt?: string;
  lastLoginAt?: string;
  token?: string;
  refreshToken?: string;
}

export interface RegisterUserCommand {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
}

// OTP Verification Types
export interface VerifyOtpResponse {
  isVerified: boolean;
  message: string;
  isEmailConfirmed: boolean;
  remainingAttempts: number;
}

export interface VerifyOtpCommand {
  userId: number;
  code: string;
  type?: string; // OTP type if required by your backend
}

// Login Types (for future use)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  fullName: string;
  token: string;
  refreshToken: string;
  profileImageUrl?: string;
  subscriptionTier?: string;
  subscriptionStatus?: string;
} 