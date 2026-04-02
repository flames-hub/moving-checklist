import React, { useMemo } from 'react';
import { View, SectionList, StyleSheet, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMoveStore } from '../store/moveStore';
import { TIMING_SECTIONS } from '../types';
import { getDaysUntilMove, getCurrentSectionKey } from '../utils/dateCalc';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import DaysCounter from '../components/DaysCounter';
import SectionHeader from '../components/SectionHeader';
import { Colors, Spacing } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function TimelineScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { move, tasks, toggleTask, getCompletionStats } = useMoveStore();

  const stats = getCompletionStats();
  const daysLeft = move ? getDaysUntilMove(move.moveDate) : 0;
  const currentSection = move ? getCurrentSectionKey(move.moveDate) : '';

  const sections = useMemo(() => {
    return TIMING_SECTIONS.map((section) => ({
      key: section.key,
      title: t(section.labelKey),
      data: tasks
        .filter((task) => task.timingDays >= section.minDays && task.timingDays <= section.maxDays)
        .sort((a, b) => a.timingDays - b.timingDays),
    })).filter((s) => s.data.length > 0);
  }, [tasks, t]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <DaysCounter daysLeft={daysLeft} />
            <ProgressBar
              done={stats.done}
              total={stats.total}
              label={t('timeline.progress', { done: stats.done, total: stats.total })}
            />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} isActive={section.key === currentSection} />
        )}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: Spacing.md },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
});
