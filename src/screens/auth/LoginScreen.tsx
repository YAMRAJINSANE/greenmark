import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button, Input, ScreenContainer } from '../../components';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginProps> = ({
  onLogin,
  onSignUp,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('rajesh@greenmark.io');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setLoading(false);
    }, 1500);
  };

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>🌱</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your GreenMark account</Text>
      </View>

      {/* Google Sign-In */}
      <View style={styles.googleButton}>
        <Button
          label="🔵 Continue with Google"
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
        label="Email Address"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Forgot Password Link */}
      <Text
        style={styles.forgotPassword}
        onPress={onForgotPassword}
      >
        Forgot password?
      </Text>

      {/* Login Button */}
      <Button
        label="Login"
        onPress={handleLogin}
        loading={loading}
        fullWidth
        style={styles.loginButton}
      />

      {/* Sign Up Link */}
      <View style={styles.signUpLink}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Text
          style={[styles.signUpText, styles.signUpLinkText]}
          onPress={onSignUp}
        >
          Sign up
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
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
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
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
  forgotPassword: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  loginButton: {
    marginBottom: SPACING.lg,
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  signUpLinkText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default LoginScreen;
