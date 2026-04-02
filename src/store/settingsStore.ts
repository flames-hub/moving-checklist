import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  isPro: boolean;
  notifyDaysBefore: number;
  notificationsEnabled: boolean;
  setIsPro: (value: boolean) => void;
  setNotifyDaysBefore: (days: number) => void;
  setNotificationsEnabled: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isPro: false,
      notifyDaysBefore: 1,
      notificationsEnabled: false,

      setIsPro: (value) => set({ isPro: value }),
      setNotifyDaysBefore: (days) => set({ notifyDaysBefore: days }),
      setNotificationsEnabled: (value) => set({ notificationsEnabled: value }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
