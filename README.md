# 🔔 Campus Notifications Microservice

> A production-grade full-stack notification system for campus management, featuring priority inbox, real-time filtering, and comprehensive logging.

**Roll No:** CB.SC.U4CSE23736  
**Track:** Frontend  
**Tech Stack:** React + Vite + Material UI | Node.js + Express | Axios

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Video Demo Checklist](#video-demo-checklist)
- [Commit Strategy](#commit-strategy)

---

## 🏗 Architecture Overview

```
┌──────────────────┐      ┌───────────────────┐      ┌────────────────────┐
│  React Frontend  │─────▶│  Express Backend   │─────▶│  Evaluation API    │
│  localhost:3000   │      │  localhost:5000     │      │  External Service  │
└──────────────────┘      └───────────────────┘      └────────────────────┘
         │                          │                          ▲
         └──────────────────────────┴──────── Log API ────────┘
```

- **Frontend**: React SPA with Material UI, Axios, React Router
- **Backend**: Express API server with controller/service architecture
- **Logging**: Shared middleware for structured log delivery
- **Priority Engine**: Custom sorting algorithm with weight-based ranking

---

## 📁 Project Structure

```
CB.SC.U4CSE23736/
│
├── .gitignore
├── README.md
├── notification_system_design.md
│
├── logging_middleware/
│   ├── index.js              # Public API
│   └── logger.js             # Core logger with validation
│
├── notification_app_be/
│   ├── .env                  # Environment variables
│   ├── package.json
│   ├── server.js             # Express entry point
│   ├── config/
│   │   └── index.js          # Centralized configuration
│   ├── controllers/
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   ├── errorHandler.js   # Centralized error handling
│   │   └── requestLogger.js  # HTTP request logging
│   ├── routes/
│   │   └── notificationRoutes.js
│   ├── services/
│   │   └── notificationService.js
│   └── utils/
│       ├── apiClient.js      # Axios instance for external API
│       └── prioritySort.js   # Priority sorting algorithm
│
└── notification_app_fe/
    ├── .env                  # Vite environment variables
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        │   ├── axiosInstance.js
        │   └── notificationApi.js
        ├── components/
        │   ├── DashboardCards.jsx
        │   ├── EmptyState.jsx
        │   ├── ErrorState.jsx
        │   ├── FilterBar.jsx
        │   ├── LoadingSkeleton.jsx
        │   ├── Navbar.jsx
        │   ├── NotificationCard.jsx
        │   ├── PaginationComponent.jsx
        │   └── Sidebar.jsx
        ├── constants/
        │   └── index.js
        ├── context/
        │   └── NotificationContext.jsx
        ├── hooks/
        │   ├── useNotifications.js
        │   └── useViewedStatus.js
        ├── layouts/
        │   └── MainLayout.jsx
        ├── pages/
        │   ├── AllNotifications.jsx
        │   ├── Dashboard.jsx
        │   └── PriorityNotifications.jsx
        ├── routes/
        │   └── AppRoutes.jsx
        ├── services/
        │   └── logService.js
        ├── styles/
        │   └── theme.js
        └── utils/
            └── formatters.js
```

---

## ✨ Features

### Frontend
- 📊 **Dashboard** with statistics cards and recent notifications
- 📋 **All Notifications** with pagination and type filtering
- ⭐ **Priority Inbox** showing top-10 ranked notifications
- 👁 **Viewed/Unviewed** tracking with localStorage persistence
- 🎨 **Premium Dark UI** with Material UI components
- 📱 **Fully Responsive** (mobile, tablet, desktop)
- 🔄 **Loading Skeletons** and error/empty states
- 🔔 **Unread Badge** in navbar

### Backend
- 🔀 **Priority Sorting** algorithm (Placement > Result > Event)
- 🔍 **Filtering** by notification type
- 📄 **Pagination** with configurable page size
- 🛡 **Centralized Error Handling**
- 📝 **Request/Response Logging**
- 🔐 **Bearer Token Authentication**

### Logging
- 📤 Structured log delivery to evaluation API
- 🔒 Parameter validation against allowed enums
- 🛡 Graceful failure — logging never crashes the app
- 🔄 Async, non-blocking log dispatch

---

## 📡 API Documentation

### Backend Endpoints

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| GET | `/api/notifications` | `page`, `limit` | Paginated notifications |
| GET | `/api/notifications/priority` | `limit` | Top-N priority sorted |
| GET | `/api/notifications/filter` | `notification_type`, `page`, `limit` | Filtered by type |
| GET | `/api/health` | — | Health check |

### External API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Registration |
| POST | `/auth` | Authentication |
| GET | `/notifications` | Fetch notifications |
| POST | `/logs` | Send log entries |

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/TARUNprojectworks/CB.SC.U4CSE23736.git
cd CB.SC.U4CSE23736
```

### 2. Install Backend Dependencies

```bash
cd notification_app_be
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../notification_app_fe
npm install
```

### 4. Configure Environment Variables

Backend `.env` and Frontend `.env` are pre-configured. Verify they exist:

```bash
# Backend
cat notification_app_be/.env

# Frontend
cat notification_app_fe/.env
```

---

## ▶️ Running the Application

### Start Backend (Terminal 1)

```bash
cd notification_app_be
npm run dev
```

Server starts at: `http://localhost:5000`

### Start Frontend (Terminal 2)

```bash
cd notification_app_fe
npm run dev
```

App opens at: `http://localhost:3000`

---

## 📸 Screenshots

Capture the following screenshots for documentation:

| # | Screenshot | Description |
|---|-----------|-------------|
| 1 | Desktop Dashboard | Full dashboard with stats cards |
| 2 | Mobile Dashboard | Responsive mobile layout |
| 3 | All Notifications | Notification list with filters |
| 4 | Priority Notifications | Top-10 priority inbox |
| 5 | Filtering | Active filter chips |
| 6 | Pagination | Pagination controls |
| 7 | Loading States | Skeleton loaders |
| 8 | API Responses | Backend JSON responses |
| 9 | Logging API | Successful log submissions |

---

## 🎥 Video Demo Checklist

- [ ] Responsive UI (desktop → tablet → mobile)
- [ ] Filter by Event, Result, Placement
- [ ] Pagination navigation
- [ ] Viewed/Unviewed status tracking
- [ ] Priority sorting with ranked cards
- [ ] API integration (network tab)
- [ ] Logging middleware (POST /logs)
- [ ] Error handling (disconnect backend)
- [ ] Empty state (apply strict filter)
- [ ] Loading states (skeleton loaders)

---

## 📝 Commit Strategy

```
1. feat: initialize project structure and .gitignore
2. feat: implement logging middleware
3. feat: add backend configuration and server setup
4. feat: implement notification service and priority sort
5. feat: add backend routes and controllers
6. feat: scaffold frontend with Vite and Material UI theme
7. feat: implement axios instance and API layer
8. feat: add notification hooks and context
9. feat: create reusable UI components
10. feat: implement Dashboard page
11. feat: implement All Notifications page with filtering and pagination
12. feat: implement Priority Notifications page
13. feat: add responsive layout (Navbar, Sidebar, MainLayout)
14. feat: integrate frontend logging service
15. docs: add system design document
16. docs: add README with setup instructions
17. chore: final review and polish
```

---

## 📄 License

MIT License — CB.SC.U4CSE23736

---

*Built with ❤️ for the Campus Notifications Microservice evaluation.*
