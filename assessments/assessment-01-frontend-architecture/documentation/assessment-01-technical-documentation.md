# WorkSphere – Assessment 01
## Frontend Architecture: Technical Documentation

**Project:** WorkSphere  
**Assessment:** 01 – Frontend Architecture  
**Version:** 1.0  
**Status:** Implementation completed; authentication integration pending

---

## 1. Introduction

WorkSphere is a multi-tenant project management platform designed to help organizations manage projects, teams, tasks and workflows.

The frontend is built using Next.js App Router, React, TypeScript and Tailwind CSS. It follows a reusable component-based architecture.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16.4.6 | Frontend framework |
| React | UI components |
| TypeScript | Type safety |
| Tailwind CSS | Responsive styling |
| Express.js | Backend REST API |
| PostgreSQL | Persistent database |
| Zod | Request validation |
| Vitest | Automated testing |
| React Testing Library | Frontend component testing |
| Supertest | Backend API testing |

## 3. Application Architecture

The application is divided into frontend and backend modules.

### Frontend
Location: `apps/web/`

Main modules:
- Dashboard
- Projects
- Tasks
- Team
- Analytics
- Settings
- Help

### Backend
Location: `apps/api/`

Main components:
- Express application
- Server configuration
- PostgreSQL database connection
- Project API routes
- API route tests

## 4. Reusable Layout Components

The frontend uses reusable layout components:

- `MainLayout.tsx`: Main application layout and sidebar state management.
- `Sidebar.tsx`: Navigation menu and responsive sidebar.
- `Header.tsx`: Application header.

The sidebar supports mobile navigation and independent scrolling. Background scrolling is disabled while the mobile sidebar is open.

## 5. Role-Based Permissions

The application defines five roles:

1. PLATFORM_ADMIN
2. ORGANIZATION_OWNER
3. PROJECT_MANAGER
4. TEAM_MEMBER
5. AUDITOR

Permission logic is implemented in:

`apps/web/lib/permissions.ts`

The `hasPermission()` function checks whether a role has access to a particular application feature.

The current implementation provides frontend permission checks. Backend identity verification and secure authorization will be strengthened with JWT authentication in Assessment 04.

## 6. Project Management Module

Location: `apps/web/app/projects/`

Implemented functionality:

- View projects
- Create projects
- Search projects
- Filter projects
- Display project status
- Display progress
- Set priority
- Set project dates
- Show loading and empty states
- Display success and error messages

The project creation form includes required-field and date validation.

## 7. Backend API Integration

Location:

`apps/web/lib/projects-api.ts`

The frontend communicates with the Express backend.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Retrieve projects |
| POST | `/api/projects` | Create a project |

The backend routes are implemented in:

`apps/api/src/routes/project.routes.ts`

Project data is stored in PostgreSQL.

The backend validates incoming project information using Zod.

## 8. Database Integration

The backend uses PostgreSQL through the `pg` package.

Database configuration:

`apps/api/src/config/database.ts`

The database connection is configured through the `DATABASE_URL` environment variable.

Sensitive environment variables are excluded from Git using `.gitignore`.

## 9. Validation and Error Handling

The application implements:

- Required-field validation
- Project name validation
- Date format validation
- Due date validation
- API response error handling
- Safe server error messages
- Loading states
- Empty states
- Success feedback

## 10. Responsive Design and Accessibility

The application includes:

- Responsive desktop and mobile layouts
- Mobile navigation
- Independently scrollable sidebar
- Keyboard-accessible navigation
- Modal focus management
- Visible form validation feedback
- Responsive project cards

## 11. Testing and Verification

### Frontend tests

The frontend automated test suite contains 20 passing tests.

Coverage includes:
- Project module tests
- Role permission tests
- Project creation and validation
- UI behavior and error handling

### Backend tests

Backend tests cover:
- Authorized project retrieval
- Unauthorized requests
- Successful project creation
- Invalid project details
- Invalid date ranges
- Database failure handling

### Additional verification

| Verification | Result |
|---|---|
| Frontend tests | 20 passed |
| TypeScript check | Passed |
| Next.js production build | Passed |
| Backend TypeScript check | Passed |
| Backend build | Passed |

## 12. Environment Setup

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Frontend: `http://localhost:3000`

### Backend

```bash
cd apps/api
npm install
npm run dev
```

Backend: `http://localhost:5000`

Configure the database connection in a local `.env` file using `.env.example` as a reference.

## 13. Known Limitations

The current implementation has the following limitations:

1. Authentication currently uses temporary demonstration headers.
2. JWT authentication is not yet implemented.
3. Backend authorization needs stronger identity and role enforcement.
4. The current project API supports retrieval and creation; update and delete endpoints are not yet implemented.
5. Production deployment has not yet been completed.

These limitations are planned for subsequent assessments.

## 14. Conclusion

Assessment 01 establishes the WorkSphere frontend architecture, reusable layouts, role-based frontend permissions, responsive navigation, project management interface and Express API integration.

The implementation has successfully passed 20 frontend tests, TypeScript verification and production build checks.

