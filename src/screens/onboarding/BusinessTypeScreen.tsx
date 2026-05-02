import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS, SHADOWS } from '../../theme';
import { Button, ScreenContainer } from '../../components';
import { BUSINESS_TYPES } from '../../data/dummy';

interface BusinessTypeScreenProps {
  onSelect: (type: string) => void;
}

export const BusinessTypeScreen: React.FC<BusinessTypeScreenProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  const renderType = ({ item }: { item: typeof BUSINESS_TYPES[0] }) => (
    <TouchableOpacity
      style={[
        styles.typeCard,
        selected === item.id && styles.typeCardSelected,
      ]}
      onPress={() => setSelected(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.typeEmoji}>{item.icon}</Text>
      <Text style={[
        styles.typeLabel,
        selected === item.id && styles.typeLabelSelected,
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer scrollable style={styles.container}>
      <Text style={styles.title}>What type of business do you run?</Text>
      <Text style={styles.subtitle}>
        Help us calculate your carbon emissions accurately
      </Text>

      <FlatList
        data={BUSINESS_TYPES}
        renderItem={renderType}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
        style={styles.grid}
      />

      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!selected}
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
  grid: {
    marginBottom: SPACING.lg,
  },
  columnWrapper: {
    gap: SPACING.md,
  },
  typeCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BORDERS.radius.lg,
    borderWidth: 2,
    borderColor: COLORS.neutral300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  typeCardSelected: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  typeEmoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  typeLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    textAlign: 'center',
  },
  typeLabelSelected: {
    color: COLORS.success,
  },
  footer: {
    marginTop: SPACING.lg,
  },
});

export default BusinessTypeScreen;
