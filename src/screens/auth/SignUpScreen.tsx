import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Input, ScreenContainer } from '../../components';

interface SignUpProps {
  onSignUp: (data: SignUpData) => void;
  onBackToLogin: () => void;
}

interface SignUpData {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpScreen: React.FC<SignUpProps> = ({ onSignUp, onBackToLogin }) => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSignUp({ businessName, email, password, confirmPassword });
      setLoading(false);
    }, 1500);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      <Text style={styles.subheader}>Sign up to start your sustainability journey</Text>

      {/* Google Sign-In */}
      <View style={styles.googleButton}>
        <Button
          label="🔵 Sign up with Google"
          onPress={() => {}}
          variant="outline"
          fullWidth
        />
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Form Fields */}
      <Input
        label="Business Name"
        placeholder="Enter your business name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <Input
        label="Email Address"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        label="Password"
        placeholder="Create a strong password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Input
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Privacy Notice */}
      <Text style={styles.privacyNotice}>
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </Text>

      {/* CTA Button */}
      <Button
        label="Create Account"
        onPress={handleSignUp}
        loading={loading}
        fullWidth
        style={styles.signUpButton}
      />

      {/* Login Link */}
      <View style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={[styles.loginText, styles.loginLinkText]} onPress={onBackToLogin}>
          Login
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.sm,
  },
  subheader: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  googleButton: {
    marginBottom: SPACING.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.neutral300,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  privacyNotice: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
    lineHeight: 16,
  },
  signUpButton: {
    marginBottom: SPACING.lg,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  loginText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  loginLinkText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default SignUpScreen;
