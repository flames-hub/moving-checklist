import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { Spacing, FontSize } from '../constants/theme';

const sectionDescKeys: Record<string, string> = {
  '2months': 'timeline.sectionDesc2months',
  '1month':  'timeline.sectionDesc1month',
  '2weeks':  'timeline.sectionDesc2weeks',
  '1week':   'timeline.sectionDesc1week',
  day:       'timeline.sectionDescDay',
  after:     'timeline.sectionDescAfter',
};

interface Props {
  title: string;
  sectionKey: string;
  isActive: boolean;
}

export default function SectionHeader({ title, sectionKey, isActive }: Props) {
  const { t } = useTranslation();
  const colors = useTheme();
  const descKey = sectionDescKeys[sectionKey];

  return (
    <View style={styles.container}>
      {/* Left accent stripe — only visible when this section is active */}
      <View
        style={[
          styles.stripe,
          { backgroundColor: isActive ? colors.primary : 'transparent' },
        ]}
      />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              { color: isActive ? colors.text : colors.textSecondary },
            ]}
          >
            {title.toUpperCase()}
          </Text>
          {isActive && (
            <Text style={[styles.nowLabel, { color: colors.primary }]}>NOW</Text>
          )}
        </View>
        {descKey && (
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            {t(descKey)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop:    Spacing.lg + 4,
    marginBottom: Spacing.sm,
  },
  stripe: {
    width:        3,
    borderRadius: 2,
    marginRight:  Spacing.sm + 4,
    minHeight:    20,
  },
  content: { flex: 1, paddingVertical: 2 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize:      FontSize.xs,
    fontWeight:    '700',
    letterSpacing: 1.2,
  },
  nowLabel: {
    fontSize:      9,
    fontWeight:    '800',
    letterSpacing: 1,
  },
  desc: {
    fontSize:   FontSize.xs,
    lineHeight: 18,
    marginTop:  3,
  },
});
