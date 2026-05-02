import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Chip, ScreenContainer } from '../../components';

interface CalculatorWasteTransportProps {
  onContinue: (waste: string, hasDelivery: boolean, deliveryApps: string[]) => void;
}

export const CalculatorWasteTransportScreen: React.FC<CalculatorWasteTransportProps> = ({
  onContinue,
}) => {
  const [wasteCategory, setWasteCategory] = useState('<5 kg');
  const [hasDelivery, setHasDelivery] = useState(true);
  const [deliveryApps, setDeliveryApps] = useState<string[]>(['zomato', 'swiggy']);

  const wasteOptions = ['<5 kg', '5-15 kg', '15+ kg'];
  const apps = ['Zomato', 'Swiggy', 'UberEats', 'Other'];

  const handleAppToggle = (app: string) => {
    const appLower = app.toLowerCase();
    setDeliveryApps((prev) =>
      prev.includes(appLower) ? prev.filter((a) => a !== appLower) : [...prev, appLower]
    );
  };

  const handleContinue = () => {
    onContinue(wasteCategory, hasDelivery, deliveryApps);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progress}>
        <Text style={styles.progressText}>Step 3 of 3</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <Text style={styles.title}>Waste & Transportation</Text>
      <Text style={styles.subtitle}>Final step to calculate your carbon footprint</Text>

      {/* Waste Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Waste Generation</Text>
        <View style={styles.chipRow}>
          {wasteOptions.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={wasteCategory === option}
              onPress={() => setWasteCategory(option)}
            />
          ))}
        </View>
      </View>

      {/* Delivery Section */}
      <View style={styles.section}>
        <View style={styles.toggleHeader}>
          <Text style={styles.sectionTitle}>Do you use delivery apps?</Text>
          <Switch
            value={hasDelivery}
            onValueChange={setHasDelivery}
            trackColor={{ false: COLORS.neutral300, true: COLORS.success }}
            thumbColor={hasDelivery ? COLORS.success : COLORS.neutral500}
          />
        </View>

        {hasDelivery && (
          <>
            <Text style={styles.subtext}>Which platforms do you use?</Text>
            <View style={styles.appGrid}>
              {apps.map((app) => (
                <Chip
                  key={app}
                  label={app}
                  selected={deliveryApps.includes(app.toLowerCase())}
                  onPress={() => handleAppToggle(app)}
                />
              ))}
            </View>
          </>
        )}
      </View>

      {/* Calculate Button */}
      <View style={styles.footer}>
        <Button
          label="Calculate My Footprint"
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
    width: '100%',
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
  section: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.md,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  subtext: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.md,
  },
  appGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
});

export default CalculatorWasteTransportScreen;
