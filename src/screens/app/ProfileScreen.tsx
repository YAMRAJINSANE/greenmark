import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS } from '../../theme';
import { Card, Button, Badge, ScreenContainer } from '../../components';
import { DUMMY_USER, DUMMY_CERTIFICATES, DUMMY_DASHBOARD_STATS } from '../../data/dummy';

interface ProfileProps {
  onSettings?: () => void;
  onPaymentMethods?: () => void;
  onCertificates?: () => void;
  onLogout?: () => void;
}

interface MenuItemProps {
  icon: string;
  label: string;
  value?: string;
  onPress: () => void;
  arrow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  value,
  onPress,
  arrow = true,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuContent}>
      <Text style={styles.menuLabel}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
    </View>
    {arrow && <Text style={styles.menuArrow}>›</Text>}
  </TouchableOpacity>
);

export const ProfileScreen: React.FC<ProfileProps> = ({
  onSettings,
  onPaymentMethods,
  onCertificates,
  onLogout,
}) => {
  const noop = () => {};

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {DUMMY_USER.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{DUMMY_USER.name}</Text>
          <Text style={styles.profileEmail}>{DUMMY_USER.email}</Text>
        </View>
      </View>

      {/* Business Info */}
      <Card title="Business Information" variant="outlined" style={styles.businessCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Business Name</Text>
          <Text style={styles.infoValue}>{DUMMY_USER.businessName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type</Text>
          <Text style={styles.infoValue}>
            {DUMMY_USER.businessType.charAt(0).toUpperCase() +
              DUMMY_USER.businessType.slice(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>City</Text>
          <Text style={styles.infoValue}>{DUMMY_USER.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Employees</Text>
          <Text style={styles.infoValue}>{DUMMY_USER.employees}</Text>
        </View>
      </Card>

      {/* Stats */}
      <Card title="Impact Stats" variant="outlined" style={styles.statsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Emissions:</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.totalEmissions}t CO₂</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Offset:</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.totalOffset}t CO₂</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Certificates Earned:</Text>
          <Text style={styles.statValue}>{DUMMY_DASHBOARD_STATS.certificatesEarned}</Text>
        </View>
      </Card>

      {/* Menu Items */}
      <Text style={styles.sectionTitle}>Account & Settings</Text>

      <MenuItem
        icon="💳"
        label="Payment Methods"
        onPress={onPaymentMethods ?? noop}
      />
      <MenuItem
        icon="🏅"
        label="My Certificates"
        value={`${DUMMY_DASHBOARD_STATS.certificatesEarned}`}
        onPress={onCertificates ?? noop}
      />
      <MenuItem
        icon="⚙️"
        label="Settings"
        onPress={onSettings ?? noop}
      />

      {/* Logout Button */}
      <Button
        label="Logout"
        onPress={onLogout ?? noop}
        variant="outline"
        fullWidth
        style={styles.logoutButton}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerText}>© 2026 GreenMark. All rights reserved.</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  businessCard: {
    marginBottom: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  menuValue: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginTop: SPACING.xs,
  },
  menuArrow: {
    fontSize: 20,
    color: COLORS.neutral400,
    marginLeft: SPACING.md,
  },
  logoutButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral200,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default ProfileScreen;
