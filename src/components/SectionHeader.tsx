import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Spacing, FontSize } from '../constants/theme';

interface Props {
  title: string;
  isActive: boolean;
}

export default function SectionHeader({ title, isActive }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, isActive && { backgroundColor: colors.primaryLight }]}>
      <Text style={[styles.title, { color: isActive ? colors.primary : colors.textSecondary }]}>
        {title}
      </Text>
      {isActive && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: 8,
  },
  title: { fontSize: FontSize.lg, fontWeight: '700' },
  dot: { width: 8, height: 8, borderRadius: 4, marginLeft: Spacing.sm },
});
