import React, { type ErrorInfo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing } from '@theme/spacing';
import { logger } from '@utils/logger';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
  return (
    <View style={styles.container} testID="error-boundary-fallback">
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={resetErrorBoundary}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

function onError(error: unknown, info: ErrorInfo) {
  const err = error instanceof Error ? error : new Error(String(error));
  logger.error('Uncaught render error', {
    message: err.message,
    stack: err.stack,
    componentStack: info.componentStack ?? '',
  });
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

export function AppErrorBoundary({ children, onReset }: AppErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={onError} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    ...textStyles.title,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...textStyles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  buttonText: {
    ...textStyles.bodyMedium,
    color: colors.textInverse,
  },
});
