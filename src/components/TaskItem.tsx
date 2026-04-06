import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Task } from '../types';
import { useTheme } from '../hooks/useTheme';
import { Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  task: Task;
  onToggle: () => void;
  onPress: () => void;
}

const CAT_COLORS: Record<string, string> = {
  procedures:   'categoryProcedures',
  packing:      'categoryPacking',
  cancellation: 'categoryCancellation',
  new_home:     'categoryNewHome',
  other:        'categoryOther',
};

export default function TaskItem({ task, onToggle, onPress }: Props) {
  const { t } = useTranslation();
  const colors = useTheme();
  const colorKey = CAT_COLORS[task.category] ?? 'categoryOther';
  const catColor = (colors as unknown as Record<string, string>)[colorKey];

  return (
    <TouchableOpacity
      style={[
        styles.row,
        {
          backgroundColor: colors.surfaceRaised,
          borderColor:     colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {/* Category accent bar */}
      <View
        style={[
          styles.accentBar,
          { backgroundColor: task.isCompleted ? colors.border : catColor },
        ]}
      />

      {/* Content */}
      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            task.isCompleted && styles.completedTitle,
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        {task.description && !task.isCompleted ? (
          <Text
            style={[styles.desc, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {task.description}
          </Text>
        ) : null}
        <Text style={[styles.catLabel, { color: task.isCompleted ? colors.textSecondary : catColor }]}>
          {t(`categories.${task.category}`)}
        </Text>
      </View>

      {/* ── Right complete button ── */}
      <TouchableOpacity
        onPress={onToggle}
        style={styles.completeBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.7}
      >
        <Ionicons
          name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={32}
          color={task.isCompleted ? colors.success : colors.border}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    paddingVertical: Spacing.sm + 4,
    paddingRight:  Spacing.sm,
    borderRadius:  BorderRadius.md,
    borderWidth:   StyleSheet.hairlineWidth,
    marginBottom:  Spacing.sm,
    gap:           Spacing.sm + 2,
  },
  accentBar: {
    width:        3,
    height:       38,
    borderRadius: 2,
    flexShrink:   0,
  },
  body: { flex: 1 },
  title: {
    fontSize:   FontSize.md,
    fontWeight: '600',
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity:            0.38,
  },
  desc: {
    fontSize:   FontSize.sm,
    lineHeight: 18,
    marginTop:  2,
  },
  catLabel: {
    fontSize:      FontSize.xs,
    fontWeight:    '600',
    letterSpacing: 0.3,
    marginTop:     3,
  },
  completeBtn: {
    width:          44,
    height:         44,
    justifyContent: 'center',
    alignItems:     'center',
    flexShrink:     0,
  },
});
