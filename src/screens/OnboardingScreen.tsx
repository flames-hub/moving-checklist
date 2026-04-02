import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { useMoveStore } from '../store/moveStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { formatDate } from '../utils/dateCalc';

export default function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const createMove = useMoveStore((s) => s.createMove);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 1);

  const [date, setDate] = useState(defaultDate);
  const [showPicker, setShowPicker] = useState(false);

  const region = Localization.getLocales()[0]?.languageCode === 'ja' ? 'jp' : 'global';

  const handleStart = () => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    createMove(`${y}-${m}-${d}`, region);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('onboarding.subtitle')}</Text>
      <TouchableOpacity
        style={[styles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.dateText, { color: colors.text }]}>
          {formatDate(date.toISOString(), i18n.language)}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date()}
          onChange={(_, selected) => {
            setShowPicker(Platform.OS === 'ios');
            if (selected) setDate(selected);
          }}
        />
      )}
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={handleStart}
      >
        <Text style={styles.startText}>{t('onboarding.start')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  title: { fontSize: FontSize.xxl, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.md },
  subtitle: { fontSize: FontSize.md, textAlign: 'center', marginBottom: Spacing.xl },
  dateButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  dateText: { fontSize: FontSize.xl, fontWeight: '600' },
  startButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl * 2,
    borderRadius: BorderRadius.md,
  },
  startText: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },
});
