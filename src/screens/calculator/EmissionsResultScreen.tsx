import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Card, ScreenContainer } from '../../components';

interface EmissionsResultProps {
  totalEmissions: number;
  comparison: string;
  onOffsetNow: () => void;
  onSaveReport: () => void;
}

export const EmissionsResultScreen: React.FC<EmissionsResultProps> = ({
  totalEmissions,
  comparison,
  onOffsetNow,
  onSaveReport,
}) => {
  const { width } = Dimensions.get('window');
  const gaugeWidth = width * 0.6;

  // Determine gauge fill color based on emissions level
  const getGaugeColor = () => {
    if (totalEmissions < 5) return COLORS.success;
    if (totalEmissions < 10) return COLORS.warning;
    return COLORS.error;
  };

  // Calculate gauge percentage (assuming max 15 tons)
  const gaugePercent = Math.min((totalEmissions / 15) * 100, 100);

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Celebration Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>📊</Text>
        <Text style={styles.title}>Your Carbon Footprint</Text>
      </View>

      {/* Big Emissions Number */}
      <View style={styles.resultCard}>
        <Text style={styles.emissionsNumber}>{totalEmissions.toFixed(1)}</Text>
        <Text style={styles.emissionsUnit}>tons CO₂/year</Text>

        {/* Gauge */}
        <View style={styles.gaugeContainer}>
          <View style={styles.gauge}>
            <View
              style={[
                styles.gaugeFill,
                {
                  width: `${gaugePercent}%`,
                  backgroundColor: getGaugeColor(),
                },
              ]}
            />
          </View>
          <View style={styles.gaugeLabels}>
            <Text style={styles.gaugeLabel}>Low</Text>
            <Text style={styles.gaugeLabel}>Medium</Text>
            <Text style={styles.gaugeLabel}>High</Text>
          </View>
        </View>

        {/* Comparison */}
        <Card style={styles.comparisonCard}>
          <Text style={styles.comparisonText}>
            ✓ {comparison}
          </Text>
        </Card>
      </View>

      {/* Breakdown */}
      <Card title="Emissions Breakdown" variant="outlined">
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>⚡ Electricity</Text>
          <Text style={styles.breakdownValue}>3.2 tons</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>🔥 Gas (LPG)</Text>
          <Text style={styles.breakdownValue}>2.1 tons</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>♻️ Waste</Text>
          <Text style={styles.breakdownValue}>1.5 tons</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>🚚 Transportation</Text>
          <Text style={styles.breakdownValue}>1.6 tons</Text>
        </View>
      </Card>

      {/* CTAs */}
      <View style={styles.footer}>
        <Button
          label="Offset My Emissions"
          onPress={onOffsetNow}
          fullWidth
          style={styles.primaryButton}
        />
        <Button
          label="Save Report"
          onPress={onSaveReport}
          variant="outline"
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  emissionsNumber: {
    fontSize: 64,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  emissionsUnit: {
    fontSize: TYPOGRAPHY.sizes.h3,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  gaugeContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  gauge: {
    height: 12,
    backgroundColor: COLORS.neutral200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 6,
  },
  gaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gaugeLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  comparisonCard: {
    width: '100%',
    backgroundColor: COLORS.successLight,
    borderWidth: 0,
  },
  comparisonText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
    textAlign: 'center',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  breakdownLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  breakdownValue: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  footer: {
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  primaryButton: {
    marginBottom: 0,
  },
});

export default EmissionsResultScreen;
