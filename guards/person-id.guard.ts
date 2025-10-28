import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

// TODO: Inservible
export async function CookiePersonId(response: NextResponse<unknown>, req: NextAuthRequest) {
  if (!req.cookies.get("personaId")) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      const { personaId } = await res.json();
      console.log(personaId)
      if (personaId) {
        response.cookies.set("personaId", personaId.toString(), {
          path: "/",
          httpOnly: false, // ✅ Puede ser leído por el cliente
        });
      }
    } catch (error) {
      console.error("No se pudo obtener el personaId:", error);
    }
  }
}