import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Platform,
  Linking,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMoveStore } from '../store/moveStore';
import { useSettingsStore } from '../store/settingsStore';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/AppNavigator';
import Card from '../components/GlassCard';
import { ThemeMeta, Themes, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { formatDate } from '../utils/dateCalc';
import PaywallModal from '../components/PaywallModal';

const PRIVACY_URL = 'https://flames-hub.github.io/moving-checklist/privacy.html';
const TERMS_URL = 'https://flames-hub.github.io/moving-checklist/terms.html';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { move, updateMoveDate } = useMoveStore();
  const { notificationsEnabled, setNotificationsEnabled, themeKey, setThemeKey } =
    useSettingsStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.md }]}
    >
      <Text style={[styles.pageTitle, { color: colors.text }]}>{t('settings.title')}</Text>

      {/* ── Moving Date ── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.moveDate')}
      </Text>
      <Card>
        <View style={styles.dateCard}>
          <View style={[styles.dateIconCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="calendar" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
            {t('settings.moveDate')}
          </Text>
          <Text style={[styles.dateValue, { color: colors.text }]}>
            {move ? formatDate(move.moveDate, i18n.language) : ''}
          </Text>
          <Text style={[styles.dateHint, { color: colors.textSecondary }]}>
            {t('settings.moveDateDesc')}
          </Text>
          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.primary }]}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={18} color={colors.primary} />
            <Text style={[styles.dateButtonText, { color: colors.primary }]}>
              {t('settings.changeMoveDate')}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
      {showDatePicker && move && (
        <DateTimePicker
          value={new Date(move.moveDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          locale={i18n.language.startsWith('ja') ? 'ja-JP' : 'en-US'}
          onChange={(_, selected) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selected) {
              const y = selected.getFullYear();
              const m = String(selected.getMonth() + 1).padStart(2, '0');
              const d = String(selected.getDate()).padStart(2, '0');
              updateMoveDate(`${y}-${m}-${d}`);
            }
          }}
        />
      )}

      {/* ── Manage Moves ── */}
      <TouchableOpacity
        style={[styles.manageMoveBtn, { borderColor: colors.primary }]}
        onPress={() => navigation.navigate('MoveList')}
        activeOpacity={0.7}
      >
        <Ionicons name="swap-horizontal-outline" size={20} color={colors.primary} />
        <Text style={[styles.manageMoveBtnText, { color: colors.primary }]}>
          {t('moves.manage')}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.primary} />
      </TouchableOpacity>

      {/* ── Theme ── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.theme')}
      </Text>
      <Card>
        <View style={styles.themeGrid}>
          {ThemeMeta.map(({ key, iconName }) => {
            const selected = key === themeKey;
            const palette = Themes[key];
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.themePill,
                  {
                    backgroundColor: selected ? palette.primarySoft : 'transparent',
                    borderColor: selected ? palette.primary : colors.border,
                  },
                ]}
                onPress={() => setThemeKey(key)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.themeIconCircle,
                    { backgroundColor: selected ? palette.primary + '20' : 'transparent' },
                  ]}
                >
                  <Ionicons
                    name={iconName as any}
                    size={26}
                    color={selected ? palette.primary : colors.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    styles.themeName,
                    { color: selected ? palette.primary : colors.textSecondary },
                  ]}
                >
                  {t(`settings.theme${key.charAt(0).toUpperCase()}${key.slice(1)}` as any)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* ── Notifications ── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.notifications')}
      </Text>
      <Card>
        <View style={styles.row}>
          <View style={[styles.rowIconCircle, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="notifications-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>
              {t('settings.notifications')}
            </Text>
            <Text style={[styles.rowHint, { color: colors.textSecondary }]}>
              {t('settings.notificationsDesc')}
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor="#fff"
          />
        </View>
      </Card>


      {/* ── About ── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.about')}
      </Text>
      <Card>
        <View style={styles.aboutInner}>
          <Text style={[styles.aboutTitle, { color: colors.text }]}>{t('app.name')}</Text>
          <Text style={[styles.rowHint, { color: colors.textSecondary }]}>
            {t('settings.aboutDesc')}
          </Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            {t('settings.version')} 1.0.0
          </Text>
        </View>
      </Card>

      {/* ── Legal ── */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.legal')}
      </Text>
      <Card>
        <TouchableOpacity
          style={[styles.legalRow, { borderBottomColor: colors.border }]}
          onPress={() => Linking.openURL(PRIVACY_URL)}
          activeOpacity={0.6}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
          <Text style={[styles.legalLabel, { color: colors.text }]}>{t('settings.privacy')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.legalRowLast}
          onPress={() => Linking.openURL(TERMS_URL)}
          activeOpacity={0.6}
        >
          <Ionicons name="reader-outline" size={20} color={colors.textSecondary} />
          <Text style={[styles.legalLabel, { color: colors.text }]}>{t('settings.terms')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </Card>

      <View style={{ height: insets.bottom + 40 }} />

      <PaywallModal visible={showPaywall} onClose={() => setShowPaywall(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md },
  pageTitle: { fontSize: FontSize.xxl, fontWeight: '800', marginBottom: Spacing.md },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  // Date card
  dateCard: {
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
    marginBottom: Spacing.sm,
  },
  dateHint: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  dateButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  // Theme
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  themePill: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  themeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  themeName: { fontSize: FontSize.sm, fontWeight: '700' },
  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  rowIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  rowContent: { flex: 1, marginRight: Spacing.md },
  rowLabel: { fontSize: FontSize.md, fontWeight: '600' },
  rowHint: { fontSize: FontSize.sm, lineHeight: 20, marginTop: Spacing.xs },
  // Pro
  proCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  proTitle: { fontSize: FontSize.xl, fontWeight: '800', marginTop: Spacing.sm, marginBottom: Spacing.xs },
  proDesc: { fontSize: FontSize.sm, textAlign: 'center', lineHeight: 22 },
  // About
  aboutInner: { padding: Spacing.md },
  aboutTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.xs },
  version: { fontSize: FontSize.xs, marginTop: Spacing.sm },
  // Legal
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.sm,
  },
  legalRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  legalLabel: { fontSize: FontSize.md, fontWeight: '500', flex: 1 },
  manageMoveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginTop: Spacing.md,
  },
  manageMoveBtnText: { fontSize: FontSize.md, fontWeight: '600', flex: 1 },
});
