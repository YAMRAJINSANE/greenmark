import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Share,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Card, ScreenContainer } from '../../components';

interface SuccessScreenProps {
  transactionId: string;
  businessName: string;
  creditsOffset: number;
  projectName: string;
  onShare: () => void;
  onDownload: () => void;
  onDashboard: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  transactionId,
  businessName,
  creditsOffset,
  projectName,
  onShare,
  onDownload,
  onDashboard,
}) => {
  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Success Animation Area */}
      <View style={styles.celebrationArea}>
        <Text style={styles.celebrationEmoji}>✓</Text>
        <Text style={styles.celebrationText}>Payment Successful!</Text>
      </View>

      {/* Certificate Preview */}
      <Card title="Your Certificate" variant="elevated" style={styles.certificateCard}>
        <View style={styles.certificateContent}>
          <Text style={styles.certEmoji}>🏅</Text>
          <Text style={styles.certTitle}>Carbon Offset Certificate</Text>
          <Text style={styles.certBusiness}>{businessName}</Text>

          <View style={styles.certDetails}>
            <View style={styles.certRow}>
              <Text style={styles.certLabel}>Credits Offset:</Text>
              <Text style={styles.certValue}>{creditsOffset}</Text>
            </View>
            <View style={styles.certRow}>
              <Text style={styles.certLabel}>Project:</Text>
              <Text style={styles.certValue}>{projectName}</Text>
            </View>
            <View style={styles.certRow}>
              <Text style={styles.certLabel}>Certificate ID:</Text>
              <Text style={styles.certValue}>CERT-{transactionId}</Text>
            </View>
          </View>

          <View style={styles.certFooter}>
            <Text style={styles.certVerified}>✓ Verified by Verra</Text>
          </View>
        </View>
      </Card>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          label="📤 Share Certificate"
          onPress={onShare}
          variant="primary"
          fullWidth
          style={styles.actionButton}
        />
        <Button
          label="⬇️ Download Certificate"
          onPress={onDownload}
          variant="secondary"
          fullWidth
          style={styles.actionButton}
        />
        <Button
          label="Go to Dashboard"
          onPress={onDashboard}
          variant="outline"
          fullWidth
        />
      </View>

      {/* Impact Info */}
      <Card variant="outlined" style={styles.impactCard}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <Text style={styles.impactText}>
          You just offset {creditsOffset * 0.05} tons of CO₂! 🌍
        </Text>
        <Text style={styles.impactSubtext}>
          That's equivalent to planting {Math.ceil(creditsOffset * 0.5)} trees!
        </Text>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.successLight,
  },
  celebrationArea: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
    paddingVertical: SPACING.lg,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: SPACING.md,
  },
  celebrationText: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  certificateCard: {
    marginBottom: SPACING.lg,
  },
  certificateContent: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  certEmoji: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  certTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.md,
  },
  certBusiness: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.lg,
  },
  certDetails: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.neutral300,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  certLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral700,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  certValue: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  certFooter: {
    alignItems: 'center',
  },
  certVerified: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  actionsContainer: {
    marginBottom: SPACING.lg,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
  impactCard: {
    backgroundColor: COLORS.infoLight,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.md,
  },
  impactText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.sm,
  },
  impactSubtext: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default SuccessScreen;
