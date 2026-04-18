import { create } from 'zustand';
import type { Article } from '@app-types/api';
import { getItem, setItem, STORAGE_KEYS } from '@services/storage/storage';
import { logger } from '@utils/logger';

interface BookmarksState {
  bookmarks: Article[];
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  addBookmark: (article: Article) => void;
  removeBookmark: (articleUrl: string) => void;
  isBookmarked: (articleUrl: string) => boolean;
  toggleBookmark: (article: Article) => void;
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [],
  isHydrated: false,

  hydrate: async () => {
    const stored = await getItem<Article[]>(STORAGE_KEYS.BOOKMARKS);
    set({ bookmarks: stored ?? [], isHydrated: true });
    logger.debug('Bookmarks hydrated', { count: stored?.length ?? 0 });
  },

  addBookmark: (article: Article) => {
    const { bookmarks } = get();
    if (bookmarks.some(b => b.url === article.url)) return;

    const updated = [article, ...bookmarks];
    set({ bookmarks: updated });
    setItem(STORAGE_KEYS.BOOKMARKS, updated);
    logger.info('Bookmark added', { title: article.title });
  },

  removeBookmark: (articleUrl: string) => {
    const { bookmarks } = get();
    const updated = bookmarks.filter(b => b.url !== articleUrl);
    set({ bookmarks: updated });
    setItem(STORAGE_KEYS.BOOKMARKS, updated);
    logger.info('Bookmark removed', { url: articleUrl });
  },

  isBookmarked: (articleUrl: string) => {
    return get().bookmarks.some(b => b.url === articleUrl);
  },

  toggleBookmark: (article: Article) => {
    const { isBookmarked, addBookmark, removeBookmark } = get();
    if (isBookmarked(article.url)) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  },
}));
