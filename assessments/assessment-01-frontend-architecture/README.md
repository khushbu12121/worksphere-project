# Assessment 01: Frontend Architecture

## 1. Project Overview

WorkSphere is a full-stack, multi-tenant project management platform designed to help organizations manage projects, teams, tasks and workflows.

The frontend is developed using Next.js App Router, TypeScript and Tailwind CSS.

## 2. Technology Stack

- Next.js 16.4.6
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- PostgreSQL
- Zod
- Vitest
- React Testing Library
- Supertest

## 3. Frontend Architecture

The frontend follows a modular component-based architecture.

Main modules:

- Overview Dashboard
- Projects
- Tasks
- Team
- Analytics
- Settings
- Help

The application uses reusable layout components, including:

- MainLayout
- Sidebar
- Header

## 4. Role-Based Access Control

The application supports five user roles:

- Platform Administrator
- Organization Owner
- Project Manager
- Team Member
- Auditor

Role-based permissions are maintained in `apps/web/lib/permissions.ts`.

The `hasPermission()` function checks whether a role has permission to access a particular feature.

## 5. Project Management

The Projects module supports:

- Viewing projects
- Creating projects
- Searching projects
- Filtering projects
- Displaying project status and progress
- Setting priority and due dates

Project data is fetched from the Express API and stored in PostgreSQL.

## 6. API Integration

Frontend API integration is implemented in:

`apps/web/lib/projects-api.ts`

Available endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/projects` | Fetch projects |
| POST | `/api/projects` | Create a project |

The backend validates incoming project data using Zod.

## 7. Validation and Error Handling

The implementation includes:

- Required field validation
- Project name validation
- Date validation
- Due date validation
- API error handling
- Loading states
- Empty states
- Success messages
- Safe server error responses

## 8. Responsive Design and Accessibility

The application includes responsive layouts for smaller screens.

Implemented usability features include:

- Responsive sidebar
- Mobile navigation
- Scrollable mobile sidebar
- Keyboard navigation
- Modal focus management
- Form validation feedback
- Loading and empty states

## 9. Testing

Frontend automated tests:

- Projects module tests
- Role permission tests

**Frontend test result: 20 tests passed.**

Backend automated tests cover:

- Authorized project retrieval
- Unauthorized access
- Successful project creation
- Invalid project data
- Invalid date ranges
- Database failure handling

Additional verification:

- TypeScript check: Passed
- Production build: Passed

## 10. Project Structure

```text
apps/
├── web/
│   ├── app/
│   ├── components/
│   └── lib/
│       ├── permissions.ts
│       └── projects-api.ts
│
└── api/
    └── src/
        ├── config/
        ├── routes/
        ├── app.ts
        └── server.ts
```

## 11. Setup Instructions

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Frontend URL: `http://localhost:3000`

### Backend

```bash
cd apps/api
npm install
npm run dev
```

Backend URL: `http://localhost:5000`

Configure the database connection using the local `.env` file. Refer to `.env.example` for the required variable names.

## 12. Current Limitations

- Authentication currently uses temporary demonstration headers.
- JWT-based authentication and production-grade authorization are planned for Assessment 04.
- The current project API implements project retrieval and creation; additional CRUD operations are not yet implemented.

## 13. Conclusion

Assessment 01 establishes the modular frontend architecture, responsive navigation, role-based permission checks, project management interface and API integration for WorkSphere.

The implementation has passed the frontend automated tests, TypeScript verification and production build.
