import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors } from '@theme/colors';
import { spacing, radius } from '@theme/spacing';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  style?: ViewStyle;
  testID?: string;
}

export function Badge({ label, variant = 'default', style, testID }: BadgeProps) {
  return (
    <View style={[styles.container, styles[variant], style]} testID={testID}>
      <Text style={[styles.text, styles[`text_${variant}` as keyof typeof styles]]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.xs,
    alignSelf: 'flex-start',
  },
  default: { backgroundColor: colors.categoryChipBg },
  primary: { backgroundColor: colors.primary },
  success: { backgroundColor: colors.success },
  warning: { backgroundColor: colors.warning },
  text: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  text_default: { color: colors.textSecondary },
  text_primary: { color: colors.textInverse },
  text_success: { color: colors.textInverse },
  text_warning: { color: colors.textInverse },
});
