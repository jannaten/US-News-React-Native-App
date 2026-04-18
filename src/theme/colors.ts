export const palette = {
  navy900: '#0A0E1A',
  navy800: '#141929',
  navy700: '#1E2540',
  slate600: '#2D3561',
  slate500: '#3D4A7A',
  crimson500: '#DC2626',
  crimson400: '#EF4444',
  crimson300: '#FCA5A5',
  blue500: '#3B82F6',
  blue400: '#60A5FA',
  emerald500: '#10B981',
  amber500: '#F59E0B',
  amber400: '#FCD34D',
  neutral50: '#F9FAFB',
  neutral100: '#F3F4F6',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral800: '#1F2937',
  neutral900: '#111827',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const colors = {
  background: palette.neutral50,
  surface: palette.white,
  surfaceElevated: palette.white,
  border: palette.neutral200,
  borderLight: palette.neutral100,

  textPrimary: palette.neutral900,
  textSecondary: palette.neutral500,
  textTertiary: palette.neutral400,
  textInverse: palette.white,

  primary: palette.crimson500,
  primaryLight: palette.crimson300,
  primaryDark: '#B91C1C',

  accent: palette.blue500,
  success: palette.emerald500,
  warning: palette.amber500,
  error: palette.crimson400,

  headerBg: palette.navy900,
  headerText: palette.white,
  tabBar: palette.white,
  tabBarActive: palette.crimson500,
  tabBarInactive: palette.neutral400,

  skeletonBase: palette.neutral200,
  skeletonHighlight: palette.neutral100,

  categoryChipBg: palette.neutral100,
  categoryChipActiveBg: palette.navy900,
  categoryChipText: palette.neutral600,
  categoryChipActiveText: palette.white,

  overlay: 'rgba(0,0,0,0.5)',
  imagePlaceholder: palette.neutral200,

  bookmarkActive: palette.amber500,
  bookmarkInactive: palette.neutral400,

  white: palette.white,
  transparent: palette.transparent,
} as const;

export type ColorToken = keyof typeof colors;
