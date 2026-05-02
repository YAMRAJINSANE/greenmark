import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BUTTON_STYLES, SHADOWS, BORDERS } from '../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  fullWidth = true,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      height: BUTTON_STYLES.height,
    };

    const variantStyles = {
      primary: {
        backgroundColor: COLORS.success,
      },
      secondary: {
        backgroundColor: COLORS.primary,
      },
      outline: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.primary,
      },
      tertiary: {
        backgroundColor: COLORS.neutral200,
      },
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: SPACING.md,
        minHeight: 40,
      },
      medium: {
        paddingHorizontal: SPACING.lg,
        minHeight: 56,
      },
      large: {
        paddingHorizontal: SPACING.xl,
        minHeight: 64,
      },
    };

    return [
      baseStyle,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && { width: '100%' },
      disabled && { opacity: 0.6 },
      style,
    ];
  };

  const getTextStyle = () => {
    const variantTextColors = {
      primary: COLORS.white,
      secondary: COLORS.white,
      outline: COLORS.primary,
      tertiary: COLORS.neutral900,
    };

    return [
      styles.text,
      { color: variantTextColors[variant] },
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyle()}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERS.radius.md,
    ...SHADOWS.md,
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default Button;
