import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Card, Badge, ScreenContainer } from '../../components';

interface ProjectDetailProps {
  projectId: string;
  onSelectProject: () => void;
  onBack: () => void;
}

const DUMMY_PROJECT = {
  id: 'project_1',
  name: 'Amazon Forest Restoration',
  location: 'Brazil',
  image: '🌳',
  type: 'Forest',
  co2Offset: 5000,
  price: 2500,
  families: 150,
  yearsRunning: 8,
  verified: true,
  description:
    'Restore and protect Amazon rainforest for carbon sequestration and biodiversity.',
  longDescription: `This comprehensive forest restoration project focuses on protecting and expanding the Amazon rainforest, one of the world's most critical carbon sinks. Our efforts include:

• Replanting native species
• Preventing deforestation
• Supporting local communities
• Creating sustainable livelihoods
• Biodiversity conservation

The project has been running for 8 years and has successfully restored over 10,000 hectares of forest.`,
  impact: [
    { label: 'CO₂ Offset', value: '5000 tons/year' },
    { label: 'Families Supported', value: '150' },
    { label: 'Area Restored', value: '10,000 hectares' },
    { label: 'Species Protected', value: '500+' },
  ],
};

export const ProjectDetailScreen: React.FC<ProjectDetailProps> = ({
  onSelectProject,
  onBack,
}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Back Button Area */}
      <View style={styles.header}>
        <Button
          label="← Back"
          onPress={onBack}
          variant="outline"
          size="small"
          style={styles.backButton}
        />
      </View>

      {/* Project Image */}
      <View style={styles.imageContainer}>
        <Text style={styles.projectEmoji}>{DUMMY_PROJECT.image}</Text>
      </View>

      {/* Project Info */}
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.title}>{DUMMY_PROJECT.name}</Text>
            <Text style={styles.location}>📍 {DUMMY_PROJECT.location}</Text>
          </View>
          {DUMMY_PROJECT.verified && (
            <Badge label="✓ Verified" variant="success" />
          )}
        </View>

        <Text style={styles.description}>{DUMMY_PROJECT.description}</Text>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          {DUMMY_PROJECT.impact.map((item, idx) => (
            <Card key={idx} variant="outlined" style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </Card>
          ))}
        </View>

        {/* Long Description */}
        <Card title="About This Project" variant="outlined">
          <Text style={styles.longDescription}>{DUMMY_PROJECT.longDescription}</Text>
        </Card>

        {/* Price Card */}
        <Card title="Investment Required" variant="elevated">
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price per carbon credit:</Text>
            <Text style={styles.price}>₹{DUMMY_PROJECT.price}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>CO₂ offset per credit:</Text>
            <Text style={styles.price}>{DUMMY_PROJECT.co2Offset / 100} tons</Text>
          </View>
        </Card>

        {/* CTA */}
        <View style={styles.footer}>
          <Button
            label="Select This Project"
            onPress={onSelectProject}
            fullWidth
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  imageContainer: {
    height: 200,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectEmoji: {
    fontSize: 80,
  },
  infoContainer: {
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  titleColumn: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.sm,
  },
  location: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  statsGrid: {
    marginBottom: SPACING.lg,
  },
  statCard: {
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  longDescription: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  priceLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  price: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  footer: {
    paddingVertical: SPACING.lg,
  },
});

export default ProjectDetailScreen;
