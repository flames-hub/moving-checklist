import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { CATEGORY_ICONS } from '../constants/icons';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

interface TaskSummary {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Props {
  title: string;
  description: string;
  categoryKey: string;
  done: number;
  total: number;
  color: string;
  tasks: TaskSummary[];
  onToggleTask: (id: string) => void;
}

export default function CategoryCard({
  title,
  description,
  categoryKey,
  done,
  total,
  color,
  tasks,
  onToggleTask,
}: Props) {
  const colors = useTheme();
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const [expanded, setExpanded] = useState(false);
  const iconName = CATEGORY_ICONS[categoryKey] ?? 'ellipsis-horizontal-circle';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceRaised, shadowColor: colors.shadow },
        Shadow.card,
      ]}
    >
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        style={styles.header}
      >
        <View style={[styles.iconCircle, { backgroundColor: color + '18' }]}>
          <Ionicons name={iconName as any} size={22} color={color} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={expanded ? 0 : 1}>
            {description}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.fraction, { color: colors.textSecondary }]}>
            {done}/{total}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.progressRow}>
        <View style={[styles.track, { backgroundColor: color + '20' }]}>
          <View
            style={[
              styles.fill,
              { width: `${Math.max(percent, 2)}%` as any, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={[styles.percent, { color }]}>{percent}%</Text>
      </View>

      {expanded && tasks.length > 0 && (
        <View style={[styles.taskList, { borderTopColor: colors.border }]}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskRow}
              onPress={() => onToggleTask(task.id)}
              activeOpacity={0.6}
            >
              <Ionicons
                name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={task.isCompleted ? colors.success : colors.border}
              />
              <Text
                style={[
                  styles.taskTitle,
                  { color: colors.text },
                  task.isCompleted && { textDecorationLine: 'line-through', opacity: 0.45 },
                ]}
                numberOfLines={1}
              >
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm + 4,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md + 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerText: { flex: 1, marginRight: Spacing.sm },
  title: { fontSize: FontSize.lg, fontWeight: '700' },
  desc: { fontSize: FontSize.sm, lineHeight: 20, marginTop: 2 },
  headerRight: { alignItems: 'flex-end', gap: 4 },
  fraction: { fontSize: FontSize.sm, fontWeight: '600' },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: BorderRadius.full },
  percent: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'right',
  },
  taskList: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  taskTitle: { fontSize: FontSize.md, flex: 1 },
});
