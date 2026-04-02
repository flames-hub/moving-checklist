import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, useColorScheme, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useSettingsStore } from '../store/settingsStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PaywallModal({ visible, onClose }: Props) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const setIsPro = useSettingsStore((s) => s.setIsPro);

  const [pkg, setPkg] = useState<PurchasesPackage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    Purchases.getOfferings()
      .then((offerings) => {
        const lifetime = offerings.current?.lifetime;
        if (lifetime) setPkg(lifetime);
      })
      .catch(() => {});
  }, [visible]);

  const price = pkg?.product.priceString ?? '$2.99';

  const handlePurchase = async () => {
    if (!pkg) return;
    setLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      if (customerInfo.entitlements.active['pro']) {
        setIsPro(true);
        onClose();
      }
    } catch (e: any) {
      if (!e.userCancelled) console.error('Purchase error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (customerInfo.entitlements.active['pro']) {
        setIsPro(true);
        onClose();
      }
    } catch (e) {
      console.error('Restore error:', e);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <ActivityIndicator style={{ marginTop: Spacing.lg }} color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={[styles.buyButton, { backgroundColor: colors.primary }]}
              onPress={handlePurchase}
            >
              <Text style={styles.buyText}>{t('paywall.purchase', { price })}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleRestore} disabled={loading}>
            <Text style={[styles.restoreText, { color: colors.textSecondary }]}>
              {t('paywall.restore')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} disabled={loading}>
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
