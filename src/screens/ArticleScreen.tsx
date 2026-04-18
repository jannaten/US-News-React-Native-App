import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Button } from '@components/common/Button';
import { Badge } from '@components/common/Badge';
import { useBookmarksStore } from '@store/bookmarksStore';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing, layout } from '@theme/spacing';
import { formatDateTime } from '@utils/date';
import { logger } from '@utils/logger';
import type { HomeStackParamList } from '@navigation/types';

type Props = StackScreenProps<HomeStackParamList, 'Article'>;

const HEADER_MAX_HEIGHT = layout.newsCardImageHeight + 20;
const HEADER_MIN_HEIGHT = layout.headerHeight;

export function ArticleScreen({ route, navigation }: Props) {
  const { article } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const toggleBookmark = useBookmarksStore(s => s.toggleBookmark);
  const isBookmarked = useBookmarksStore(s => s.isBookmarked(article.url));

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: Platform.OS === 'ios' ? article.title : `${article.title}\n\n${article.url}`,
        url: Platform.OS === 'ios' ? article.url : undefined,
        title: article.title,
      });
    } catch (err) {
      logger.error('Share failed', { error: String(err) });
    }
  }, [article]);

  const handleOpenInBrowser = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(article.url);
      if (canOpen) {
        await Linking.openURL(article.url);
      }
    } catch (err) {
      logger.error('Failed to open URL', { url: article.url, error: String(err) });
    }
  }, [article.url]);

  // Clean truncation marker from NewsAPI content
  const cleanContent = article.content
    ? article.content.replace(/\[\+\d+ chars\]$/, '').trim()
    : null;

  return (
    <View style={styles.container}>
      {/* Parallax header image */}
      {article.urlToImage ? (
        <Animated.Image
          source={{ uri: article.urlToImage }}
          style={[styles.headerImage, { opacity: imageOpacity }]}
          resizeMode="cover"
          accessibilityElementsHidden
        />
      ) : (
        <View style={[styles.headerImage, styles.headerImagePlaceholder]} />
      )}

      {/* Header actions overlay */}
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.iconBtnText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Share article"
          >
            <Text style={styles.iconBtnText}>↑</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => toggleBookmark(article)}
            accessibilityRole="button"
            accessibilityLabel={isBookmarked ? 'Remove from bookmarks' : 'Save to bookmarks'}
            testID="article-bookmark-btn"
          >
            <Text style={[styles.iconBtnText, isBookmarked && styles.bookmarkActive]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for image */}
        <View style={styles.imageSpacer} />

        {/* Article content card */}
        <View style={styles.contentCard}>
          <Badge label={article.source.name} variant="primary" style={styles.sourceBadge} />

          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.meta}>
            {article.author ? <Text style={styles.author}>By {article.author}</Text> : null}
            <Text style={styles.date}>{formatDateTime(article.publishedAt)}</Text>
          </View>

          {article.description ? (
            <Text style={styles.description}>{article.description}</Text>
          ) : null}

          {cleanContent ? (
            <>
              <View style={styles.divider} />
              <Text style={styles.content}>{cleanContent}</Text>
            </>
          ) : null}

          <View style={styles.cta}>
            <Button
              label="Read Full Article"
              onPress={handleOpenInBrowser}
              variant="primary"
              size="lg"
              style={styles.ctaButton}
              accessibilityHint="Opens article in your browser"
            />
            <Text style={styles.ctaNote}>Opens in external browser</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: colors.imagePlaceholder,
  },
  headerImagePlaceholder: {
    backgroundColor: colors.headerBg,
  },
  headerActions: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  bookmarkActive: {
    color: colors.bookmarkActive,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  imageSpacer: {
    height: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    minHeight: 500,
  },
  sourceBadge: {
    marginBottom: spacing.md,
  },
  title: {
    ...textStyles.headline,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  meta: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  author: {
    ...textStyles.captionBold,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  date: {
    ...textStyles.caption,
    color: colors.textTertiary,
  },
  description: {
    ...textStyles.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  content: {
    ...textStyles.body,
    color: colors.textPrimary,
    lineHeight: 26,
  },
  cta: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  ctaButton: {
    alignSelf: 'stretch',
  },
  ctaNote: {
    ...textStyles.caption,
    color: colors.textTertiary,
    marginTop: spacing.sm,
  },
});
