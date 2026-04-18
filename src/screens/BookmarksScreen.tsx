import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Screen } from '@components/layout/Screen';
import { NewsCard } from '@components/news/NewsCard';
import { EmptyState } from '@components/common/EmptyState';
import { useBookmarksStore } from '@store/bookmarksStore';
import { spacing } from '@theme/spacing';
import type { BookmarksStackParamList } from '@navigation/types';
import type { Article } from '@app-types/api';

type Props = StackScreenProps<BookmarksStackParamList, 'BookmarksFeed'>;

export function BookmarksScreen({ navigation }: Props) {
  const bookmarks = useBookmarksStore(s => s.bookmarks);
  const toggleBookmark = useBookmarksStore(s => s.toggleBookmark);
  const isBookmarked = useBookmarksStore(s => s.isBookmarked);

  const handleArticlePress = useCallback(
    (article: Article) => {
      navigation.navigate('Article', { article });
    },
    [navigation],
  );

  if (bookmarks.length === 0) {
    return (
      <Screen>
        <EmptyState
          emoji="★"
          title="No saved articles yet"
          message="Tap the star on any article to save it for later reading."
          testID="bookmarks-empty-state"
        />
      </Screen>
    );
  }

  return (
    <Screen withSafeArea={false}>
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={handleArticlePress}
            onBookmarkPress={toggleBookmark}
            isBookmarked={isBookmarked(item.url)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        testID="bookmarks-list"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
});
