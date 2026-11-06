import fr from "./fr.json"
import ar from "./ar.json"
import en from "./en.json"

const dictionaries = {
  fr: () => Promise.resolve(fr),
  ar: () => Promise.resolve(ar),
  en: () => Promise.resolve(en),
} as const

export type Locale = keyof typeof dictionaries
export const locales = Object.keys(dictionaries) as Locale[]
export const defaultLocale: Locale = "fr"

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
