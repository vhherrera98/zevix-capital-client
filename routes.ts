export const publicRoutes = [
  "/",
];

export const privateRoutes = [
  "/account",
  "/account/investments",
  "/account/notifications",
  "/dashboard",
  "/dashboard/partners/all",
  "/dashboard/partners/new",
  "/dashboard/clients/all",
  "/dashboard/clients/new",
  "/dashboard/investments",
  "/dashboard/investments/requests",
  "/dashboard/documents",
  "/dashboard/documents/beneficiary",
  "/dashboard/documents/requests",
];

export const authRoutes = [
  "/auth/login",
  "/auth/settings",
  "/auth/forget-your-password"
];

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = '/auth/login';