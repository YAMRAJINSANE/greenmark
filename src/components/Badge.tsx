import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS } from '../theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  style?: ViewStyle;
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
  icon,
}) => {
  const getVariantStyle = () => {
    const variantStyles = {
      success: {
        backgroundColor: COLORS.successLight,
        color: COLORS.success,
      },
      error: {
        backgroundColor: COLORS.errorLight,
        color: COLORS.error,
      },
      warning: {
        backgroundColor: COLORS.warningLight,
        color: COLORS.warning,
      },
      info: {
        backgroundColor: COLORS.infoLight,
        color: COLORS.info,
      },
      default: {
        backgroundColor: COLORS.neutral200,
        color: COLORS.neutral900,
      },
    };
    return variantStyles[variant];
  };

  const { backgroundColor, color } = getVariantStyle();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
        style,
      ]}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
};

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  style,
}) => {
  const getBackgroundColor = () => {
    return selected ? COLORS.success : COLORS.neutral200;
  };

  const getTextColor = () => {
    return selected ? COLORS.white : COLORS.neutral900;
  };

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: selected ? COLORS.success : COLORS.neutral300,
        },
        style,
      ]}
    >
      {icon && <Text style={[styles.chipIcon, { color: getTextColor() }]}>{icon}</Text>}
      <Text
        style={[
          styles.chipLabel,
          {
            color: getTextColor(),
            fontWeight: selected ? TYPOGRAPHY.weights.semibold : TYPOGRAPHY.weights.regular,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDERS.radius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: SPACING.xs,
    fontSize: 12,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDERS.radius.full,
    borderWidth: 1,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  chipIcon: {
    marginRight: SPACING.xs,
    fontSize: 14,
  },
  chipLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default { Badge, Chip };
