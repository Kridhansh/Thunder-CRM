# CRM Application

A modern, production-ready CRM (Customer Relationship Management) application built with React Router v7 using full-stack architecture.

## Tech Stack

- **Framework:** React Router v7 (7.13.1) - Full-stack
- **UI Library:** React 19
- **Styling:** TailwindCSS v4
- **Language:** TypeScript
- **Build Tool:** Vite
- **Database:** PostgreSQL
- **Authentication:** bcryptjs

## Features

- 🚀 Server-side rendering (SSR) for optimal performance and SEO
- ⚡️ Hot Module Replacement (HMR) for fast development
- 📦 Asset bundling and optimization with Vite
- 🔄 Data loading and mutations via React Router loaders/actions
- 🔒 TypeScript by default for type safety
- 🎨 TailwindCSS for styling
- 📱 Responsive design (Light mode)
- 📊 **CRM Dashboard** - Overview of contacts, deals, tasks, and revenue
- 👥 **Contacts Management** - Add, edit, delete contacts
- 💰 **Deals Pipeline** - Track deals through different stages
- ✅ **Task Management** - Manage tasks with priorities and due plans
- 👤 **User Management** - Admin can manage users
- 🔌 **PostgreSQL Database** - Connected to remote database

## Project Structure (MVC Architecture)

```
crm-open-source/
├── app/
│   ├── components/              # UI Components
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Spinner.tsx
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Hero.tsx             # Hero section
│   │   ├── Features.tsx          # Features section
│   │   ├── About.tsx            # About section
│   │   ├── Pricing.tsx          # Pricing section
│   │   ├── Contact.tsx          # Contact section
│   │   ├── CTA.tsx              # Call to action
│   │   └── Footer.tsx           # Footer
│   │
│   ├── controllers/             # Business Logic (MVC)
│   │   ├── contact.controller.ts
│   │   ├── deal.controller.ts
│   │   ├── task.controller.ts
│   │   ├── user.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── models/                  # Database Models (MVC)
│   │   ├── contact.server.ts
│   │   ├── deal.server.ts
│   │   ├── task.server.ts
│   │   └── user.server.ts
│   │
│   ├── routes/                  # Pages & API Routes
│   │   ├── home.tsx             # Landing page
│   │   ├── login.tsx            # Login page
│   │   ├── dashboard.tsx        # CRM Dashboard
│   │   ├── contacts.tsx         # Contacts management
│   │   ├── deals.tsx            # Deals pipeline
│   │   ├── tasks.tsx            # Task management
│   │   ├── users.tsx            # User management (admin)
│   │   ├── init-db.ts           # Database initialization
│   │   ├── seed.ts              # Seed admin user
│   │   └── api/                  # API Routes
│   │       ├── auth/login.ts    # Login API
│   │       ├── contacts.ts      # Contacts API
│   │       ├── deals.ts         # Deals API
│   │       ├── tasks.ts         # Tasks API
│   │       ├── users.ts         # Users API
│   │       └── dashboard.ts     # Dashboard API
│   │
│   ├── lib/                     # Configuration
│   │   └── db.server.ts        # Database connection
│   │
│   ├── services/                # Frontend API client
│   │   ├── api.ts              # API client methods
│   │   └── auth.ts             # Authentication service
│   │
│   ├── welcome/                 # Welcome page assets
│   │   ├── logo-dark.svg
│   │   ├── logo-light.svg
│   │   └── welcome.tsx
│   │
│   ├── app.css                 # Global styles
│   ├── root.tsx                # Root layout component
│   └── routes.ts               # Route configuration
│
├── .env                        # Environment variables
├── .env.example                # Example environment file
├── public/
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── vite.config.ts
├── react-router.config.ts
└── Dockerfile
```

## Architecture (MVC Pattern)

```
┌─────────────────────────────────────────────────────────────┐
│                      React Router v7                         │
│                    (Full-Stack Framework)                    │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    ROUTES     │    │  CONTROLLERS  │    │    MODELS     │
│  (API Layer)  │───▶│ (Business     │───▶│ (Database     │
│               │    │  Logic)       │    │  Operations)  │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
   API Endpoints         Data Transform         SQL Queries
   /api/contacts         Contact/Deal/Task       pg (PostgreSQL)
   /api/deals            User Auth              168.119.146.17
   /api/tasks            Dashboard Stats
   /api/users
```

## Database Setup

### Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
# .env file
DB_HOST=168.119.146.17
DB_PORT=5432
DB_USER=jobsingo_crm
DB_PASSWORD=Team111
DB_NAME=jobsingo_crm
```

### Initialize Database

Run the seed script to create tables and admin user:

```bash
npm run seed
```

Or visit `/init-db` route in your browser.

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL database (remote)

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Default Admin Login

- **Email:** meshcookies@gmail.com
- **Password:** Team@111111

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User authentication |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/contacts` | List contacts |
| POST | `/api/contacts` | Create contact |
| PUT | `/api/contacts` | Update contact |
| DELETE | `/api/contacts` | Delete contact |
| GET | `/api/deals` | List deals |
| POST | `/api/deals` | Create deal |
| PUT | `/api/deals` | Update deal |
| DELETE | `/api/deals` | Delete deal |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks` | Update task |
| DELETE | `/api/tasks` | Delete task |
| GET | `/api/users` | List users |
| POST | `/api/users` | Create user |
| PUT | `/api/users` | Update user |
| DELETE | `/api/users` | Delete user |

## Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Deployment

### Docker Deployment

Build the Docker image:

```bash
docker build -t crm-app .
```

Run the container:

```bash
docker run -p 3000:3000 crm-app
```

### Manual Deployment

Deploy the output of `npm run build`:

```
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
├── package.json
└── package-lock.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run seed` | Initialize database & create admin user |
| `npm run typecheck` | Run TypeScript type checking |

## Pages

- `/` - Home/Landing page
- `/login` - User login
- `/dashboard` - CRM Dashboard
- `/contacts` - Contacts management
- `/deals` - Deals pipeline
- `/tasks` - Task management
- `/users` - User management (Admin only)

---

Built with ❤️ using React Router v7
