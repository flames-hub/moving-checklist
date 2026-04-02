import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';

const REVENUECAT_API_KEY = Platform.select({
  ios: 'appl_XXXXXXXXXXXXXXX', // RevenueCatダッシュボードから取得
  android: 'goog_XXXXXXXXXXXXXXX',
}) ?? '';

export default function App() {
  useEffect(() => {
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
