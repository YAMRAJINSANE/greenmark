import React from 'react';
import { View, SafeAreaView, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  backgroundColor?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = false,
  backgroundColor = COLORS.white,
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <Container
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
    >
      {children}
    </Container>
  );
};

export const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default { ScreenContainer, SafeArea };
