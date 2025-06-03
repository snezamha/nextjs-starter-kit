import "server-only"

import type { LocaleType } from "@/types"

const dictionaries = {
  en: () =>
    import("@/data/dictionaries/en.json").then((module) => module.default),
  fa: () =>
    import("@/data/dictionaries/fa.json").then((module) => module.default),
  de: () =>
    import("@/data/dictionaries/de.json").then((module) => module.default),
}

export async function getDictionary(locale: LocaleType) {
  return dictionaries[locale]()
}

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>
