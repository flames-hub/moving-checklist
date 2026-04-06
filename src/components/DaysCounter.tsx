import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { Spacing, FontSize } from '../constants/theme';

interface Props {
  daysLeft: number;
}

export default function DaysCounter({ daysLeft }: Props) {
  const { t } = useTranslation();
  const colors = useTheme();

  // After move
  if (daysLeft < 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={[styles.pastText, { color: colors.textSecondary }]}>
          {t('timeline.daysAgo', { count: Math.abs(daysLeft) })}
        </Text>
      </View>
    );
  }

  // Moving day
  if (daysLeft === 0) {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.stripe, { backgroundColor: colors.warning }]} />
        <View style={styles.inner}>
          <Text style={[styles.todayLabel, { color: colors.textSecondary }]}>
            {t('timeline.daysLeftLabel').toUpperCase()}
          </Text>
          <Text style={[styles.todayText, { color: colors.warning }]}>
            {t('timeline.today')}
          </Text>
        </View>
      </View>
    );
  }

  const isUrgent = daysLeft <= 7;
  const accentColor = isUrgent ? colors.warning : colors.primary;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.stripe, { backgroundColor: accentColor }]} />
      <View style={styles.inner}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {t('timeline.daysLeftLabel').toUpperCase()}
        </Text>
        <View style={styles.countRow}>
          <Text style={[styles.number, { color: accentColor }]}>{daysLeft}</Text>
          <Text style={[styles.unit, { color: accentColor }]}>
            {t('timeline.daysUnit')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems:    'stretch',
    marginBottom:  Spacing.lg,
  },
  stripe: {
    width:        3,
    borderRadius: 2,
    marginRight:  Spacing.sm + 4,
  },
  inner: {
    flex: 1,
    paddingVertical: 2,
  },
  label: {
    fontSize:      FontSize.xs,
    fontWeight:    '700',
    letterSpacing: 1.2,
    marginBottom:  2,
  },
  countRow: {
    flexDirection: 'row',
    alignItems:    'flex-end',
  },
  number: {
    fontSize:      60,
    fontWeight:    '800',
    lineHeight:    66,
    letterSpacing: -2,
  },
  unit: {
    fontSize:    FontSize.xl,
    fontWeight:  '700',
    paddingBottom: 8,
    marginLeft:  4,
  },
  todayLabel: {
    fontSize:      FontSize.xs,
    fontWeight:    '700',
    letterSpacing: 1.2,
    marginBottom:  4,
  },
  todayText: {
    fontSize:   FontSize.xl,
    fontWeight: '700',
    lineHeight: 28,
  },
  pastText: {
    fontSize:   FontSize.lg,
    fontWeight: '500',
    paddingVertical: Spacing.xs,
  },
});
