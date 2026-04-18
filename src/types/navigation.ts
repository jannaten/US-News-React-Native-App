import type { Article } from './api';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Bookmarks: undefined;
};

export type HomeStackParamList = {
  Feed: undefined;
  Article: { article: Article };
};

export type SearchStackParamList = {
  SearchFeed: undefined;
  Article: { article: Article };
};

export type BookmarksStackParamList = {
  BookmarksFeed: undefined;
  Article: { article: Article };
};
