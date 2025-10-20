// utils/getLang.client.ts
import Cookies from "js-cookie"

export function getLangClient() {
  return Cookies.get("lang") || "es"
}
