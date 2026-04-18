import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Screen } from '@components/layout/Screen';
import { NewsCard } from '@components/news/NewsCard';
import { NewsCardSkeletonList } from '@components/news/NewsCardSkeleton';
import { CategoryFilter } from '@components/news/CategoryFilter';
import { EmptyState } from '@components/common/EmptyState';
import { useTopHeadlines } from '@hooks/useNews';
import { useBookmarksStore } from '@store/bookmarksStore';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import type { HomeStackParamList } from '@navigation/types';
import type { NewsCategory } from '@app-types/api';
import type { Article } from '@app-types/api';

type Props = StackScreenProps<HomeStackParamList, 'Feed'>;

export function HomeScreen({ navigation }: Props) {
  const [category, setCategory] = useState<NewsCategory>('general');
  const toggleBookmark = useBookmarksStore(s => s.toggleBookmark);
  const isBookmarked = useBookmarksStore(s => s.isBookmarked);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    isError,
    error,
  } = useTopHeadlines(category);

  const articles = data?.pages.flatMap(p => p.articles) ?? [];

  const handleArticlePress = useCallback(
    (article: Article) => {
      navigation.navigate('Article', { article });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback((item: Article) => item.url, []);

  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <NewsCard
        article={item}
        onPress={handleArticlePress}
        onBookmarkPress={toggleBookmark}
        isBookmarked={isBookmarked(item.url)}
        testID={`news-card-${item.url}`}
      />
    ),
    [handleArticlePress, toggleBookmark, isBookmarked],
  );

  const ListHeaderComponent = <CategoryFilter selected={category} onSelect={setCategory} />;

  const ListFooterComponent = isFetchingNextPage ? (
    <ActivityIndicator color={colors.primary} style={styles.loadMore} />
  ) : null;

  if (isLoading) {
    return (
      <Screen>
        <CategoryFilter selected={category} onSelect={setCategory} />
        <NewsCardSkeletonList count={5} />
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <CategoryFilter selected={category} onSelect={setCategory} />
        <EmptyState
          emoji="⚠️"
          title="Couldn't load news"
          message={
            error instanceof Error ? error.message : 'Something went wrong. Please try again.'
          }
          actionLabel="Retry"
          onAction={() => refetch()}
          testID="home-error-state"
        />
      </Screen>
    );
  }

  if (articles.length === 0) {
    return (
      <Screen>
        <CategoryFilter selected={category} onSelect={setCategory} />
        <EmptyState
          emoji="📭"
          title="No articles found"
          message="We couldn't find any articles for this category right now."
          actionLabel="Refresh"
          onAction={() => refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen withSafeArea={false}>
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={8}
        windowSize={10}
        initialNumToRender={5}
        testID="news-feed-list"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.xl,
  },
  loadMore: {
    marginVertical: spacing.lg,
  },
});
