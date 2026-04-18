import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import { Screen } from '@components/layout/Screen';
import { NewsCard } from '@components/news/NewsCard';
import { EmptyState } from '@components/common/EmptyState';
import { useSearchNews } from '@hooks/useNews';
import { useDebounce } from '@hooks/useDebounce';
import { useBookmarksStore } from '@store/bookmarksStore';
import { colors } from '@theme/colors';
import { textStyles } from '@theme/typography';
import { spacing, radius } from '@theme/spacing';
import type { SearchStackParamList } from '@navigation/types';
import type { Article } from '@app-types/api';

type Props = StackScreenProps<SearchStackParamList, 'SearchFeed'>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const toggleBookmark = useBookmarksStore(s => s.toggleBookmark);
  const isBookmarked = useBookmarksStore(s => s.isBookmarked);

  const { data, isLoading, isError } = useSearchNews(debouncedQuery);

  const handleArticlePress = useCallback(
    (article: Article) => {
      navigation.navigate('Article', { article });
    },
    [navigation],
  );

  const articles = data?.articles ?? [];
  const showResults = debouncedQuery.trim().length >= 2;

  return (
    <Screen withSafeArea={false}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search US news..."
          placeholderTextColor={colors.textTertiary}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          accessibilityLabel="Search news articles"
          testID="search-input"
        />
      </View>

      {!showResults ? (
        <EmptyState
          emoji="🔍"
          title="Search US News"
          message="Enter at least 2 characters to search for articles."
          testID="search-idle-state"
        />
      ) : isLoading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <EmptyState
          emoji="⚠️"
          title="Search failed"
          message="Couldn't complete your search. Please try again."
        />
      ) : articles.length === 0 ? (
        <EmptyState
          emoji="📭"
          title="No results"
          message={`No articles found for "${debouncedQuery}".`}
        />
      ) : (
        <FlatList
          data={articles}
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
          keyboardShouldPersistTaps="handled"
          testID="search-results-list"
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...textStyles.body,
    color: colors.textPrimary,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  loader: {
    marginTop: spacing.xl,
  },
  list: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
});
