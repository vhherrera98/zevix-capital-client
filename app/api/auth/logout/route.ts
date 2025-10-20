// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/auth/login", process.env.NEXT_PUBLIC_SITE_URL));

  // Elimina todas las cookies conocidas
  response.cookies.delete("next-auth.session-token");
  response.cookies.delete("__Secure-next-auth.session-token");
  response.cookies.delete("x-user-id");
  response.cookies.delete("personaId");
  response.cookies.delete("x-user-lang");

  return response;
}
