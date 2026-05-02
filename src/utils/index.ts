/**
 * Utility Functions
 * Common helpers used throughout the app
 */

import { REGEX, ERROR_MESSAGES } from '../constants';

/**
 * Validation Functions
 */
export const validators = {
  isValidEmail: (email: string): boolean => {
    return REGEX.EMAIL.test(email);
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 8;
  },

  isValidUPI: (upi: string): boolean => {
    return REGEX.UPI.test(upi);
  },

  isValidPhone: (phone: string): boolean => {
    return REGEX.PHONE.test(phone);
  },

  validateEmail: (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!validators.isValidEmail(email)) return ERROR_MESSAGES.INVALID_EMAIL;
    return null;
  },

  validatePassword: (password: string): string | null => {
    if (!password) return 'Password is required';
    if (!validators.isValidPassword(password)) return ERROR_MESSAGES.INVALID_PASSWORD;
    return null;
  },

  validatePasswordMatch: (password: string, confirm: string): string | null => {
    if (password !== confirm) return ERROR_MESSAGES.PASSWORDS_NOT_MATCH;
    return null;
  },
};

/**
 * Formatting Functions
 */
export const formatters = {
  formatCurrency: (amount: number, currency: string = 'INR'): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  formatNumber: (num: number, decimals: number = 2): string => {
    return parseFloat(num.toFixed(decimals)).toString();
  },

  formatDate: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  formatDateTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  formatCO2: (tons: number): string => {
    if (tons < 1) return `${(tons * 1000).toFixed(0)}kg`;
    return `${tons.toFixed(2)}t`;
  },

  formatTreesEquivalent: (tons: number): number => {
    // 1 tree absorbs ~25kg CO2 per year
    return Math.round((tons * 1000) / 25);
  },

  capitalizeString: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  formatInitials: (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  },
};

/**
 * Calculation Functions
 */
export const calculations = {
  calculateEmissions: (
    electricity: number,
    lpg: number,
    waste: string,
    hasDelivery: boolean
  ): number => {
    let total = 0;

    // Electricity: kWh × 0.008 = tons CO2
    total += electricity * 0.008;

    // LPG: cylinders × 0.084 = tons CO2
    total += lpg * 0.084;

    // Waste: category-based
    const wasteEmissions: { [key: string]: number } = {
      '<5 kg': 0.3,
      '5-15 kg': 0.8,
      '15+ kg': 1.5,
    };
    total += wasteEmissions[waste] || 0;

    // Transport: delivery apps ~1.6 tons
    if (hasDelivery) {
      total += 0.8;
    }

    return parseFloat(total.toFixed(2));
  },

  calculateCreditsNeeded: (emissionsTons: number): number => {
    // 1 credit = 50kg CO2
    return Math.ceil((emissionsTons * 1000) / 50);
  },

  calculateTotalCost: (credits: number, pricePerCredit: number): number => {
    return credits * pricePerCredit;
  },

  calculateProgressPercent: (current: number, total: number): number => {
    return Math.min((current / total) * 100, 100);
  },
};

/**
 * Async/Delay Functions
 */
export const async = {
  delay: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  simulateApiCall: <T,>(data: T, delayMs: number = 1000): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delayMs);
    });
  },
};

/**
 * Storage Functions (Mock - Replace with AsyncStorage)
 */
const storage: { [key: string]: string } = {};

export const storageUtils = {
  setItem: async (key: string, value: string): Promise<void> => {
    storage[key] = value;
  },

  getItem: async (key: string): Promise<string | null> => {
    return storage[key] || null;
  },

  removeItem: async (key: string): Promise<void> => {
    delete storage[key];
  },

  clear: async (): Promise<void> => {
    Object.keys(storage).forEach((key) => delete storage[key]);
  },
};

/**
 * Error Handling
 */
export const errorHandling = {
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.data?.message) return error.data.message;
    return ERROR_MESSAGES.SERVER_ERROR;
  },

  logError: (error: any, context: string = ''): void => {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
  },
};

/**
 * String Utilities
 */
export const stringUtils = {
  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  removeWhitespace: (str: string): string => {
    return str.replace(/\s+/g, '');
  },

  isEmptyOrWhitespace: (str: string | null | undefined): boolean => {
    return !str || /^\s*$/.test(str);
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};

/**
 * Array Utilities
 */
export const arrayUtils = {
  unique: <T,>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  shuffle: <T,>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  chunk: <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
};

export default {
  validators,
  formatters,
  calculations,
  async,
  storageUtils,
  errorHandling,
  stringUtils,
  arrayUtils,
};
