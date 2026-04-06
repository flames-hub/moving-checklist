import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMoveStore } from '../store/moveStore';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/GlassCard';
import { formatDate } from '../utils/dateCalc';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function MoveListScreen() {
  const { t, i18n } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const { moves, allTasks, activeMoveId, switchMove, deleteMove } = useMoveStore();
  const handleSelect = (moveId: string) => {
    switchMove(moveId);
    navigation.goBack();
  };

  const handleDelete = (moveId: string, name: string) => {
    Alert.alert(
      t('moves.deleteTitle'),
      t('moves.deleteMsg', { name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.delete'), style: 'destructive', onPress: () => deleteMove(moveId) },
      ]
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('moves.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {moves.map((m) => {
          const mTasks = allTasks.filter((t) => t.moveId === m.id);
          const done = mTasks.filter((t) => t.isCompleted).length;
          const total = mTasks.length;
          const isActive = m.id === activeMoveId;

          return (
            <TouchableOpacity
              key={m.id}
              onPress={() => handleSelect(m.id)}
              activeOpacity={0.7}
            >
              <Card style={isActive ? { borderWidth: 2, borderColor: colors.primary } : undefined}>
                <View style={styles.moveRow}>
                  <View style={[styles.moveIcon, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="cube-outline" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.moveInfo}>
                    <Text style={[styles.moveName, { color: colors.text }]}>{m.name}</Text>
                    <Text style={[styles.moveDate, { color: colors.textSecondary }]}>
                      {formatDate(m.moveDate, i18n.language)}
                    </Text>
                    <Text style={[styles.moveProgress, { color: colors.textSecondary }]}>
                      {done}/{total} {t('moves.completed')}
                    </Text>
                  </View>
                  {isActive && (
                    <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.activeBadgeText}>{t('moves.active')}</Text>
                    </View>
                  )}
                  {moves.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleDelete(m.id, m.name)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="trash-outline" size={20} color={colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.addBtn, { borderColor: colors.primary }]}
          onPress={() => navigation.navigate('Onboarding')}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
          <Text style={[styles.addBtnText, { color: colors.primary }]}>{t('moves.addNew')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '800' },
  content: { padding: Spacing.md, gap: Spacing.sm },
  moveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  moveIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  moveInfo: { flex: 1 },
  moveName: { fontSize: FontSize.lg, fontWeight: '700' },
  moveDate: { fontSize: FontSize.sm, marginTop: 2 },
  moveProgress: { fontSize: FontSize.sm, marginTop: 2 },
  activeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  activeBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  addBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    marginTop: Spacing.sm,
  },
  addBtnText: { fontSize: FontSize.md, fontWeight: '600' },
});
