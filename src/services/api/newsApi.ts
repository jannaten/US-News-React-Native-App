import { apiClient } from './client';
import { DEFAULT_COUNTRY, DEFAULT_PAGE_SIZE } from '@constants/config';
import type { NewsApiResponse, FetchHeadlinesParams, PaginatedArticles } from '@app-types/api';

export async function fetchTopHeadlines(
  params: FetchHeadlinesParams = {},
): Promise<PaginatedArticles> {
  const { category = 'general', page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;

  const { data } = await apiClient.get<NewsApiResponse>('/top-headlines', {
    params: {
      country: DEFAULT_COUNTRY,
      category,
      page,
      pageSize,
    },
  });

  if (data.status !== 'ok') {
    throw new Error(data.message ?? 'News API returned an error status');
  }

  // NewsAPI free tier returns a max of 100 results; cap accordingly
  const effectiveTotalResults = Math.min(data.totalResults, 100);

  return {
    articles: data.articles,
    totalResults: effectiveTotalResults,
    page,
    hasNextPage: page * pageSize < effectiveTotalResults,
  };
}

export async function searchNews(
  query: string,
  params: Omit<FetchHeadlinesParams, 'category'> = {},
): Promise<PaginatedArticles> {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;

  const { data } = await apiClient.get<NewsApiResponse>('/top-headlines', {
    params: {
      country: DEFAULT_COUNTRY,
      q: query,
      page,
      pageSize,
    },
  });

  if (data.status !== 'ok') {
    throw new Error(data.message ?? 'News API returned an error status');
  }

  const effectiveTotalResults = Math.min(data.totalResults, 100);

  return {
    articles: data.articles,
    totalResults: effectiveTotalResults,
    page,
    hasNextPage: page * pageSize < effectiveTotalResults,
  };
}
