# US News — React Native

A production-grade React Native news application showcasing modern mobile engineering practices. Built from the ground up with TypeScript, React Query, Zustand, a custom design system, comprehensive tests, and CI/CD.

---

## Screenshots & Features

| Home Feed | Article Detail | Search | Bookmarks |
|---|---|---|---|
| Category filtering, infinite scroll, pull-to-refresh, skeleton loading | Parallax hero image, share/bookmark, full content | Debounced live search, empty states | Persisted bookmarks with AsyncStorage |

---

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Language | TypeScript (strict) | Catch bugs at compile time, self-documenting APIs |
| Navigation | React Navigation v6 (stack + bottom tabs) | Industry standard, typed param lists |
| Server state | TanStack React Query v5 | Caching, background refetch, infinite scroll built-in |
| Client state | Zustand v5 | Minimal boilerplate, selector-based re-renders |
| Persistence | AsyncStorage via custom storage wrapper | Resilient, falls back gracefully in test env |
| HTTP | Axios with interceptors | Unified error handling, request/response logging |
| Testing | Jest + React Native Testing Library + MSW | Unit, integration, and API-mock tests |
| CI/CD | GitHub Actions | Typecheck → lint → format → test on every push |
| Error handling | react-error-boundary | Prevents white-screen crashes, logs to monitoring |

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Design system primitives: Button, Badge, Skeleton, EmptyState
│   ├── news/            # Domain components: NewsCard, NewsCardSkeleton, CategoryFilter
│   └── layout/          # Screen wrapper, AppErrorBoundary
├── constants/           # config.ts (API key), categories.ts
├── hooks/               # useNews (React Query), useBookmarks, useDebounce
├── navigation/          # AppNavigator (tabs + stacks), typed param lists
├── screens/             # HomeScreen, ArticleScreen, BookmarksScreen, SearchScreen
├── services/
│   ├── api/             # Axios client with interceptors, newsApi service methods
│   └── storage/         # Type-safe AsyncStorage wrapper
├── store/               # bookmarksStore (Zustand)
├── theme/               # colors, typography, spacing, shadows — 8pt grid design system
├── types/               # api.ts, navigation.ts — shared domain types
└── utils/               # date.ts, logger.ts, permissions.ts
__tests__/
├── components/          # Button, NewsCard, ErrorBoundary
├── hooks/               # useBookmarks (Zustand store tests)
├── services/            # newsApi with MSW mocking
├── utils/               # date formatting, logger
├── mocks/               # MSW handlers and server setup
└── setup.ts             # Global test config and mocks
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- React Native development environment ([official guide](https://reactnative.dev/docs/environment-setup))
- A free API key from [newsapi.org](https://newsapi.org/register)

### 1. Install Dependencies

```bash
yarn
```

### 2. Install iOS pods

```bash
cd ios && pod install && cd ..
```

### 3. Configure API Key

Copy `.env.example` to `.env` and add your [newsapi.org](https://newsapi.org/register) key:

```bash
cp .env.example .env
# then edit .env and set NEWS_API_KEY=your_key_here
```

### 4. Run the App

```bash
# iOS
yarn ios

# Android
yarn android
```

---

## Development Scripts

| Command | Description |
|---|---|
| `yarn test` | Run all tests with coverage |
| `yarn test:watch` | Tests in watch mode |
| `yarn lint` | ESLint with zero-warning policy |
| `yarn typecheck` | TypeScript type checking |
| `yarn validate` | Full CI check: typecheck + lint + format + test |
| `yarn format` | Prettier auto-format |

---

## Architecture Decisions

### Why React Query instead of useEffect + useState?

The original app fetched news with bare `useEffect` + `axios` — no error handling, no loading states, no caching. React Query gives us all of that for free, plus:
- **Infinite scroll** via `useInfiniteQuery` with automatic page param management
- **Background refresh** — data stays fresh without manual polling
- **Deduplication** — navigating back to Home reuses cached data instead of refetching
- **Retry logic** — automatically retries failed requests with exponential backoff

### Why Zustand for bookmarks?

Bookmarks are global client state that needs to survive navigation (not server state). Zustand's minimal API — `create`, selectors, `setState` — avoids Redux boilerplate. The store is initialized once in `App.tsx` and hydrated from AsyncStorage on mount.

### Why a custom design system instead of a component library?

A custom token-based system (colors, typography, spacing, shadows) demonstrates deeper understanding of React Native's styling primitives and avoids opinionated third-party component APIs. The 8pt grid system ensures visual consistency without a library dependency.

### Error Boundary placement

`AppErrorBoundary` wraps the entire navigator in `App.tsx`. This catches:
- Render errors in any screen
- Errors from third-party components
- Provides a "Try Again" path rather than a white screen

In production, the `onError` handler would forward to Sentry/Datadog before rendering the fallback.

### TypeScript strictness

`tsconfig.json` enables:
- `strict: true` — full inference + null-safety
- `noUnusedLocals` / `noUnusedParameters` — no dead code
- `noImplicitReturns` — functions always return a value
- Path aliases — `@components/*`, `@hooks/*`, etc. for clean imports

---

## What Makes This Production-Ready

### 1. Type Safety End-to-End
Every API response, navigation param, component prop, and store action is typed. The compiler catches mismatches before they reach users.

### 2. Structured Error Handling
- `ApiError` class with status code and error code from the API
- Axios interceptors normalize all HTTP errors before they reach UI
- `AppErrorBoundary` catches unexpected render failures
- `EmptyState` components for graceful empty/error UI flows

### 3. Observability
`logger.ts` wraps `console.*` with structured log entries (level, message, context, timestamp). The production path is stubbed to forward to a monitoring service (Sentry / Datadog) — swap one commented block.

### 4. Performance
- `FlatList` (not `ScrollView`) with `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize` tuned
- `useCallback` / `useMemo` on render callbacks and derived data
- `keyExtractor` returns stable article URLs — avoids unmount/remount on refresh
- React Query staleTime prevents redundant network requests

### 5. Testing Strategy
- **Unit tests**: Pure logic (date formatting, logger, Zustand store) with no rendering
- **Component tests**: RNTL tests verify accessibility roles, prop behavior, and interaction
- **Integration tests**: MSW intercepts real Axios calls — tests the full request pipeline without hitting the network
- **Coverage gates** enforce minimum 65% across statements/functions/lines

### 6. Accessibility
- All interactive elements have `accessibilityRole`, `accessibilityLabel`, and `accessibilityState`
- `accessibilityElementsHidden` on decorative images
- Minimum 44pt touch targets on all tappable elements
- `accessibilityHint` on CTAs that open external URLs

### 7. CI/CD Pipeline
GitHub Actions runs on every push: TypeScript check → ESLint (zero-warning policy) → Prettier format check → Jest with coverage upload to Codecov.

Husky pre-commit hook runs lint-staged to prevent unlinted code from ever being committed.

---

## License

MIT — built for portfolio demonstration purposes.
