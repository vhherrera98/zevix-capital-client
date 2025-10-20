"server only"

// const dictionaries: Record<string, () => Promise<Record<string, string>>> = {
//   es: () => import("./es/login.json").then((module) => module.default),
//   en: () => import("./en/login.json").then((module) => module.default),
// }
type Replacements = Record<string, string | number>

export async function getTranslations(locale: string, namespaces: string[]) {

  const all = await Promise.all(
    namespaces.map((ns) =>
      import(`./${locale}/${ns}.json`).then((mod) => mod.default)
    )
  )

  const dictionary = Object.assign({}, ...all)

  // const t = (key: string, fallback = ""): string => {
  //   return dictionary[key] || fallback
  // }
  const t = (key: string, replacements?: Replacements, fallback = ""): string => {
    let text = dictionary[key] || fallback

    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        text = text.replaceAll(`{{${k}}}`, String(v))
      }
    }

    return text
  }

  const numberFormatter = new Intl.NumberFormat(locale).format
  const f = (n: number): string => {
    return numberFormatter(n)
  }

  const dateFormatter = new Intl.DateTimeFormat(locale).format
  const d = (date: Date): string => {
    return dateFormatter(date)
  }

  return { t, f, d, dictionary }
}