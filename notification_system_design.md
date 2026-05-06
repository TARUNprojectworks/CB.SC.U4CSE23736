# Campus Notifications Microservice — System Design Document

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Frontend Flow](#frontend-flow)
3. [Backend Flow](#backend-flow)
4. [Logging Middleware](#logging-middleware)
5. [Priority Algorithm](#priority-algorithm)
6. [Complexity Analysis](#complexity-analysis)
7. [State Management](#state-management)
8. [Responsive Design Strategy](#responsive-design-strategy)
9. [Error Handling Strategy](#error-handling-strategy)

---

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│                 │     │                  │     │                     │
│  React Frontend │────▶│  Express Backend  │────▶│  Evaluation Service │
│  (Port 3000)    │     │  (Port 5000)      │     │  (External API)     │
│                 │     │                  │     │                     │
└────────┬────────┘     └────────┬─────────┘     └──────────┬──────────┘
         │                       │                          │
         │                       │                          │
         ▼                       ▼                          │
    ┌─────────┐           ┌─────────────┐                   │
    │ Log API │───────────│ Log API     │───────────────────┘
    │ (FE)    │           │ (BE)        │
    └─────────┘           └─────────────┘
```

### Layers

| Layer | Technology | Responsibility |
|-------|-----------|---------------|
| Frontend | React + Vite + MUI | UI rendering, user interaction, local state |
| Backend | Node.js + Express | API proxy, priority sorting, filtering, logging |
| Logging | Shared middleware | Structured log delivery to evaluation service |
| External API | Evaluation Service | Source of truth for notification data |

### Data Flow

1. User opens the frontend → React app initializes
2. Pages request data via Axios → Proxied to Express backend
3. Backend fetches from external API with Bearer token auth
4. Backend applies sorting/filtering → Returns processed data
5. Frontend renders cards with viewed/unviewed tracking (localStorage)
6. All actions are logged asynchronously to the evaluation service

---

## Frontend Flow

```
App.jsx
 └── ThemeProvider + CssBaseline
      └── BrowserRouter
           └── NotificationProvider (Context)
                └── MainLayout (AppBar + Sidebar + Outlet)
                     ├── Dashboard       → /
                     ├── AllNotifications → /notifications
                     └── PriorityNotifications → /priority
```

### Key Patterns

- **Axios Instance**: Centralized HTTP client with interceptors for auth and error handling
- **Custom Hooks**: `useNotifications` (data fetching) and `useViewedStatus` (localStorage persistence)
- **Context API**: Global state shared across pages without prop drilling
- **Reusable Components**: NotificationCard, FilterBar, PaginationComponent, LoadingSkeleton, ErrorState, EmptyState
- **Log Service**: Async frontend logger sending structured logs to the evaluation API

---

## Backend Flow

```
Request → CORS → JSON Parser → Morgan → RequestLogger → Route Handler
                                                              │
                                                    ┌─────────┴──────────┐
                                                    │   Controller       │
                                                    │  (Input Validation)│
                                                    └────────┬───────────┘
                                                             │
                                                    ┌────────▼───────────┐
                                                    │   Service          │
                                                    │  (Business Logic)  │
                                                    └────────┬───────────┘
                                                             │
                                                    ┌────────▼───────────┐
                                                    │   API Client       │
                                                    │  (External Fetch)  │
                                                    └────────┬───────────┘
                                                             │
                                                    ┌────────▼───────────┐
                                                    │  Error Handler     │
                                                    │  (Centralized)     │
                                                    └────────────────────┘
```

### Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Paginated notification list |
| GET | `/api/notifications/priority` | Top-N priority sorted |
| GET | `/api/notifications/filter` | Filtered by notification_type |
| GET | `/api/health` | Health check endpoint |

---

## Logging Middleware

### Design

The logging middleware is a shared module (`logging_middleware/`) used by both frontend and backend.

**Backend (Node.js)**:
```javascript
const { Log, initLogger } = require('../logging_middleware');
initLogger({ baseUrl, accessToken });
Log('backend', 'info', 'middleware', 'Server started');
```

**Frontend (ES Modules)**:
```javascript
import { logInfo } from './services/logService';
logInfo('page', 'Dashboard mounted');
```

### Log Payload

```json
{
  "stack": "frontend | backend",
  "level": "debug | info | warn | error | fatal",
  "package": "api | component | hook | page | state | style | auth | config | middleware | utils",
  "message": "Human-readable description",
  "timestamp": "ISO 8601"
}
```

### Key Principles

1. **Graceful failure**: Logging errors are caught silently — never crash the app
2. **Validation**: Parameters are validated against allowed enums before sending
3. **Async**: All log calls are fire-and-forget (non-blocking)
4. **Centralized**: Single logger utility avoids console.log spam

---

## Priority Algorithm

### Rules

```
Priority: Placement > Result > Event

Weights:
  Placement = 3
  Result    = 2
  Event     = 1

Sort Order:
  1. Weight (descending)
  2. Timestamp (descending — most recent first)
```

### Implementation

```javascript
function priorityComparator(a, b) {
  const weightDiff = getWeight(b) - getWeight(a);
  if (weightDiff !== 0) return weightDiff;
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
}

// Primary: Sort-then-slice
function getTopN(notifications, n = 10) {
  return [...notifications].sort(priorityComparator).slice(0, n);
}

// Alternative: Selection-based (better when n << N)
function getTopNSelection(notifications, n = 10) {
  // Iteratively select the best remaining element n times
}
```

---

## Complexity Analysis

### Sort-then-Slice (Primary)

| Operation | Time | Space |
|-----------|------|-------|
| Spread copy | O(N) | O(N) |
| Timsort | O(N log N) | O(N) |
| Slice | O(n) | O(n) |
| **Total** | **O(N log N)** | **O(N)** |

### Selection-based (Alternative)

| Operation | Time | Space |
|-----------|------|-------|
| Outer loop | O(n) | — |
| Inner scan | O(N) | — |
| **Total** | **O(n × N)** | **O(n)** |

When `n << N` (e.g., top 10 out of 10,000), selection is faster.
When `n ≈ N`, sort-then-slice is more efficient.

For typical campus notification volumes (< 1000), both perform well.
The sort-then-slice is used by default for code simplicity.

---

## State Management

### Architecture

```
NotificationContext (React Context API)
├── useNotifications Hook
│   ├── notifications[]
│   ├── loading, error
│   ├── page, limit, total, filter
│   └── loadNotifications, loadPriority, loadFiltered, etc.
└── useViewedStatus Hook
    ├── viewedIds[] (localStorage-backed)
    ├── markAsViewed(id)
    ├── isViewed(id)
    └── getUnviewedCount(notifications)
```

### Why Context + Hooks (not Redux)?

- **Simplicity**: Notification state is not deeply nested or heavily shared
- **Performance**: Context re-renders are acceptable for this data volume
- **Modularity**: Each hook is independently testable and reusable
- **No external deps**: Stays within the allowed tech stack

### Viewed/Unviewed Tracking

Since the backend doesn't provide viewed status:
- Viewed notification IDs are stored in `localStorage` under `campus_notifications_viewed`
- The `useViewedStatus` hook syncs React state ↔ localStorage
- Persistent across browser sessions
- Graceful fallback if localStorage is full/unavailable

---

## Responsive Design Strategy

### Breakpoints (MUI defaults)

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| xs | 0–599px | Mobile: Stack layout, temporary drawer |
| sm | 600–899px | Tablet: 2-column grid, temporary drawer |
| md | 900–1199px | Desktop: Permanent sidebar, 3+ columns |
| lg | 1200px+ | Wide desktop: Full layout |

### Implementation

- **Sidebar**: `Drawer variant="temporary"` on mobile → `variant="permanent"` on desktop
- **AppBar**: Hamburger menu on mobile, hidden on desktop (sidebar visible)
- **Grid**: `<Grid container>` with responsive `xs`, `sm`, `md` props
- **Cards**: Full-width on mobile, grid on tablet/desktop
- **Typography**: Responsive font sizes via `sx={{ fontSize: { xs, sm } }}`

---

## Error Handling Strategy

### Layers

| Layer | Strategy |
|-------|----------|
| **Axios Interceptors** | Catch all HTTP errors, log appropriately |
| **Service Layer** | Throw errors with context for controllers to handle |
| **Controller Layer** | Pass errors to centralized error handler via `next(error)` |
| **Error Handler Middleware** | Categorize and format error responses |
| **Frontend Components** | ErrorState component with retry mechanism |
| **Logging** | Graceful failure — never let log errors crash the app |

### Error Types Handled

1. **Authentication** (401/403): Invalid or expired token
2. **Network** (ECONNREFUSED/ETIMEDOUT): Service unavailable
3. **External API** (4xx/5xx): Upstream service errors
4. **Validation**: Invalid query parameters
5. **Not Found** (404): Unknown routes
6. **Generic** (500): Unhandled exceptions

### Frontend Error UX

- **ErrorState**: Visual error display with retry button
- **Snackbar**: Transient success/error feedback
- **LoadingSkeleton**: Skeleton loaders during data fetching
- **EmptyState**: Clear messaging when no data is available
