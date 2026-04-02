import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  title: string;
  done: number;
  total: number;
  color: string;
  onPress: () => void;
}

export default function CategoryCard({ title, done, total, color, onPress }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.colorBar, { backgroundColor: color }]} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.stats, { color: colors.textSecondary }]}>
        {done}/{total} ({percent}%)
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  colorBar: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%' },
  title: { fontSize: FontSize.lg, fontWeight: '600', marginBottom: Spacing.xs, marginLeft: Spacing.sm },
  stats: { fontSize: FontSize.md, marginLeft: Spacing.sm },
});
