import axios, { AxiosError, type AxiosInstance } from 'axios';
import { NEWS_API_BASE_URL, NEWS_API_KEY } from '@constants/config';
import { logger } from '@utils/logger';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: NEWS_API_BASE_URL,
    timeout: 10_000,
    headers: {
      'X-Api-Key': NEWS_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(config => {
    logger.debug('API request', { url: config.url, params: config.params });
    return config;
  });

  client.interceptors.response.use(
    response => {
      logger.debug('API response', {
        url: response.config.url,
        status: response.status,
      });
      return response;
    },
    (error: AxiosError) => {
      const statusCode = error.response?.status;
      const data = error.response?.data as { message?: string; code?: string } | undefined;
      const message = data?.message ?? error.message ?? 'An unexpected error occurred';
      const code = data?.code;

      logger.error('API error', { statusCode, message, url: error.config?.url });

      throw new ApiError(message, statusCode, code);
    },
  );

  return client;
}

export const apiClient = createApiClient();
