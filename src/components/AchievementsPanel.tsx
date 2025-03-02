'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAchievements } from '@/contexts/AchievementsContext'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
// import { AchievementPopup } from './AchievementPopup'  // Commented out
import type { Achievement } from '@/types/Achievement'
import Cookies from 'js-cookie'
import { useLanguage } from '@/contexts/LanguageContext'

export function AchievementsPanel() {
  const router = useRouter()
  const { achievements, resetAchievements, unlockAchievement } = useAchievements()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [mounted, setMounted] = useState(false)
  // const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)  // Commented out

  useEffect(() => {
    setMounted(true)
    setIsCollapsed(window.innerWidth < 1024)
  }, [])

  // Update the unlockAchievement function to show popups
  const handleUnlock = useCallback((id: string) => {
    unlockAchievement(id)
  }, [unlockAchievement])

  const handleReset = () => {
    // First clear all data
    resetAchievements()
    Cookies.remove('currentUser', { path: '/' })
    Cookies.remove('isAdmin', { path: '/' })
    Cookies.remove('isBoss', { path: '/' })
    localStorage.removeItem('incorrectAttempts')
    localStorage.removeItem('showAllButtons')
    localStorage.removeItem('bypassAuth')
    localStorage.removeItem('shownAchievements')
    localStorage.removeItem('achievements')
    setShowConfirmation(false)
    
    window.location.reload()
  }

  if (!mounted) {
    return null
  }

  // Sort achievements by timestamp if available
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (!a.timestamp && !b.timestamp) return 0
    if (!a.timestamp) return 1
    if (!b.timestamp) return -1
    return a.timestamp - b.timestamp
  })

  return (
    <>
      {/* Removed AchievementPopup component */}

      <div className="bg-white rounded-xl shadow-lg relative">
        {/* Combined header section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">
              {t('achievements.title')}
            </h2>
            <button
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-expanded={!isCollapsed}
              aria-controls="achievements-list"
              aria-label={isCollapsed ? t('achievements.expand') : t('achievements.collapse')}
            >
              <ChevronDownIcon
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          <button
            onClick={() => setShowConfirmation(true)}
            className="text-sm text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md px-3 py-1.5"
            aria-label={t('login.resetGame')}
          >
            {t('login.resetGame')}
          </button>
        </div>

        {/* Achievement List */}
        <div 
          id="achievements-list"
          className={`${
            isCollapsed ? 'max-h-0' : 'max-h-[500px]'
          } overflow-hidden transition-[max-height] duration-300 ease-in-out lg:max-h-none`}
        >
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {sortedAchievements.map((achievement) => {
                const isRecent = achievement.unlocked && achievement.timestamp && 
                  (Date.now() - achievement.timestamp < 10000);
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg transition-all duration-500 ${
                      achievement.unlocked
                        ? 'bg-green-50 border border-green-200 shadow-sm'
                        : 'bg-gray-50 border border-gray-200'
                    } ${isRecent ? 'animate-pulse ring-4 ring-green-400 shadow-lg shadow-green-100 scale-[1.02]' : ''}`}
                  >
                    <div className="flex items-center">
                      <span 
                        className={`text-2xl mr-3 transition-transform duration-500 ${isRecent ? 'scale-125 animate-bounce' : ''}`}
                        role="img" 
                        aria-label={achievement.unlocked ? 'trophy' : 'locked'}
                      >
                        {achievement.unlocked ? '🏆' : '🔒'}
                      </span>
                      <div>
                        <h3 className={`font-semibold text-gray-900 ${isRecent ? 'text-green-700' : ''}`}>
                          {t(`achievements.${achievement.id}.title`)}
                        </h3>
                        {achievement.unlocked && (
                          <p className={`text-sm mt-1 ${isRecent ? 'text-green-600' : 'text-gray-600'}`}>
                            {t(`achievements.${achievement.id}.description`)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full transform transition-all">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {t('login.resetGame')}?
              </h3>
              <p className="text-gray-600 mb-6">
                {t('login.resetConfirmation')}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
                >
                  {t('login.cancel')}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  {t('login.resetGame')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 