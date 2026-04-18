import { act, renderHook } from '@testing-library/react-native';
import { useBookmarksStore } from '../../src/store/bookmarksStore';
import { mockArticle, mockArticle2 } from '../mocks/handlers';

beforeEach(() => {
  // Reset Zustand store state between tests
  useBookmarksStore.setState({ bookmarks: [], isHydrated: false });
});

describe('useBookmarksStore', () => {
  describe('addBookmark', () => {
    it('adds an article to bookmarks', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => {
        result.current.addBookmark(mockArticle);
      });

      expect(result.current.bookmarks).toHaveLength(1);
      expect(result.current.bookmarks[0].url).toBe(mockArticle.url);
    });

    it('does not add duplicate bookmarks', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => {
        result.current.addBookmark(mockArticle);
        result.current.addBookmark(mockArticle);
      });

      expect(result.current.bookmarks).toHaveLength(1);
    });

    it('prepends new bookmarks to the front of the list', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => {
        result.current.addBookmark(mockArticle);
        result.current.addBookmark(mockArticle2);
      });

      expect(result.current.bookmarks[0].url).toBe(mockArticle2.url);
    });
  });

  describe('removeBookmark', () => {
    it('removes an article from bookmarks', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => {
        result.current.addBookmark(mockArticle);
        result.current.removeBookmark(mockArticle.url);
      });

      expect(result.current.bookmarks).toHaveLength(0);
    });

    it('does not throw when removing a non-existent bookmark', () => {
      const { result } = renderHook(() => useBookmarksStore());

      expect(() => {
        act(() => {
          result.current.removeBookmark('https://non-existent.com');
        });
      }).not.toThrow();
    });
  });

  describe('isBookmarked', () => {
    it('returns true for a bookmarked article', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => { result.current.addBookmark(mockArticle); });

      expect(result.current.isBookmarked(mockArticle.url)).toBe(true);
    });

    it('returns false for a non-bookmarked article', () => {
      const { result } = renderHook(() => useBookmarksStore());
      expect(result.current.isBookmarked(mockArticle.url)).toBe(false);
    });
  });

  describe('toggleBookmark', () => {
    it('adds a bookmark when article is not bookmarked', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => { result.current.toggleBookmark(mockArticle); });

      expect(result.current.isBookmarked(mockArticle.url)).toBe(true);
    });

    it('removes a bookmark when article is already bookmarked', () => {
      const { result } = renderHook(() => useBookmarksStore());

      act(() => {
        result.current.addBookmark(mockArticle);
        result.current.toggleBookmark(mockArticle);
      });

      expect(result.current.isBookmarked(mockArticle.url)).toBe(false);
    });
  });
});
