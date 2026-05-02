import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS, SHADOWS } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  prefix?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  containerStyle,
  icon,
  prefix,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputWrapper,
          error && { borderColor: COLORS.error, borderWidth: 2 },
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, icon && { paddingLeft: 0 }]}
          placeholderTextColor={COLORS.neutral500}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    marginBottom: SPACING.sm,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDERS.radius.md,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    paddingHorizontal: SPACING.md,
    height: 50,
    ...SHADOWS.sm,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body,
    fontFamily: TYPOGRAPHY.fonts.inter,
    color: COLORS.neutral900,
    paddingVertical: SPACING.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  prefix: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral700,
    marginRight: SPACING.xs,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  helper: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    marginTop: SPACING.xs,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  error: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default Input;
