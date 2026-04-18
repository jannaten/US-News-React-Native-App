import { useBookmarksStore } from '@store/bookmarksStore';
import type { Article } from '@app-types/api';

export function useBookmarks() {
  const bookmarks = useBookmarksStore(s => s.bookmarks);
  const isBookmarked = useBookmarksStore(s => s.isBookmarked);
  const toggleBookmark = useBookmarksStore(s => s.toggleBookmark);
  const isHydrated = useBookmarksStore(s => s.isHydrated);

  return { bookmarks, isBookmarked, toggleBookmark, isHydrated };
}

export function useIsBookmarked(article: Article) {
  return useBookmarksStore(s => s.isBookmarked(article.url));
}
