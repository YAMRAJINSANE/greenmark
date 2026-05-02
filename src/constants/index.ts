/**
 * App Constants
 * Global constants used throughout the application
 */

export const API_BASE_URL = 'https://api.greenmark.io/v1';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // Calculator
  CALCULATE_EMISSIONS: '/calculator/calculate',
  SAVE_EMISSIONS: '/calculator/save',

  // Projects
  GET_PROJECTS: '/projects',
  GET_PROJECT_DETAIL: '/projects/:id',

  // Offset
  PURCHASE_CREDITS: '/offset/purchase',
  VERIFY_PAYMENT: '/offset/verify-payment',

  // Certificates
  GET_CERTIFICATES: '/certificates',
  GET_CERTIFICATE: '/certificates/:id',
  GENERATE_CERTIFICATE: '/certificates/generate',

  // User
  GET_USER: '/user/profile',
  UPDATE_USER: '/user/profile',
  GET_STATS: '/user/stats',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SERVER_ERROR: 'Something went wrong. Please try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  INVALID_UPI: 'Please enter a valid UPI ID.',
};

export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PAYMENT_SUCCESS: 'Payment successful!',
  CERTIFICATE_GENERATED: 'Certificate generated successfully!',
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  UPI: /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/,
  PHONE: /^[6-9]\d{9}$/,
};

export const LIMITS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_BUSINESS_NAME_LENGTH: 100,
  MAX_CITY_LENGTH: 50,
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

export const CACHE_KEYS = {
  USER: 'user_data',
  PROJECTS: 'projects_list',
  EMISSIONS: 'emissions_data',
  CERTIFICATES: 'certificates_list',
};

export const CACHE_DURATION = {
  USER: 3600000, // 1 hour
  PROJECTS: 86400000, // 24 hours
  EMISSIONS: 604800000, // 7 days
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  USER_DATA: 'user_data',
  ONBOARDED: 'has_onboarded',
  DARK_MODE: 'dark_mode',
};

export const FEATURE_FLAGS = {
  ENABLE_OFFLINE_MODE: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_ANALYTICS: true,
};

export default {
  API_BASE_URL,
  ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX,
  LIMITS,
  CACHE_KEYS,
  CACHE_DURATION,
  PAGINATION,
  STORAGE_KEYS,
  FEATURE_FLAGS,
};
