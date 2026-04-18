import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchTopHeadlines, searchNews } from '@services/api/newsApi';
import type { NewsCategory } from '@app-types/api';

export const NEWS_QUERY_KEYS = {
  headlines: (category: NewsCategory) => ['news', 'headlines', category] as const,
  search: (query: string) => ['news', 'search', query] as const,
} as const;

const STALE_TIME = 5 * 60 * 1000; // 5 min
const GC_TIME = 15 * 60 * 1000; // 15 min (v5: cacheTime → gcTime)

export function useTopHeadlines(category: NewsCategory = 'general') {
  return useInfiniteQuery({
    queryKey: NEWS_QUERY_KEYS.headlines(category),
    // v5: initialPageParam is required
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchTopHeadlines({ category, page: pageParam as number }),
    getNextPageParam: lastPage => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 2,
  });
}

export function useSearchNews(query: string) {
  return useQuery({
    queryKey: NEWS_QUERY_KEYS.search(query),
    queryFn: () => searchNews(query),
    enabled: query.trim().length >= 2,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    retry: 1,
  });
}
