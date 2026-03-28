import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("contacts", "routes/contacts.tsx"),
  route("deals", "routes/deals.tsx"),
  route("tasks", "routes/tasks.tsx"),
  route("users", "routes/users.tsx"),
  
  // API Routes (MVC pattern)
  route("api/auth/login", "routes/api/auth/login.ts"),
  route("api/contacts", "routes/api/contacts.ts"),
  route("api/deals", "routes/api/deals.ts"),
  route("api/tasks", "routes/api/tasks.ts"),
  route("api/dashboard", "routes/api/dashboard.ts"),
  route("api/users", "routes/api/users.ts"),
] satisfies RouteConfig;
