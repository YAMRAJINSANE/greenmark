import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Card, Button, ScreenContainer } from '../../components';
import { DUMMY_USER, DUMMY_DASHBOARD_STATS, DUMMY_TRANSACTIONS } from '../../data/dummy';

interface DashboardProps {
  onCalculate?: () => void;
  onOffset?: () => void;
  onViewCertificates?: () => void;
}

export const DashboardScreen: React.FC<DashboardProps> = ({
  onCalculate,
  onOffset,
  onViewCertificates,
}) => {
  const noop = () => {};

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>👋 Welcome back</Text>
        <Text style={styles.businessName}>{DUMMY_USER.businessName}</Text>
      </View>

      {/* Impact Stats */}
      <View style={styles.statsGrid}>
        <Card variant="outlined" style={styles.statCard}>
          <Text style={styles.statEmoji}>🌳</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.treesEquivalent}</Text>
          <Text style={styles.statLabel}>Trees Equivalent</Text>
        </Card>
        <Card variant="outlined" style={styles.statCard}>
          <Text style={styles.statEmoji}>⚡</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.energySaved}</Text>
          <Text style={styles.statLabel}>kWh Saved</Text>
        </Card>
        <Card variant="outlined" style={styles.statCard}>
          <Text style={styles.statEmoji}>👨‍👩‍👧</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.familiesHelped}</Text>
          <Text style={styles.statLabel}>Families Helped</Text>
        </Card>
      </View>

      {/* Emissions Overview */}
      <Card title="Emissions Overview" variant="elevated" style={styles.overviewCard}>
        <View style={styles.emissionsRow}>
          <View>
            <Text style={styles.emissionsLabel}>Total Emissions</Text>
            <Text style={styles.emissionsValue}>{DUMMY_DASHBOARD_STATS.totalEmissions}t CO₂</Text>
          </View>
          <View>
            <Text style={styles.emissionsLabel}>Already Offset</Text>
            <Text style={styles.emissionsValue}>{DUMMY_DASHBOARD_STATS.totalOffset}t CO₂</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(DUMMY_DASHBOARD_STATS.totalOffset / DUMMY_DASHBOARD_STATS.totalEmissions) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round(
            (DUMMY_DASHBOARD_STATS.totalOffset / DUMMY_DASHBOARD_STATS.totalEmissions) * 100
          )}% offset
        </Text>
      </Card>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <Button
        label="📊 Calculate New Emissions"
        onPress={onCalculate ?? noop}
        variant="primary"
        fullWidth
        style={styles.actionButton}
      />
      <Button
        label="🌿 Offset More Emissions"
        onPress={onOffset ?? noop}
        variant="secondary"
        fullWidth
        style={styles.actionButton}
      />
      <Button
        label="🏅 View Certificates"
        onPress={onViewCertificates ?? noop}
        variant="outline"
        fullWidth
      />

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {DUMMY_TRANSACTIONS.slice(0, 2).map((txn) => (
        <Card key={txn.id} variant="outlined" style={styles.activityCard}>
          <View style={styles.activityRow}>
            <View>
              <Text style={styles.activityTitle}>{txn.projectName}</Text>
              <Text style={styles.activityDate}>{txn.date}</Text>
            </View>
            <Text style={styles.activityAmount}>₹{txn.amount}</Text>
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  greeting: {
    marginBottom: SPACING.lg,
  },
  greetingText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  businessName: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: SPACING.sm,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginTop: SPACING.xs,
  },
  overviewCard: {
    marginBottom: SPACING.lg,
  },
  emissionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  emissionsLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.xs,
  },
  emissionsValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.neutral200,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
  activityCard: {
    marginBottom: SPACING.md,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  activityDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginTop: SPACING.xs,
  },
  activityAmount: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default DashboardScreen;
