import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Input, Chip, ScreenContainer } from '../../components';

interface CalculatorElectricityProps {
  onContinue: (kwh: number) => void;
  onSkip?: () => void;
}

export const CalculatorElectricityScreen: React.FC<CalculatorElectricityProps> = ({
  onContinue,
  onSkip,
}) => {
  const [kwh, setKwh] = useState('400');

  const handleUseAverage = () => {
    setKwh('400');
  };

  const handleContinue = () => {
    onContinue(parseInt(kwh) || 0);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <Text style={styles.progressText}>Step 1 of 3</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <Text style={styles.title}>Electricity Usage</Text>
      <Text style={styles.subtitle}>How much electricity does your business use monthly?</Text>

      {/* Input */}
      <Input
        label="Monthly Usage (kWh)"
        placeholder="Enter units"
        value={kwh}
        onChangeText={setKwh}
        keyboardType="number-pad"
        prefix="⚡"
        helperText="Typical café uses 400–800 units"
      />

      {/* Quick Select */}
      <View style={styles.quickSelectContainer}>
        <Text style={styles.quickSelectLabel}>Quick Select:</Text>
        <View style={styles.chipRow}>
          <Chip label="400" selected={kwh === '400'} onPress={() => setKwh('400')} />
          <Chip label="600" selected={kwh === '600'} onPress={() => setKwh('600')} />
          <Chip label="800" selected={kwh === '800'} onPress={() => setKwh('800')} />
        </View>
      </View>

      {/* Use Average Button */}
      <Button
        label="Use Average (400 kWh)"
        onPress={handleUseAverage}
        variant="outline"
        fullWidth
        style={styles.averageButton}
      />

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
    width: '33%',
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
  quickSelectContainer: {
    marginBottom: SPACING.lg,
  },
  quickSelectLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  chipRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  averageButton: {
    marginBottom: SPACING.lg,
  },
  footer: {
    marginBottom: SPACING.lg,
  },
});

export default CalculatorElectricityScreen;
