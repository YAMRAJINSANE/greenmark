import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS, SHADOWS } from '../theme';

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: React.ReactNode | ImageSourcePropType;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  children,
  onPress,
  style,
  variant = 'default',
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  const getStyle = () => {
    const baseStyle = {
      ...styles.card,
    };

    const variantStyles = {
      default: {
        backgroundColor: COLORS.white,
        ...SHADOWS.md,
      },
      elevated: {
        backgroundColor: COLORS.white,
        ...SHADOWS.lg,
      },
      outlined: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.neutral300,
      },
    };

    return [baseStyle, variantStyles[variant], style];
  };

  return (
    <CardComponent
      style={getStyle()}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {image && (
        <View style={styles.imageContainer}>
          {typeof image === 'string' ? (
            <Text style={styles.emojiImage}>{image}</Text>
          ) : (
            image
          )}
        </View>
      )}

      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      {children && <View style={styles.content}>{children}</View>}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDERS.radius.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiImage: {
    fontSize: 64,
  },
  header: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  content: {
    padding: SPACING.md,
  },
});

export default Card;
