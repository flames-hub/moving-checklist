import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useMoveStore } from '../store/moveStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type RouteType = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const route = useRoute<RouteType>();
  const navigation = useNavigation();
  const { tasks, toggleTask, updateTaskNote, deleteTask } = useMoveStore();
  const task = tasks.find((task) => task.id === route.params.taskId);

  const [note, setNote] = useState(task?.note ?? '');

  if (!task) return null;

  const handleSaveNote = () => {
    updateTaskNote(task.id, note);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
      {task.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>{task.description}</Text>
      )}
      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: task.isCompleted ? colors.success : colors.primary }]}
        onPress={() => toggleTask(task.id)}
      >
        <Text style={styles.toggleText}>
          {task.isCompleted ? t('task.markIncomplete') : t('task.markComplete')}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('task.note')}</Text>
      <TextInput
        style={[
          styles.noteInput,
          { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
        ]}
        value={note}
        onChangeText={setNote}
        onBlur={handleSaveNote}
        placeholder={t('task.notePlaceholder')}
        placeholderTextColor={colors.textSecondary}
        multiline
      />
      {task.isCustom && (
        <TouchableOpacity
          style={[styles.deleteButton, { borderColor: colors.error }]}
          onPress={() => {
            deleteTask(task.id);
            navigation.goBack();
          }}
        >
          <Text style={[styles.deleteText, { color: colors.error }]}>{t('common.delete')}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.xl },
  title: { fontSize: FontSize.xl, fontWeight: '700', marginBottom: Spacing.md },
  description: { fontSize: FontSize.md, lineHeight: 22, marginBottom: Spacing.lg },
  toggleButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  toggleText: { color: '#fff', fontSize: FontSize.md, fontWeight: '600' },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', marginBottom: Spacing.sm },
  noteInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: FontSize.md,
    marginBottom: Spacing.lg,
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  deleteText: { fontSize: FontSize.md, fontWeight: '600' },
});
