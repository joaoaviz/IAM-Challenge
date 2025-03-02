'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations } from '@/translations'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === 'en' ? 'fr' : 'en'
      localStorage.setItem('language', newLanguage)
      return newLanguage
    })
  }

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations[language as keyof typeof translations]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return the key if translation is not found
      }
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 