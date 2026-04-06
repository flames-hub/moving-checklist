import { Themes, ThemePalette } from '../constants/theme';
import { useSettingsStore } from '../store/settingsStore';

export function useTheme(): ThemePalette {
  const themeKey = useSettingsStore((s) => s.themeKey);
  return Themes[themeKey];
}
