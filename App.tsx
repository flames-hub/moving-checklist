import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Purchases from './src/utils/purchases';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';

const REVENUECAT_API_KEY = Platform.select({
  ios: 'appl_XXXXXXXXXXXXXXX',
  android: 'goog_XXXXXXXXXXXXXXX',
}) ?? '';

export default function App() {
  useEffect(() => {
    const isPlaceholder = !REVENUECAT_API_KEY || REVENUECAT_API_KEY.includes('XXXX');
    if (!isPlaceholder) {
      Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
