# Interview Management Dashboard

A modern, secure, and efficient dashboard for managing interviews, candidates, and feedback. Built with Next.js (App Router), React, Redux Toolkit, Material-UI (MUI), and Tailwind CSS.

---

## Live Demo

View and interact with the project here: [https://interview-dashboard-management.vercel.app](https://interview-dashboard-management.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Authentication & Authorization](#authentication--authorization)
- [State Management](#state-management)
- [UI & Responsiveness](#ui--responsiveness)
- [Dashboard & KPIs](#dashboard--kpis)
- [Filtering & Search](#filtering--search)
- [API Layer](#api-layer)
- [Custom Hooks](#custom-hooks)
- [How to Run](#how-to-run)
- [Development Notes](#development-notes)
- [Key Dependencies & Documentation](#key-dependencies--documentation)
- [Frontend Development Best Practices](#frontend-development-best-practices)
- [Environment Variables & Security](#environment-variables--security)

---

## Features

- **Role-based authentication** (Admin, TA Member, Panelist)
- **Responsive UI** for desktop and mobile
- **Sidebar navigation** with hamburger menu
- **Dashboard KPIs** and trends chart
- **Candidate management** (list, detail, feedback, schedule)
- **Role management** (admin only)
- **Filtering** by role, interviewer, and date range
- **Logout/login flows** with session persistence
- **Defensive programming** and best practices

---

## Project Structure

```
src/
  app/                # Next.js app router pages/layouts
    layout.tsx        # Global layout (Provider, Sidebar, etc.)
    page.tsx          # Root redirect logic
    login/page.tsx    # Login page
    dashboard/        # Dashboard routes (admin, ta, panelist)
    candidates/       # Candidate list/detail routes
    roles-management/ # Admin role management
  components/         # Shared UI components (Sidebar, MuiTable, Navbar, UserCard, etc.)
  features/
    auth/             # Authentication logic, Redux slice, RequireAuth, LoginForm, LogoutButton
    candidates/       # Candidate list, detail, feedback, schedule, API, table data
    dashboard/        # Dashboard KPIs, charts, filters, slice, API
    roles/            # Role management UI
  hooks/              # Custom hooks (useDebounce, etc.)
  lib/
    api.ts            # API helpers (apiGet, apiPost, etc.)
    store.ts          # Redux store setup
    Provider.tsx      # Redux Provider and hydration logic
    constants.ts      # App-wide constants
  styles/             # Tailwind and global CSS (if any)
public/               # Static assets (images, icons, resume, etc.)
```

---

## Authentication & Authorization

- **Redux Toolkit** manages user state (`authSlice.ts`).
- **Session persistence** via `localStorage`.
- **RequireAuth** HOC/component protects private routes and redirects unauthenticated users to `/login`.
- **Role-based access**: Only users with the correct role can access certain pages (e.g., admin dashboard).

---

## State Management

- **Redux Toolkit** for global state (auth, candidates, dashboard, etc.).
- **Custom hooks** (`useAuthRedux`) for login/logout/session logic.
- **Hydration**: `Provider.tsx` ensures Redux state is synced with localStorage on page load.

---

## UI & Responsiveness

- **Material-UI (MUI)** for components (Buttons, Tabs, etc.).
- **Tailwind CSS** for utility-first styling and responsive layouts.
- **Sidebar**: Collapsible/hamburger menu for mobile, persistent on desktop.
- **All major views** (dashboard, candidate list/detail, role management) are mobile-friendly.

---

## Dashboard & KPIs

- **DashboardView**: Shows key metrics (total candidates, interviews, feedback, etc.).
- **KPITrendsChart**: Visualizes trends over time (e.g., interviews scheduled, feedback submitted).
- **Filtering**: By role, interviewer, and date range.

---

## Filtering & Search

- **CandidateList**: Search and filter candidates by name, role, status, etc.
- **Dashboard**: Filter KPIs and charts by role, interviewer, and date range.
- **Debounced search** for performance.

---

## API Layer

- **api.ts**: Centralized API helpers using Axios (`apiGet`, `apiPost`, etc.).
- **dashboardAPI.ts**: Dashboard-specific API calls.
- **Error handling** and loading states included.

---

## Custom Hooks

- **useAuthRedux**: Handles login, logout, session, and user state.
- **useDebounce**: Debounces input for search/filter fields.

---

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Notes

- **App Router**: Uses Next.js App Router for layouts and routing.
- **SSR/CSR**: Handles both server and client rendering; hydration logic ensures smooth login/logout.
- **Security**: All private routes are protected; session is cleared on logout.
- **Extensible**: Add new roles, KPIs, or features easily via the feature-based structure.

---

## Key Dependencies & Documentation

- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React**: [https://react.dev/learn](https://react.dev/learn)
- **Redux Toolkit**: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
- **React Redux**: [https://react-redux.js.org/](https://react-redux.js.org/)
- **Material-UI (MUI)**: [https://mui.com/](https://mui.com/)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Hook Form**: [https://react-hook-form.com/](https://react-hook-form.com/)
- **Heroicons**: [https://heroicons.com/](https://heroicons.com/)
- **Axios**: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

These libraries are used throughout the project for UI, state management, forms, icons, and API calls. See their documentation for advanced usage and customization.

---

## Frontend Development Best Practices

- **Component Modularity:** All large UIs are broken into small, reusable components (e.g., Sidebar, MuiTable, FeedbackForm).
- **Folder Structure:** Code is organized by feature/domain, not by type, for better maintainability and discoverability.
- **Type Safety:** All API responses and component props are strictly typed with TypeScript interfaces.
- **Secure Session Handling:** Only non-sensitive data is stored in localStorage for session persistence. Authentication state is managed via Redux and hydrated on app load.
- **State Management Discipline:** Global state (Redux) is used only for cross-cutting concerns (auth, dashboard, candidates). Local state is used for component-specific UI (e.g., tab selection, form state).
- **Accessibility (A11y):** Semantic HTML, ARIA labels, and keyboard navigation are used throughout. MUI components provide built-in accessibility.
- **Responsive Design:** Tailwind CSS and MUI ensure layouts work across mobile, tablet, and desktop. Sidebar collapses to hamburger menu on small screens.
- **Error Handling & Fallback States:** All async data fetching displays loading, error, and empty states. User-friendly error messages and skeleton loaders are used.
- **Performance Optimization:** Debounced search input (useDebounce hook) prevents excessive API calls. Pagination and lazy loading (React.lazy, Suspense) for large lists. Avoidance of unnecessary re-renders and large prop trees.
- **Code Quality:** Consistent formatting, naming, and structure. No dead code, duplication, or over-complex logic. ESLint and TypeScript enforce code conventions and typing.
- **Compliance with OWASP Top 10 (UI Side):** No sensitive data in client storage. Input validation on all forms. Defensive programming to prevent XSS and UI-level vulnerabilities.

---

## Environment Variables & Security

- Sensitive configuration (such as API endpoints, secrets, and tokens) is managed using environment variables (`.env` files) and never hardcoded in the codebase.
- This approach helps prevent accidental exposure of secrets and supports secure deployment across environments.

## Credits

- Built by Prem Narayankar
- Uses Next.js, React, Redux Toolkit, Material-UI, Tailwind CSS

---

For questions or contributions, please open an issue or pull request.
