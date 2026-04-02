import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Task } from '../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

const categoryColors: Record<string, { light: string; dark: string }> = {
  procedures: { light: Colors.light.categoryProcedures, dark: Colors.dark.categoryProcedures },
  packing: { light: Colors.light.categoryPacking, dark: Colors.dark.categoryPacking },
  cancellation: { light: Colors.light.categoryCancellation, dark: Colors.dark.categoryCancellation },
  new_home: { light: Colors.light.categoryNewHome, dark: Colors.dark.categoryNewHome },
  other: { light: Colors.light.categoryOther, dark: Colors.dark.categoryOther },
};

interface Props {
  task: Task;
  onToggle: () => void;
  onPress: () => void;
}

export default function TaskItem({ task, onToggle, onPress }: Props) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const catColor = categoryColors[task.category]?.[colorScheme === 'dark' ? 'dark' : 'light'] ?? colors.textSecondary;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={[
          styles.checkbox,
          {
            borderColor: task.isCompleted ? colors.success : colors.border,
            backgroundColor: task.isCompleted ? colors.success : 'transparent',
          },
        ]}
      >
        {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.text }, task.isCompleted && styles.completed]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        <View style={[styles.categoryBadge, { backgroundColor: catColor + '20' }]}>
          <Text style={[styles.categoryText, { color: catColor }]}>{task.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  content: { flex: 1 },
  title: { fontSize: FontSize.md, fontWeight: '500', marginBottom: Spacing.xs },
  completed: { textDecorationLine: 'line-through', opacity: 0.5 },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  categoryText: { fontSize: FontSize.sm, fontWeight: '600' },
});
