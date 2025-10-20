import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth } from "./auth";
import { DEFAULT_LOCALE } from "./constants";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (request) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const response = NextResponse.next();

  const session = await auth();

  // 🌐 Establecer idioma preferido
  const acceptLang = request.headers.get("accept-language");
  const preferredLang = acceptLang?.split(",")[0] || DEFAULT_LOCALE;
  response.cookies.set("x-user-lang", preferredLang, { path: "/", maxAge: 60 * 60 * 24 * 30 });

  // 👤 Establecer cookie con userId si está autenticado
  if (session?.user) {
    const encodedUser = encodeURIComponent(session.user.id || "unknown");
    response.cookies.set("x-user-id", encodedUser, { path: "/", maxAge: 60 * 60 * 24 * 7 });
  }

  const isAuthenticated = !!session?.user;
  const isFirstSession = session?.user?.firstSession === true;
  const partnert = session?.user?.role === "Socio";

  // 🏠 Ruta raíz "/"
  if (pathname === "/") {
    if (!isAuthenticated || isFirstSession) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!partnert) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response; // ✅ Es socio, puede estar en "/"
  }

  // ⚙️ /auth/settings — solo si está autenticado y en firstSession
  if (pathname === "/auth/settings") {
    if (!isAuthenticated) return NextResponse.redirect(new URL("/auth/login", request.url));
    if (!isFirstSession) return NextResponse.redirect(new URL("/dashboard", request.url));
    return response;
  }

  // 🔓 Rutas públicas
  if (pathname.startsWith("/auth")) {
    return response;
  }

  // 🔐 Protege /settings
  if (pathname.startsWith("/settings")) {
    if (!isAuthenticated) return NextResponse.redirect(new URL("/auth/login", request.url));
    if (!isFirstSession) return NextResponse.redirect(new URL("/dashboard", request.url));
    return response;
  }

  // 🔐 Protege /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) return NextResponse.redirect(new URL("/auth/login", request.url));
    if (isFirstSession) return NextResponse.redirect(new URL("/auth/login", request.url));
    return response;
  }

  return response;
});


export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
    "/",
    "/auth/:path*",
    "/settings",
    "/dashboard",
  ],
}


