import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type {
  HomeStackParamList,
  SearchStackParamList,
  BookmarksStackParamList,
  RootTabParamList,
} from '@app-types/navigation';

// Re-export param lists
export type { RootTabParamList, HomeStackParamList, SearchStackParamList, BookmarksStackParamList };

// Composed screen prop types for each screen
export type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'Feed'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type ArticleScreenProps =
  | StackScreenProps<HomeStackParamList, 'Article'>
  | StackScreenProps<SearchStackParamList, 'Article'>
  | StackScreenProps<BookmarksStackParamList, 'Article'>;

export type SearchScreenProps = CompositeScreenProps<
  StackScreenProps<SearchStackParamList, 'SearchFeed'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type BookmarksScreenProps = CompositeScreenProps<
  StackScreenProps<BookmarksStackParamList, 'BookmarksFeed'>,
  BottomTabScreenProps<RootTabParamList>
>;
