import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS } from '../../theme';
import { Button, ScreenContainer } from '../../components';

interface SplashProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const SplashScreen: React.FC<SplashProps> = ({ onGetStarted, onLogin }) => {
  const { height } = Dimensions.get('window');

  return (
    <ScreenContainer style={styles.container} scrollable={false}>
      {/* Illustration Area */}
      <View style={[styles.illustrationArea, { height: height * 0.35 }]}>
        <Text style={styles.emoji}>🌱</Text>
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        <Text style={styles.headline}>Make Your Business Carbon Neutral</Text>
        <Text style={styles.subtext}>
          Measure, offset, and showcase your sustainability journey with GreenMark.
        </Text>
      </View>

      {/* CTA Area */}
      <View style={styles.ctaArea}>
        <Button
          label="Get Started"
          onPress={onGetStarted}
          variant="primary"
          fullWidth
        />
        <Button
          label="I already have an account"
          onPress={onLogin}
          variant="outline"
          fullWidth
          style={styles.secondaryButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryLight,
  },
  illustrationArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  emoji: {
    fontSize: 100,
  },
  contentArea: {
    marginBottom: SPACING.xxxl,
  },
  headline: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.md,
    lineHeight: 32,
  },
  subtext: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    lineHeight: 20,
  },
  ctaArea: {
    gap: SPACING.md,
  },
  secondaryButton: {
    marginTop: SPACING.md,
  },
});

export default SplashScreen;
