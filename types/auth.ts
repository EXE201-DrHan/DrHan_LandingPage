// Request interfaces
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Response interfaces
export interface AuthResponse {
  message: string;
  token?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    dateOfBirth: Date;
    gender: string;
    createdAt: Date;
  };
}

export interface ErrorResponse {
  error: string;
}

export interface ProfileResponse {
  message: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    dateOfBirth: Date;
    gender: string;
    createdAt: Date;
  };
} 