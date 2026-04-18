import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@components/common/Skeleton';
import { colors } from '@theme/colors';
import { spacing, radius, layout } from '@theme/spacing';
import { shadows } from '@theme/shadows';

export function NewsCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton height={layout.newsCardImageHeight} borderRadius={0} />
      <View style={styles.content}>
        <Skeleton width={80} height={20} style={styles.badge} />
        <Skeleton width="60%" height={12} style={styles.source} />
        <Skeleton width="100%" height={18} style={styles.titleLine1} />
        <Skeleton width="85%" height={18} style={styles.titleLine2} />
        <Skeleton width="100%" height={13} style={styles.desc1} />
        <Skeleton width="70%" height={13} />
      </View>
    </View>
  );
}

export function NewsCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginHorizontal: layout.screenPaddingHorizontal,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  content: { padding: layout.cardPadding },
  badge: { marginBottom: spacing.sm },
  source: { marginBottom: spacing.sm },
  titleLine1: { marginBottom: spacing.xs },
  titleLine2: { marginBottom: spacing.sm },
  desc1: { marginBottom: spacing.xs },
});
