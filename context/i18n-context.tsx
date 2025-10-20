"use client"

import { createContext, useContext } from "react"

type I18nContextType = {
  dictionary: Record<string, string>
  locale: string
}

const I18nContext = createContext<I18nContextType | null>(null)

export const I18nProvider = ({
  children,
  dictionary,
  locale,
}: {
  children: React.ReactNode
  dictionary: Record<string, string>
  locale: string
}) => {
  return (
    <I18nContext.Provider value={{ dictionary, locale }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18nContext = () => {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18nContext must be used within I18nProvider")
  return context
}
