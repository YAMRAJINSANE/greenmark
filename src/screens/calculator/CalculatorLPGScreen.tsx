import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, ScreenContainer } from '../../components';

interface CalculatorLPGProps {
  onContinue: (cylinders: number, usePNG: boolean) => void;
}

export const CalculatorLPGScreen: React.FC<CalculatorLPGProps> = ({ onContinue }) => {
  const [cylinders, setCylinders] = useState(2);
  const [usePNG, setUsePNG] = useState(false);

  const handleContinue = () => {
    onContinue(cylinders, usePNG);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <Text style={styles.progressText}>Step 2 of 3</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <Text style={styles.title}>Gas Usage</Text>
      <Text style={styles.subtitle}>How many LPG cylinders do you use monthly?</Text>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>LPG Cylinders per Month</Text>
        <View style={styles.stepper}>
          <Button
            label="−"
            onPress={() => setCylinders(Math.max(0, cylinders - 1))}
            variant="outline"
            size="small"
          />
          <Text style={styles.stepperValue}>{cylinders}</Text>
          <Button
            label="+"
            onPress={() => setCylinders(cylinders + 1)}
            variant="outline"
            size="small"
          />
        </View>
      </View>

      {/* PNG Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleLabel}>
          <Text style={styles.toggleText}>Do you use PNG (Piped Natural Gas)?</Text>
        </View>
        <Switch
          value={usePNG}
          onValueChange={setUsePNG}
          trackColor={{ false: COLORS.neutral300, true: COLORS.success }}
          thumbColor={usePNG ? COLORS.success : COLORS.neutral500}
          style={styles.toggle}
        />
      </View>

      {/* Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 PNG is cleaner than LPG. If you use it, it will reduce your carbon footprint!
        </Text>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={handleContinue}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  progress: {
    marginBottom: SPACING.lg,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.neutral200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: COLORS.success,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  stepperContainer: {
    marginBottom: SPACING.xxxl,
    alignItems: 'center',
  },
  stepperLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.lg,
    width: 200,
  },
  stepperValue: {
    fontSize: TYPOGRAPHY.sizes.huge,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
    textAlign: 'center',
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.neutral100,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  toggleLabel: {
    flex: 1,
  },
  toggleText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  toggle: {
    marginLeft: SPACING.md,
  },
  infoBox: {
    backgroundColor: COLORS.infoLight,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  infoText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  footer: {
    marginBottom: SPACING.lg,
  },
});

export default CalculatorLPGScreen;
