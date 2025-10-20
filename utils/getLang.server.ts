// utils/getLang.ts
import { cookies } from "next/headers"

export async function getLangFromCookie() {
  const cookieStore = await cookies()
  const lang = cookieStore.get("lang")?.value
  return lang || "en"
}
