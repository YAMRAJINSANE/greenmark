/**
 * TypeScript Type Definitions
 * Global types and interfaces used throughout the app
 */

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  city: string;
  employees: number;
  revenueRange: string;
  totalEmissions: number;
  totalOffset: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ============================================================================
// EMISSIONS TYPES
// ============================================================================

export interface EmissionsInput {
  electricity: number; // kWh
  lpg: number; // cylinders
  waste: string; // category
  hasDelivery: boolean;
  deliveryApps: string[];
}

export interface EmissionsCalculation {
  electricity: {
    monthly: number;
    unit: string;
    co2: number;
  };
  lpg: {
    monthly: number;
    unit: string;
    co2: number;
  };
  waste: {
    category: string;
    co2: number;
  };
  transport: {
    deliveryApps: string[];
    co2: number;
  };
  total: number;
}

export interface EmissionsResult {
  id: string;
  userId: string;
  total: number;
  breakdown: EmissionsCalculation;
  comparison: string;
  createdAt: string;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export interface Project {
  id: string;
  name: string;
  location: string;
  image: string;
  type: string;
  co2Offset: number;
  price: number;
  families: number;
  yearsRunning: number;
  verified: boolean;
  description: string;
}

export interface ProjectDetail extends Project {
  longDescription: string;
  impact: {
    label: string;
    value: string;
  }[];
}

// ============================================================================
// OFFSET TYPES
// ============================================================================

export interface PurchaseData {
  projectId: string;
  credits: number;
  totalAmount: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  default: boolean;
}

export interface PaymentData {
  method: string;
  upiId?: string;
  amount: number;
  transactionId?: string;
}

export interface Transaction {
  id: string;
  type: string;
  projectName: string;
  amount: number;
  credits: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

// ============================================================================
// CERTIFICATE TYPES
// ============================================================================

export interface Certificate {
  id: string;
  businessName: string;
  co2Offset: number;
  projectName: string;
  issueDate: string;
  expiryDate: string;
  verifiedBy: string;
  certificateNumber: string;
}

export interface CertificateData {
  businessName: string;
  creditsOffset: number;
  projectName: string;
  transactionId: string;
}

// ============================================================================
// ARTICLE TYPES
// ============================================================================

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// ============================================================================
// SCREEN PROPS TYPES
// ============================================================================

export interface ScreenProps {
  navigation: any;
  route: any;
}

export interface NavigationParams {
  [key: string]: any;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}

export interface FormState {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface DashboardStats {
  totalEmissions: number;
  totalOffset: number;
  treesEquivalent: number;
  energySaved: number;
  familiesHelped: number;
  certificatesEarned: number;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateUserRequest {
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  city: string;
  employees: number;
  revenueRange: string;
}

export interface CalculateEmissionsRequest {
  electricity: number;
  lpg: number;
  waste: string;
  hasDelivery: boolean;
  deliveryApps: string[];
}

export interface PurchaseCreditsRequest {
  projectId: string;
  credits: number;
  amount: number;
}

export interface VerifyPaymentRequest {
  paymentId: string;
  transactionId: string;
  amount: number;
}

export interface GenerateCertificateRequest {
  businessName: string;
  creditsOffset: number;
  projectName: string;
  transactionId: string;
}

// ============================================================================
// EXPORT TYPES
// ============================================================================

export type { };
