import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMoveStore } from '../store/moveStore';
import { TIMING_SECTIONS } from '../types';
import { getDaysUntilMove, getCurrentSectionKey } from '../utils/dateCalc';
import { useTheme } from '../hooks/useTheme';
import TaskItem from '../components/TaskItem';
import ProgressBar from '../components/ProgressBar';
import DaysCounter from '../components/DaysCounter';
import SectionHeader from '../components/SectionHeader';
import { Spacing, FontSize, BorderRadius } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function TimelineScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const { move, tasks, toggleTask, getCompletionStats, updateMoveNote } = useMoveStore();

  const [noteFocused, setNoteFocused] = useState(false);
  const [noteText, setNoteText] = useState(move?.note ?? '');
  const [filterIncomplete, setFilterIncomplete] = useState(false);

  const stats = getCompletionStats();
  const daysLeft = move ? getDaysUntilMove(move.moveDate) : 0;
  const currentSection = move ? getCurrentSectionKey(move.moveDate) : '';

  const sections = useMemo(() => {
    return TIMING_SECTIONS.map((section) => ({
      key: section.key,
      title: t(section.labelKey),
      data: tasks
        .filter((task) => task.timingDays >= section.minDays && task.timingDays <= section.maxDays)
        .filter((task) => !filterIncomplete || !task.isCompleted)
        .sort((a, b) => a.timingDays - b.timingDays),
    })).filter((s) => s.data.length > 0);
  }, [tasks, t, filterIncomplete]);

  const handleNoteSave = () => {
    updateMoveNote(noteText);
    setNoteFocused(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
            <DaysCounter daysLeft={daysLeft} />

            {/* Memo area */}
            <View style={[styles.memoWrap, { borderColor: noteFocused ? colors.primary : colors.border, backgroundColor: colors.surface }]}>
              <TextInput
                style={[styles.memoInput, { color: colors.text }]}
                value={noteText}
                onChangeText={setNoteText}
                placeholder={t('timeline.memoPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                multiline
                onFocus={() => setNoteFocused(true)}
                onBlur={handleNoteSave}
              />
              {noteFocused && (
                <TouchableOpacity
                  style={[styles.memoDone, { backgroundColor: colors.primary }]}
                  onPress={handleNoteSave}
                >
                  <Text style={styles.memoDoneText}>{t('common.done')}</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.progressWrap}>
              <ProgressBar
                done={stats.done}
                total={stats.total}
                label={t('timeline.progress', { done: stats.done, total: stats.total })}
              />
            </View>

            {/* Filter toggle */}
            <TouchableOpacity
              style={[
                styles.filterChip,
                {
                  backgroundColor: filterIncomplete ? colors.primary : colors.surface,
                  borderColor: filterIncomplete ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setFilterIncomplete((v) => !v)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: filterIncomplete ? '#fff' : colors.textSecondary },
                ]}
              >
                {filterIncomplete ? t('timeline.filterActive') : t('timeline.filterAll')}
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <SectionHeader
            title={section.title}
            sectionKey={section.key}
            isActive={section.key === currentSection}
          />
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
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.md },
  memoWrap: {
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    minHeight: 52,
  },
  memoInput: {
    fontSize: FontSize.md,
    lineHeight: 22,
    minHeight: 32,
  },
  memoDone: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xs,
  },
  memoDoneText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  progressWrap: { marginTop: Spacing.md },
  filterChip: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  filterChipText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
});
