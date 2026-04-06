import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface Props {
  children: React.ReactNode;
}

export default function GradientBackground({ children }: Props) {
  const colors = useTheme();
  return (
    <LinearGradient
      colors={[colors.primarySoft, colors.background]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.35 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
