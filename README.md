Campus Notifications Microservice

A full stack campus notification system built to help students stay updated with important campus activities such as placements, results, and events. The project includes a priority inbox, filtering, pagination, viewed and unviewed tracking, and structured logging support.

Roll Number: CB.SC.U4CSE23736
Track: Frontend
Tech Stack: React + Vite + Material UI | Node.js + Express | Axios

Project Overview

This application was developed as part of a frontend evaluation project. The goal was to build a clean, responsive, and user friendly notification platform that can efficiently manage and display campus notifications.

The application allows users to:

View all notifications
Access a priority inbox
Filter notifications by type
Track viewed and unviewed notifications
Navigate through paginated notifications
Use the application smoothly across desktop and mobile devices

The project also includes a reusable logging middleware for tracking important application events and API activities.

Architecture Overview
React Frontend  →  Express Backend  →  External Evaluation APIs
        │                 │
        └──────── Logging Middleware ────────┘

Frontend:

Built using React, Vite, and Material UI
Includes reusable components and responsive layouts

Backend:

Built using Node.js and Express
Handles API communication, filtering, pagination, and priority sorting

Logging Middleware:

Handles structured logs
Sends logs to the external logging API
Prevents logging failures from affecting the application
Project Structure
CB.SC.U4CSE23736/

├── .gitignore
├── README.md
├── notification_system_design.md

├── logging_middleware/
│   ├── index.js
│   └── logger.js

├── notification_app_be/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/

└── notification_app_fe/
    ├── .env
    ├── package.json
    ├── vite.config.js
    ├── src/
Features
Frontend Features
Dashboard with notification statistics
Priority notification inbox
Notification filtering
Pagination support
Viewed and unviewed tracking
Responsive design for desktop and mobile
Loading states and error handling
Reusable Material UI components
Backend Features
Priority sorting logic
Filtering support
Pagination support
Centralized error handling
API request handling
Bearer token authentication
Logging Features
Structured logging system
Async log delivery
Validation for log parameters
Graceful failure handling
Reusable logging utilities
API Endpoints
Backend Routes
Method	Endpoint	Purpose
GET	/api/notifications	Fetch paginated notifications
GET	/api/notifications/priority	Fetch priority notifications
GET	/api/notifications/filter	Fetch filtered notifications
GET	/api/health	Health check
External APIs
Method	Endpoint	Purpose
POST	/register	Registration
POST	/auth	Authentication
GET	/notifications	Fetch notifications
POST	/logs	Send logs
Setup Instructions
Prerequisites

Install the following before running the project:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/TARUNprojectworks/CB.SC.U4CSE23736.git

cd CB.SC.U4CSE23736
Install Backend Dependencies
cd notification_app_be

npm install
Install Frontend Dependencies
cd ../notification_app_fe

npm install
Running the Application
Start Backend
cd notification_app_be

npm run dev

Backend runs on:

http://localhost:5000
Start Frontend
cd notification_app_fe

npm run dev

Frontend runs on:

http://localhost:3000
Screenshots to Include

Capture screenshots for:

Desktop dashboard
Mobile responsive layout
All notifications page
Priority inbox
Filtering functionality
Pagination
Loading states
API responses
Logging API responses
Video Demo Checklist

The demo should include:

Responsive UI
Filtering notifications
Pagination
Priority inbox
Viewed and unviewed tracking
API integration
Logging middleware
Error handling
Loading states
Suggested Commit Flow
1. Initial project setup
2. Logging middleware setup
3. Backend configuration
4. Notification service integration
5. Frontend setup
6. UI component creation
7. Responsive design improvements
8. Priority inbox implementation
9. Filtering and pagination
10. Documentation updates
11. Final cleanup
Conclusion

This project focuses on building a scalable and user friendly campus notification platform while following clean frontend engineering practices such as reusable components, responsive design, modular architecture, and structured logging.