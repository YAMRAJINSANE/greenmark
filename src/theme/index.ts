/**
 * GreenMark Design System
 * Colors, Typography, Spacing, and UI Patterns
 */

export const COLORS = {
  // Primary Palette - Teal
  primary: '#2BA3A3',
  primaryDark: '#0A6E6E',
  primaryLight: '#E6F2F2',

  // Action - Green
  success: '#12B886',
  successLight: '#E8F8F5',

  // Accent - Marigold
  warning: '#F5A623',
  warningLight: '#FEF3E6',

  // Semantic
  info: '#1971C2',
  infoLight: '#E8F1F8',
  error: '#D9480F',
  errorLight: '#F8E8DE',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  neutral900: '#1F2937',
  neutral800: '#374151',
  neutral700: '#4B5563',
  neutral600: '#6B7280',
  neutral500: '#9CA3AF',
  neutral400: '#D1D5DB',
  neutral300: '#E5E7EB',
  neutral200: '#F3F4F6',
  neutral100: '#F9FAFB',

  // Status
  positive: '#12B886',
  negative: '#D9480F',
  inactive: '#9CA3AF',
};

export const TYPOGRAPHY = {
  // Font Families
  fonts: {
    sora: 'Sora', // Headings
    inter: 'Inter', // Body/UI
  },

  // Type Scale
  sizes: {
    h1: 22,
    h2: 18,
    h3: 14,
    body: 12,
    bodySmall: 11,
    caption: 9,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const BORDERS = {
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const BUTTON_STYLES = {
  height: 56,
  minWidth: 56,
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  BUTTON_STYLES,
};
