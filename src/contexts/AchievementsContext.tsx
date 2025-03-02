'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Achievement } from '@/types/Achievement'

interface AchievementsContextType {
  achievements: Achievement[]
  unlockAchievement: (id: string) => void
  resetAchievements: () => void
  isAchievementUnlocked: (id: string) => boolean
}

const defaultAchievements: Achievement[] = [
  {
    id: 'user_enumeration',
    title: 'User Enumeration',
    description: 'You discovered a user enumeration vulnerability!',
    unlocked: false
  },
  {
    id: 'password_cracker',
    title: 'Password Cracker',
    description: 'You successfully cracked a user password!',
    unlocked: false
  },
  {
    id: 'mfa_destroyer',
    title: 'MFA Destroyer',
    description: 'You bypassed the MFA security!',
    unlocked: false
  },
  {
    id: 'path_finder',
    title: 'Path Finder',
    description: 'You found a hidden path in the application!',
    unlocked: false
  },
  {
    id: 'too_good',
    title: 'Too Good',
    description: 'You found a way to bypass the authentication!',
    unlocked: false
  },
  {
    id: 'gimme_money',
    title: 'Gimme Money',
    description: 'You found a way to increase your balance!',
    unlocked: false
  },
  {
    id: 'straight_to_point',
    title: 'Straight to the Point',
    description: 'You found a direct way to access sensitive data!',
    unlocked: false
  },
  {
    id: 'robin_hood',
    title: 'Robin Hood',
    description: 'You transferred money to another user!',
    unlocked: false
  },
  {
    id: 'selfish_hacker',
    title: 'Selfish Hacker',
    description: 'You transferred money to yourself!',
    unlocked: false
  }
]

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined)

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('achievements')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to parse saved achievements:', e)
        }
      }
    }
    return defaultAchievements
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('achievements', JSON.stringify(achievements))
    }
  }, [achievements])

  const unlockAchievement = (id: string) => {
    setAchievements(current => {
      const achievement = current.find(a => a.id === id && !a.unlocked)
      if (!achievement) return current

      return current.map(a => 
        a.id === id ? { ...a, unlocked: true, timestamp: Date.now() } : a
      )
    })
  }

  const resetAchievements = () => {
    setAchievements(defaultAchievements)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('achievements')
    }
  }

  const isAchievementUnlocked = (id: string) => {
    return achievements.some(achievement => achievement.id === id && achievement.unlocked)
  }

  return (
    <AchievementsContext.Provider 
      value={{ 
        achievements, 
        unlockAchievement, 
        resetAchievements,
        isAchievementUnlocked
      }}
    >
      {children}
    </AchievementsContext.Provider>
  )
}

export function useAchievements() {
  const context = useContext(AchievementsContext)
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementsProvider')
  }
  return context
} 