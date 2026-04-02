import React from 'react';
import { View, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMoveStore } from '../store/moveStore';
import { TaskCategory } from '../types';
import CategoryCard from '../components/CategoryCard';
import { Colors, Spacing } from '../constants/theme';

const CATEGORIES: { key: TaskCategory; colorKey: string }[] = [
  { key: 'procedures', colorKey: 'categoryProcedures' },
  { key: 'packing', colorKey: 'categoryPacking' },
  { key: 'cancellation', colorKey: 'categoryCancellation' },
  { key: 'new_home', colorKey: 'categoryNewHome' },
  { key: 'other', colorKey: 'categoryOther' },
];

export default function CategoryScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const getCategoryStats = useMoveStore((s) => s.getCategoryStats);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {CATEGORIES.map(({ key, colorKey }) => {
        const stats = getCategoryStats(key);
        return (
          <CategoryCard
            key={key}
            title={t(`categories.${key}`)}
            done={stats.done}
            total={stats.total}
            color={(colors as Record<string, string>)[colorKey]}
            onPress={() => {}}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md },
});
