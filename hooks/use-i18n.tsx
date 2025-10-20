import { useI18nContext } from "@/context/i18n-context"
import { getLangClient } from "@/utils/getLang.client";

type Replacements = Record<string, string | number>

export const useI18n = () => {

  const lang = getLangClient() || "en";
  const { dictionary, locale } = useI18nContext();

  const t = (key: string, replacements?: Replacements, fallback = ""): string => {
    let text = dictionary[key] ?? fallback

    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        text = text.replaceAll(`{{${k}}}`, String(v))
      }
    }

    return text
  }

  const f = (n: number): string => new Intl.NumberFormat(locale).format(n)
  const d = (date: Date): string => new Intl.DateTimeFormat(locale).format(date)

  return { t, f, d, lang }
}
