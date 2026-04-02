import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  visible: boolean;
  price: string;
  onPurchase: () => void;
  onRestore: () => void;
  onClose: () => void;
}

export default function PaywallModal({ visible, price, onPurchase, onRestore, onClose }: Props) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const features = [
    t('paywall.feature1'),
    t('paywall.feature2'),
    t('paywall.feature3'),
    t('paywall.feature4'),
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{t('paywall.title')}</Text>
          {features.map((f, i) => (
            <Text key={i} style={[styles.feature, { color: colors.text }]}>
              • {f}
            </Text>
          ))}
          <TouchableOpacity
            style={[styles.buyButton, { backgroundColor: colors.primary }]}
            onPress={onPurchase}
          >
            <Text style={styles.buyText}>{t('paywall.purchase', { price })}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRestore}>
            <Text style={[styles.restoreText, { color: colors.textSecondary }]}>
              {t('paywall.restore')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeText, { color: colors.textSecondary }]}>
              {t('common.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: Spacing.xl },
  title: { fontSize: FontSize.xxl, fontWeight: '800', marginBottom: Spacing.lg, textAlign: 'center' },
  feature: { fontSize: FontSize.lg, marginBottom: Spacing.sm, paddingLeft: Spacing.sm },
  buyButton: { marginTop: Spacing.lg, padding: Spacing.md, borderRadius: BorderRadius.md, alignItems: 'center' },
  buyText: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },
  restoreText: { textAlign: 'center', marginTop: Spacing.md, fontSize: FontSize.md },
  closeText: { textAlign: 'center', marginTop: Spacing.sm, fontSize: FontSize.md },
});
