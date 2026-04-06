import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  done: number;
  total: number;
  label: string;
}

export default function ProgressBar({ done, total, label }: Props) {
  const colors = useTheme();
  const percent = total === 0 ? 0 : (done / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.percent, { color: colors.primary }]}>
          {Math.round(percent)}%
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.border }]}>
        {percent > 0 && (
          <View
            style={[
              styles.fill,
              {
                width: `${Math.max(percent, 1.5)}%` as any,
                backgroundColor: colors.primary,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { marginBottom: Spacing.md },
  labelRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  label:      { fontSize: FontSize.sm, fontWeight: '500' },
  percent:    { fontSize: FontSize.sm, fontWeight: '700' },
  track:      { height: 3, borderRadius: BorderRadius.full, overflow: 'hidden' },
  fill:       { height: '100%', borderRadius: BorderRadius.full },
});
