import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing, radius } from '@theme/spacing';
import { shadows } from '@theme/shadows';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityHint?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  testID,
  accessibilityHint,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Animated.View
        style={[
          styles.base,
          styles[variant],
          styles[`size_${size}` as keyof typeof styles],
          disabled && styles.disabled,
          style,
          { transform: [{ scale }] },
        ]}
      >
        <Text
          style={[
            labelStyles.label,
            labelStyles[`label_${variant}` as keyof typeof labelStyles],
            labelStyles[`labelSize_${size}` as keyof typeof labelStyles],
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    ...shadows.sm,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
  ghost: { backgroundColor: colors.transparent },
  danger: { backgroundColor: colors.error },
  disabled: { opacity: 0.5 },
  size_sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, minHeight: 32 },
  size_md: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 44 },
  size_lg: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, minHeight: 52 },
});

const labelStyles = StyleSheet.create({
  label: { ...textStyles.bodyMedium },
  label_primary: { color: colors.textInverse },
  label_secondary: { color: colors.textPrimary },
  label_ghost: { color: colors.primary },
  label_danger: { color: colors.textInverse },
  labelSize_sm: { fontSize: 13 },
  labelSize_md: { fontSize: 15 },
  labelSize_lg: { fontSize: 17 },
});
