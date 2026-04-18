import AsyncStorageModule from '@react-native-async-storage/async-storage';
import { logger } from '@utils/logger';

type AsyncStorageType = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

const nullStorage: AsyncStorageType = {
  getItem: async () => null,
  setItem: async () => undefined,
  removeItem: async () => undefined,
};

function getAsyncStorage(): AsyncStorageType {
  if (AsyncStorageModule) return AsyncStorageModule;
  logger.warn('AsyncStorage not available — persistence disabled');
  return nullStorage;
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await getAsyncStorage().getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    logger.error('Storage.getItem failed', { key, error: String(error) });
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await getAsyncStorage().setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error('Storage.setItem failed', { key, error: String(error) });
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await getAsyncStorage().removeItem(key);
  } catch (error) {
    logger.error('Storage.removeItem failed', { key, error: String(error) });
  }
}

export const STORAGE_KEYS = {
  BOOKMARKS: '@usnews/bookmarks',
} as const;
