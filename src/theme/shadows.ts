import { Platform } from 'react-native';

const createShadow = (elevation: number, opacity: number, radius: number, offsetY: number) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
  }) ?? {};

export const shadows = {
  none: {},
  sm: createShadow(2, 0.06, 2, 1),
  md: createShadow(4, 0.08, 4, 2),
  lg: createShadow(8, 0.1, 8, 4),
  xl: createShadow(16, 0.12, 16, 8),
} as const;
