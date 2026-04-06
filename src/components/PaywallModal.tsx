import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Purchases from '../utils/purchases';
import { useSettingsStore } from '../store/settingsStore';
import { useTheme } from '../hooks/useTheme';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const FEATURE_ICONS = ['🎨', '🔔', '📋', '📄'];

export default function PaywallModal({ visible, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const colors = useTheme();
  const setIsPro = useSettingsStore((s) => s.setIsPro);

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    Purchases.getOfferings()
      .then((offerings: any) => {
        const lifetime = offerings.current?.lifetime;
        if (lifetime) setPkg(lifetime);
      })
      .catch(() => {});
  }, [visible]);

  const fallbackPrice = i18n.language.startsWith('ja') ? '¥400' : '$2.99';
  const price = pkg?.product.priceString ?? fallbackPrice;

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
        <View
          style={[
            styles.sheet,
            { backgroundColor: colors.surface, shadowColor: colors.shadow },
            Shadow.raised,
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          <Text style={[styles.title, { color: colors.text }]}>{t('paywall.title')}</Text>

          {features.map((f, i) => (
            <View
              key={i}
              style={[styles.featureRow, { backgroundColor: colors.primarySoft }]}
            >
              <Text style={styles.featureIcon}>{FEATURE_ICONS[i]}</Text>
              <Text style={[styles.featureText, { color: colors.text }]}>{f}</Text>
            </View>
          ))}

          {loading ? (
            <ActivityIndicator style={{ marginTop: Spacing.lg }} color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={[
                styles.buyButton,
                { backgroundColor: colors.primary, shadowColor: colors.shadow },
                Shadow.card,
              ]}
              onPress={handlePurchase}
              activeOpacity={0.85}
            >
              <Text style={styles.buyText}>{t('paywall.purchase', { price })}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleRestore} disabled={loading}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              {t('paywall.restore')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} disabled={loading}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              {t('common.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  sheet: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    paddingTop: Spacing.md,
  },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: Spacing.lg },
  title: { fontSize: FontSize.xxl, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.lg },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  featureIcon: { fontSize: 22, marginRight: Spacing.md },
  featureText: { fontSize: FontSize.lg, fontWeight: '500', flex: 1 },
  buyButton: {
    marginTop: Spacing.md,
    padding: Spacing.md + 2,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  buyText: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },
  link: { textAlign: 'center', marginTop: Spacing.md, fontSize: FontSize.md },
});
