import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeKey } from '../constants/theme';

interface SettingsState {
  isPro: boolean;
  notifyDaysBefore: number;
  notificationsEnabled: boolean;
  themeKey: ThemeKey;
  setIsPro: (value: boolean) => void;
  setNotifyDaysBefore: (days: number) => void;
  setNotificationsEnabled: (value: boolean) => void;
  setThemeKey: (key: ThemeKey) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isPro: true,
      notifyDaysBefore: 1,
      notificationsEnabled: false,
      themeKey: 'rose',

      setIsPro: (value) => set({ isPro: value }),
      setNotifyDaysBefore: (days) => set({ notifyDaysBefore: days }),
      setNotificationsEnabled: (value) => set({ notificationsEnabled: value }),
      setThemeKey: (key) => set({ themeKey: key }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
