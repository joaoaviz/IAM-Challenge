'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAchievements } from '@/contexts/AchievementsContext'

interface AchievementProviderProps {
  children: React.ReactNode
}

function AchievementProvider({ children }: AchievementProviderProps) {
  const { achievements } = useAchievements()
  const [shownAchievements, setShownAchievements] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load shown achievements from localStorage
    const storedShownAchievements = localStorage.getItem('shownAchievements')
    if (storedShownAchievements) {
      setShownAchievements(new Set(JSON.parse(storedShownAchievements)))
    }
  }, [])

  useEffect(() => {
    // Check for newly unlocked achievements
    achievements.forEach(achievement => {
      if (achievement.unlocked && !shownAchievements.has(achievement.id)) {
        // Mark achievement as shown
        const newShownAchievements = new Set(shownAchievements)
        newShownAchievements.add(achievement.id)
        setShownAchievements(newShownAchievements)
        
        // Store in localStorage
        localStorage.setItem('shownAchievements', JSON.stringify(Array.from(newShownAchievements)))
      }
    })
  }, [achievements, shownAchievements])

  return children
}

export { AchievementProvider } 