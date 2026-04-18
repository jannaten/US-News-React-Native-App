import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { AppNavigator } from '@navigation/AppNavigator';
import { AppErrorBoundary } from '@components/layout/ErrorBoundary';
import { useBookmarksStore } from '@store/bookmarksStore';
import { logger } from '@utils/logger';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
  },
});

function AppContent() {
  const hydrate = useBookmarksStore(s => s.hydrate);

  useEffect(() => {
    hydrate().catch(err => {
      logger.error('Failed to hydrate bookmarks store', { error: String(err) });
    });
  }, [hydrate]);

  return <AppNavigator />;
}

export default function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.root}>
            <AppContent />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
