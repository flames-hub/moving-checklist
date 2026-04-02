import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Platform,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import { useMoveStore } from '../store/moveStore';
import { useSettingsStore } from '../store/settingsStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { formatDate } from '../utils/dateCalc';
import PaywallModal from '../components/PaywallModal';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { move, updateMoveDate } = useMoveStore();
  const { isPro, notificationsEnabled, setNotificationsEnabled } = useSettingsStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* 引越し日 */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.moveDate')}
      </Text>
      <TouchableOpacity
        style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={[styles.rowLabel, { color: colors.text }]}>{t('settings.changeMoveDate')}</Text>
        <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
          {move ? formatDate(move.moveDate, i18n.language) : ''}
        </Text>
      </TouchableOpacity>
      {showDatePicker && move && (
        <DateTimePicker
          value={new Date(move.moveDate)}
          mode="date"
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

      {/* 通知 */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {t('settings.notifications')}
      </Text>
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.rowLabel, { color: isPro ? colors.text : colors.textSecondary }]}>
          {t('settings.notifications')}
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(val) => {
            if (!isPro) {
              setShowPaywall(true);
              return;
            }
            setNotificationsEnabled(val);
          }}
          trackColor={{ true: colors.primary }}
        />
      </View>

      {/* Pro */}
      {!isPro && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('settings.pro')}</Text>
          <TouchableOpacity
            style={[styles.proButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowPaywall(true)}
          >
            <Text style={styles.proButtonText}>{t('settings.pro')}</Text>
            <Text style={[styles.proDesc, { color: 'rgba(255,255,255,0.8)' }]}>
              {t('settings.proDescription')}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <PaywallModal
        visible={showPaywall}
        price="$2.99"
        onPurchase={() => setShowPaywall(false)}
        onRestore={() => setShowPaywall(false)}
        onClose={() => setShowPaywall(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.md },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  rowLabel: { fontSize: FontSize.md, fontWeight: '500' },
  rowValue: { fontSize: FontSize.md },
  proButton: { padding: Spacing.lg, borderRadius: BorderRadius.md, alignItems: 'center' },
  proButtonText: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },
  proDesc: { fontSize: FontSize.sm, marginTop: Spacing.xs },
});
