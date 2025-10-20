// /app/api/me/persona/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { conn } from "@/database";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ personaId: null });

    const { id } = session.user;
    const { rows } = await conn().query(
      "SELECT id FROM persona WHERE usuario_id = $1",
      [id]
    );

    return NextResponse.json({ personaId: rows[0]?.id ?? null });
  } catch (error) {
    console.log("ERROR => ", error)
  }
}
