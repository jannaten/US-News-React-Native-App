import '../mocks/server';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { fetchTopHeadlines, searchNews } from '../../src/services/api/newsApi';
import { NEWS_API_BASE_URL } from '../../src/constants/config';
import { mockArticle, mockArticle2 } from '../mocks/handlers';

describe('fetchTopHeadlines', () => {
  it('returns paginated articles on success', async () => {
    const result = await fetchTopHeadlines({ category: 'business' });

    expect(result.articles).toHaveLength(2);
    expect(result.articles[0].url).toBe(mockArticle.url);
    expect(result.page).toBe(1);
    expect(result.totalResults).toBe(2);
    expect(result.hasNextPage).toBe(false);
  });

  it('uses default params when none provided', async () => {
    const result = await fetchTopHeadlines();
    expect(result.articles).toHaveLength(2);
  });

  it('throws ApiError on API failure', async () => {
    server.use(
      http.get(`${NEWS_API_BASE_URL}/top-headlines`, () =>
        HttpResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 }),
      ),
    );

    await expect(fetchTopHeadlines()).rejects.toThrow();
  });

  it('sets hasNextPage=true when more results exist', async () => {
    server.use(
      http.get(`${NEWS_API_BASE_URL}/top-headlines`, () =>
        HttpResponse.json({ status: 'ok', totalResults: 60, articles: [mockArticle, mockArticle2] }),
      ),
    );

    const result = await fetchTopHeadlines({ page: 1, pageSize: 20 });
    expect(result.hasNextPage).toBe(true);
  });
});

describe('searchNews', () => {
  it('returns search results', async () => {
    const result = await searchNews('bitcoin');
    expect(result.articles).toBeDefined();
    expect(Array.isArray(result.articles)).toBe(true);
  });
});
