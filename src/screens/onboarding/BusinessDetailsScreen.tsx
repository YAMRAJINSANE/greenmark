import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Input, Chip, ScreenContainer } from '../../components';
import { CITIES } from '../../data/dummy';

interface BusinessDetailsScreenProps {
  onContinue: (data: BusinessDetailsData) => void;
}

interface BusinessDetailsData {
  businessName: string;
  city: string;
  employees: number;
  revenueRange: string;
}

export const BusinessDetailsScreen: React.FC<BusinessDetailsScreenProps> = ({
  onContinue,
}) => {
  const [businessName, setBusinessName] = useState('Happy Café');
  const [city, setCity] = useState('Bangalore');
  const [employees, setEmployees] = useState(5);
  const [revenueRange, setRevenueRange] = useState('10-50L');

  const revenueRanges = ['0-10L', '10-50L', '50-1Cr', '1Cr+'];

  const handleContinue = () => {
    onContinue({
      businessName,
      city,
      employees,
      revenueRange,
    });
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <Text style={styles.title}>Business Details</Text>
      <Text style={styles.subtitle}>Help us understand your business better</Text>

      {/* Business Name */}
      <Input
        label="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      {/* City Picker - Using Chip Selection */}
      <View>
        <Text style={styles.label}>City</Text>
        <View style={styles.cityGrid}>
          {CITIES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={city === c}
              onPress={() => setCity(c)}
              style={styles.chip}
            />
          ))}
        </View>
      </View>

      {/* Employees Stepper */}
      <View style={styles.stepperContainer}>
        <Text style={styles.label}>Number of Employees</Text>
        <View style={styles.stepper}>
          <Button
            label="−"
            onPress={() => setEmployees(Math.max(1, employees - 1))}
            variant="outline"
            size="small"
          />
          <Text style={styles.stepperValue}>{employees}</Text>
          <Button
            label="+"
            onPress={() => setEmployees(employees + 1)}
            variant="outline"
            size="small"
          />
        </View>
      </View>

      {/* Revenue Range */}
      <View>
        <Text style={styles.label}>Annual Revenue</Text>
        <View style={styles.revenueGrid}>
          {revenueRanges.map((range) => (
            <Chip
              key={range}
              label={range}
              selected={revenueRange === range}
              onPress={() => setRevenueRange(range)}
              style={styles.chip}
            />
          ))}
        </View>
      </View>

      {/* Privacy Notice */}
      <Text style={styles.privacyNotice}>
        ✓ Your data is private and never shared
      </Text>

      {/* Continue Button */}
      <Button
        label="Continue"
        onPress={handleContinue}
        fullWidth
        style={styles.continueButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
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
  label: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  chip: {
    marginBottom: SPACING.sm,
  },
  stepperContainer: {
    marginBottom: SPACING.lg,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  stepperValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    flex: 1,
    textAlign: 'center',
  },
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  privacyNotice: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  continueButton: {
    marginBottom: SPACING.lg,
  },
});

export default BusinessDetailsScreen;
