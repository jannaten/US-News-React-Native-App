import { http, HttpResponse } from 'msw';
import { NEWS_API_BASE_URL } from '../../src/constants/config';
import type { NewsApiResponse } from '../../src/types/api';

export const mockArticle = {
  source: { id: 'bbc-news', name: 'BBC News' },
  author: 'Jane Doe',
  title: 'Test Article Title',
  description: 'Test article description that is meaningful.',
  url: 'https://bbc.com/news/test-article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  content: 'Full article content here.',
};

export const mockArticle2 = {
  source: { id: 'cnn', name: 'CNN' },
  author: null,
  title: 'Second Test Article',
  description: null,
  url: 'https://cnn.com/news/second-article',
  urlToImage: null,
  publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  content: null,
};

const successResponse: NewsApiResponse = {
  status: 'ok',
  totalResults: 2,
  articles: [mockArticle, mockArticle2],
};

export const handlers = [
  http.get(`${NEWS_API_BASE_URL}/top-headlines`, () =>
    HttpResponse.json(successResponse),
  ),
];

export const errorHandlers = [
  http.get(`${NEWS_API_BASE_URL}/top-headlines`, () =>
    HttpResponse.json(
      { status: 'error', code: 'apiKeyInvalid', message: 'Your API key is invalid.' },
      { status: 401 },
    ),
  ),
];
