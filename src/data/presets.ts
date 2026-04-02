import { presetsJa } from './presets_ja';
import { presetsEn } from './presets_en';
import { PresetTask } from './presets_ja';

export function getPresets(region: 'jp' | 'global'): PresetTask[] {
  return region === 'jp' ? presetsJa : presetsEn;
}
