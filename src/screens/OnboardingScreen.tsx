import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMoveStore } from '../store/moveStore';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/GlassCard';
import { formatDate } from '../utils/dateCalc';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const createMove = useMoveStore((s) => s.createMove);
  const moves = useMoveStore((s) => s.moves);
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 1);
  const [date, setDate] = useState(defaultDate);
  const [name, setName] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const lang = i18n.language;
  const region = Localization.getLocales()[0]?.languageCode === 'ja' ? 'jp' : 'global';

  const handleStart = () => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const moveName = name.trim() || `${t('onboarding.defaultName')} ${moves.length + 1}`;
    createMove(moveName, `${y}-${m}-${d}`, region);
    if (moves.length === 0) {
      navigation.replace('Main');
    } else {
      navigation.goBack();
    }
  };

  const handleDateChange = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) setDate(selected);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 40 }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name="cube-outline" size={40} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('onboarding.subtitle')}
        </Text>
      </View>

      {/* Move name input */}
      <Card style={styles.nameCard}>
        <View style={styles.nameInner}>
          <Text style={[styles.nameLabel, { color: colors.textSecondary }]}>
            {t('onboarding.moveName')}
          </Text>
          <TextInput
            style={[styles.nameInput, { color: colors.text, borderColor: colors.border }]}
            value={name}
            onChangeText={setName}
            placeholder={t('onboarding.moveNamePlaceholder')}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </Card>

      {/* Date display + picker trigger */}
      <Card style={styles.dateCard} raised>
        <TouchableOpacity
          style={styles.dateInner}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.7}
        >
          <View style={[styles.dateIconCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="calendar" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
            {t('onboarding.setDate')}
          </Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>
            {formatDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, lang)}
          </Text>
          <View style={[styles.changeDateBtn, { borderColor: colors.primary }]}>
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={[styles.changeDateText, { color: colors.primary }]}>
              {t('settings.changeMoveDate')}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          locale={lang.startsWith('ja') ? 'ja-JP' : 'en-US'}
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === 'ios' && showPicker && (
        <TouchableOpacity
          style={[styles.pickerDoneBtn, { backgroundColor: colors.primary }]}
          onPress={() => setShowPicker(false)}
          activeOpacity={0.85}
        >
          <Text style={styles.pickerDoneText}>{t('common.done')}</Text>
        </TouchableOpacity>
      )}

      {/* Start button */}
      <TouchableOpacity
        style={[
          styles.startButton,
          { backgroundColor: colors.primary, shadowColor: colors.shadow },
          Shadow.raised,
        ]}
        onPress={handleStart}
        activeOpacity={0.85}
      >
        <Text style={styles.startText}>{t('onboarding.start')}</Text>
      </TouchableOpacity>

      <View style={{ height: insets.bottom + 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  nameCard: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  nameInner: {
    padding: Spacing.md,
  },
  nameLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  nameInput: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
  },
  dateCard: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  dateInner: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  dateIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateLabel: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  dateValue: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  changeDateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  changeDateText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  pickerDoneBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  pickerDoneText: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  startButton: {
    width: '100%',
    paddingVertical: Spacing.md + 2,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});
