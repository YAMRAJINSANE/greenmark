import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Input, Card, ScreenContainer } from '../../components';

interface PurchaseCreditsProps {
  creditsNeeded: number;
  pricePerCredit: number;
  projectName: string;
  onProceedPayment: (credits: number, totalAmount: number) => void;
  onBack: () => void;
}

export const PurchaseCreditsScreen: React.FC<PurchaseCreditsProps> = ({
  creditsNeeded,
  pricePerCredit,
  projectName,
  onProceedPayment,
  onBack,
}) => {
  const [credits, setCredits] = useState(creditsNeeded.toString());
  const totalCost = parseInt(credits) * pricePerCredit;

  const handleProceed = () => {
    onProceedPayment(parseInt(credits), totalCost);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Header */}
      <Button
        label="← Back"
        onPress={onBack}
        variant="outline"
        size="small"
        style={styles.backButton}
      />

      <Text style={styles.title}>Purchase Carbon Credits</Text>
      <Text style={styles.subtitle}>for {projectName}</Text>

      {/* Project Info Card */}
      <Card variant="outlined" style={styles.infoCard}>
        <View style={styles.projectRow}>
          <Text style={styles.projectLabel}>Project:</Text>
          <Text style={styles.projectValue}>{projectName}</Text>
        </View>
        <View style={styles.projectRow}>
          <Text style={styles.projectLabel}>Price per credit:</Text>
          <Text style={styles.projectValue}>₹{pricePerCredit}</Text>
        </View>
      </Card>

      {/* Credits Input */}
      <Input
        label="Number of Credits"
        value={credits}
        onChangeText={setCredits}
        keyboardType="number-pad"
        helperText="Each credit offsets 50kg of CO₂"
      />

      {/* Price Breakdown */}
      <Card title="Price Breakdown" variant="outlined">
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Credits</Text>
          <Text style={styles.breakdownValue}>{credits} × ₹{pricePerCredit}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Platform Fee (0%)</Text>
          <Text style={styles.breakdownValue}>₹0</Text>
        </View>
        <View style={[styles.breakdownRow, styles.breakdownTotal]}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalCost}</Text>
        </View>
      </Card>

      {/* Trust Indicators */}
      <View style={styles.trustContainer}>
        <Text style={styles.trustText}>✓ Secure payment</Text>
        <Text style={styles.trustText}>✓ Certificate issued in 24 hours</Text>
      </View>

      {/* CTA */}
      <Button
        label={`Proceed to Payment (₹${totalCost})`}
        onPress={handleProceed}
        fullWidth
        style={styles.proceedButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
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
  infoCard: {
    marginBottom: SPACING.lg,
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  projectLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  projectValue: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  breakdownLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  breakdownValue: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  breakdownTotal: {
    borderBottomWidth: 0,
    backgroundColor: COLORS.successLight,
    paddingHorizontal: SPACING.md,
    marginHorizontal: -SPACING.md,
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  totalValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.sora,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  trustContainer: {
    backgroundColor: COLORS.infoLight,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  trustText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.xs,
  },
  proceedButton: {
    marginBottom: SPACING.lg,
  },
});

export default PurchaseCreditsScreen;
