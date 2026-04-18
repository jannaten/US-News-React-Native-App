import React, { useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Badge } from '@components/common/Badge';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing, radius, layout } from '@theme/spacing';
import { shadows } from '@theme/shadows';
import { getRelativeTime } from '@utils/date';
import type { Article } from '@app-types/api';

interface NewsCardProps {
  article: Article;
  categoryLabel?: string;
  onPress: (article: Article) => void;
  onBookmarkPress?: (article: Article) => void;
  isBookmarked?: boolean;
  testID?: string;
}

export function NewsCard({
  article,
  categoryLabel,
  onPress,
  onBookmarkPress,
  isBookmarked = false,
  testID,
}: NewsCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
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
      onPress={() => onPress(article)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={article.title}
      accessibilityHint="Opens article detail"
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            resizeMode="cover"
            accessibilityElementsHidden
          />
        ) : null}

        <View style={styles.content}>
          <View style={styles.metaRow}>
            {categoryLabel ? (
              <Badge label={categoryLabel} variant="primary" style={styles.badge} />
            ) : null}
            <View style={styles.sourceRow}>
              <Text style={styles.source} numberOfLines={1}>
                {article.source.name}
              </Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.time}>{getRelativeTime(article.publishedAt)}</Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={3}>
            {article.title}
          </Text>

          {article.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {article.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            {article.author ? (
              <Text style={styles.author} numberOfLines={1}>
                {article.author}
              </Text>
            ) : (
              <View />
            )}
            {onBookmarkPress ? (
              <TouchableWithoutFeedback
                onPress={() => onBookmarkPress(article)}
                accessibilityRole="button"
                accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                testID={`bookmark-btn-${article.url}`}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <View style={styles.bookmarkBtn}>
                  <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkActive]}>
                    {isBookmarked ? '★' : '☆'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
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
  image: {
    width: '100%',
    height: layout.newsCardImageHeight,
    backgroundColor: colors.imagePlaceholder,
  },
  content: { padding: layout.cardPadding },
  metaRow: { marginBottom: spacing.sm },
  badge: { marginBottom: spacing.xs },
  sourceRow: { flexDirection: 'row', alignItems: 'center' },
  source: { ...textStyles.captionBold, color: colors.primary, flex: 1 },
  dot: { ...textStyles.caption, color: colors.textTertiary, marginHorizontal: 4 },
  time: { ...textStyles.caption, color: colors.textTertiary },
  title: {
    ...textStyles.titleMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: 24,
  },
  description: {
    ...textStyles.caption,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  author: { ...textStyles.caption, color: colors.textTertiary, flex: 1, fontStyle: 'italic' },
  bookmarkBtn: { padding: spacing.xs },
  bookmarkIcon: { fontSize: 20, color: colors.bookmarkInactive },
  bookmarkActive: { color: colors.bookmarkActive },
});
