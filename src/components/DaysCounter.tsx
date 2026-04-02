import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize } from '../constants/theme';

interface Props {
  daysLeft: number;
}

export default function DaysCounter({ daysLeft }: Props) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  let label: string;
  let textColor = colors.text;
  if (daysLeft > 0) {
    label = t('timeline.daysLeft', { count: daysLeft });
  } else if (daysLeft === 0) {
    label = t('timeline.today');
    textColor = colors.warning;
  } else {
    label = t('timeline.daysAgo', { count: Math.abs(daysLeft) });
    textColor = colors.textSecondary;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.number, { color: textColor }]}>{Math.abs(daysLeft)}</Text>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: Spacing.md },
  number: { fontSize: 48, fontWeight: '800' },
  label: { fontSize: FontSize.md, fontWeight: '500', marginTop: Spacing.xs },
});
