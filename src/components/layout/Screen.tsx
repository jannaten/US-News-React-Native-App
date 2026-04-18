import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@theme/colors';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withSafeArea?: boolean;
  testID?: string;
}

export function Screen({ children, style, withSafeArea = true, testID }: ScreenProps) {
  const content = (
    <View style={[styles.inner, style]} testID={testID}>
      {children}
    </View>
  );

  if (withSafeArea) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        {content}
      </SafeAreaView>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
  },
});
