// ── 4 selectable themes ──
// rose   = Terra   (warm cream × terracotta)
// lemon  = Sage    (parchment × botanical green)
// sky    = Indigo  (cool wash × editorial blue)
// dark   = Dark    (DESIGN.md "Quiet Precision")

export type ThemeKey = 'rose' | 'lemon' | 'sky' | 'dark';

export interface ThemePalette {
  primary: string;
  primarySoft: string;
  accent: string;
  background: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success: string;
  successSoft: string;
  warning: string;
  error: string;
  errorSoft: string;
  categoryProcedures: string;
  categoryPacking: string;
  categoryCancellation: string;
  categoryNewHome: string;
  categoryOther: string;
  tabBar: string;
  tabBarBorder: string;
}

// ── Terra ─────────────────────────────────────────────────────────────────
// Warm cream parchment, terracotta ink. Feels like a handmade planner.
const rose: ThemePalette = {
  primary:            '#B8522E',
  primarySoft:        'rgba(184,82,46,0.10)',
  accent:             '#D07048',
  background:         '#F2EBE2',
  surface:            '#FAF6F1',
  surfaceRaised:      '#FFFFFF',
  text:               '#2A1E16',
  textSecondary:      '#8A7060',
  border:             'rgba(42,30,22,0.10)',
  shadow:             'rgba(42,30,22,0.06)',
  success:            '#4A8558',
  successSoft:        'rgba(74,133,88,0.12)',
  warning:            '#C87030',
  error:              '#C03535',
  errorSoft:          'rgba(192,53,53,0.10)',
  categoryProcedures: '#8260B0',
  categoryPacking:    '#C07030',
  categoryCancellation: '#C04040',
  categoryNewHome:    '#3A9AAA',
  categoryOther:      '#8A7060',
  tabBar:             '#FFFFFF',
  tabBarBorder:       'rgba(42,30,22,0.08)',
};

// ── Sage ──────────────────────────────────────────────────────────────────
// Cool herbal green on off-white. Like a botanical field notes.
const lemon: ThemePalette = {
  primary:            '#38664A',
  primarySoft:        'rgba(56,102,74,0.10)',
  accent:             '#527B60',
  background:         '#EAF0E6',
  surface:            '#F5FAF3',
  surfaceRaised:      '#FFFFFF',
  text:               '#182618',
  textSecondary:      '#587850',
  border:             'rgba(24,38,24,0.10)',
  shadow:             'rgba(24,38,24,0.06)',
  success:            '#38664A',
  successSoft:        'rgba(56,102,74,0.12)',
  warning:            '#B87830',
  error:              '#B54040',
  errorSoft:          'rgba(181,64,64,0.10)',
  categoryProcedures: '#6A68B8',
  categoryPacking:    '#B87030',
  categoryCancellation: '#B54040',
  categoryNewHome:    '#2A8A74',
  categoryOther:      '#587850',
  tabBar:             '#FFFFFF',
  tabBarBorder:       'rgba(24,38,24,0.08)',
};

// ── Indigo ────────────────────────────────────────────────────────────────
// Clean blue-white, strong indigo ink. Editorial confidence.
const sky: ThemePalette = {
  primary:            '#2648A8',
  primarySoft:        'rgba(38,72,168,0.10)',
  accent:             '#4468C0',
  background:         '#E6EDF8',
  surface:            '#F1F6FC',
  surfaceRaised:      '#FFFFFF',
  text:               '#14203A',
  textSecondary:      '#4C6888',
  border:             'rgba(20,32,58,0.10)',
  shadow:             'rgba(20,32,58,0.06)',
  success:            '#286E50',
  successSoft:        'rgba(40,110,80,0.12)',
  warning:            '#B87830',
  error:              '#AA3535',
  errorSoft:          'rgba(170,53,53,0.10)',
  categoryProcedures: '#7060B8',
  categoryPacking:    '#B87030',
  categoryCancellation: '#AA3535',
  categoryNewHome:    '#2880B0',
  categoryOther:      '#4C6888',
  tabBar:             '#FFFFFF',
  tabBarBorder:       'rgba(20,32,58,0.08)',
};

// ── Dark ──────────────────────────────────────────────────────────────────
// DESIGN.md "Quiet Precision" — warm black, amber accent.
const dark: ThemePalette = {
  primary:            '#f59e0b',
  primarySoft:        'rgba(245,158,11,0.15)',
  accent:             '#fbbf24',
  background:         '#0b0a09',
  surface:            '#161513',
  surfaceRaised:      '#1e1d1b',
  text:               '#f2f0ec',
  textSecondary:      '#a8a29e',
  border:             'rgba(255,255,255,0.10)',
  shadow:             '#000000',
  success:            '#22c55e',
  successSoft:        'rgba(34,197,94,0.12)',
  warning:            '#f59e0b',
  error:              '#ef4444',
  errorSoft:          'rgba(239,68,68,0.12)',
  categoryProcedures: '#a78bfa',
  categoryPacking:    '#fb923c',
  categoryCancellation: '#f87171',
  categoryNewHome:    '#38bdf8',
  categoryOther:      '#a8a29e',
  tabBar:             '#161513',
  tabBarBorder:       'rgba(255,255,255,0.06)',
};

export const Themes: Record<ThemeKey, ThemePalette> = { rose, lemon, sky, dark };

// Theme metadata for the picker (uses Ionicons names)
export const ThemeMeta: { key: ThemeKey; iconName: string }[] = [
  { key: 'rose',  iconName: 'flame-outline' },
  { key: 'lemon', iconName: 'leaf-outline' },
  { key: 'sky',   iconName: 'compass-outline' },
  { key: 'dark',  iconName: 'moon-outline' },
];

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 21,
  xxl: 28,
  hero: 52,
};

export const BorderRadius = {
  sm:   6,
  md:   10,
  lg:   14,
  xl:   20,
  full: 9999,
};

export const Shadow = {
  card: {
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius:  4,
    elevation:     1,
  },
  raised: {
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius:  12,
    elevation:     4,
  },
  soft: {
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius:  3,
    elevation:     1,
  },
};
