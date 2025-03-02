'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AchievementsProvider } from '@/contexts/AchievementsContext'
import { AchievementProvider } from '@/components/AchievementProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AchievementsProvider>
        <AchievementProvider>
          {children}
        </AchievementProvider>
      </AchievementsProvider>
    </LanguageProvider>
  )
} 