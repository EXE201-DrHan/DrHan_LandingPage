// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://localhost:7087',
  ENDPOINTS: {
    REGISTER: '/api/authentication/register',
    LOGIN: '/api/authentication/login',
    VERIFY_OTP: '/api/authentication/verify-otp',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API URLs
export const API_URLS = {
  REGISTER: getApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
  LOGIN: getApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  VERIFY_OTP: getApiUrl(API_CONFIG.ENDPOINTS.VERIFY_OTP),
}; 