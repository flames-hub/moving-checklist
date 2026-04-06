import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMoveStore } from '../store/moveStore';
import { TaskCategory } from '../types';
import { useTheme } from '../hooks/useTheme';
import CategoryCard from '../components/CategoryCard';
import { Spacing, FontSize } from '../constants/theme';

const CATEGORIES: { key: TaskCategory; colorKey: string; descKey: string }[] = [
  { key: 'procedures', colorKey: 'categoryProcedures', descKey: 'categories.descProcedures' },
  { key: 'packing', colorKey: 'categoryPacking', descKey: 'categories.descPacking' },
  { key: 'cancellation', colorKey: 'categoryCancellation', descKey: 'categories.descCancellation' },
  { key: 'new_home', colorKey: 'categoryNewHome', descKey: 'categories.descNewHome' },
  { key: 'other', colorKey: 'categoryOther', descKey: 'categories.descOther' },
];

export default function CategoryScreen() {
  const { t } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const { tasks, toggleTask, getCategoryStats, getCompletionStats } = useMoveStore();
  const stats = getCompletionStats();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.md }]}
    >
      <Text style={[styles.pageTitle, { color: colors.text }]}>{t('tabs.categories')}</Text>
      <Text style={[styles.pageDesc, { color: colors.textSecondary }]}>
        {t('timeline.progress', { done: stats.done, total: stats.total })}
      </Text>

      {CATEGORIES.map(({ key, colorKey, descKey }) => {
        const catStats = getCategoryStats(key);
        const catTasks = tasks
          .filter((task) => task.category === key)
          .sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
            return a.timingDays - b.timingDays;
          });

        return (
          <CategoryCard
            key={key}
            title={t(`categories.${key}`)}
            description={t(descKey)}
            categoryKey={key}
            done={catStats.done}
            total={catStats.total}
            color={(colors as unknown as Record<string, string>)[colorKey]}
            tasks={catTasks.map((task) => ({
              id: task.id,
              title: task.title,
              isCompleted: task.isCompleted,
            }))}
            onToggleTask={(id) => toggleTask(id)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xl },
  pageTitle: { fontSize: FontSize.xxl, fontWeight: '800', marginBottom: Spacing.xs },
  pageDesc: { fontSize: FontSize.md, marginBottom: Spacing.lg },
});
