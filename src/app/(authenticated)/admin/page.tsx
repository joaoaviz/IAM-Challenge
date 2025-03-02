'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAchievements } from '@/contexts/AchievementsContext'
import Cookies from 'js-cookie'
import { Line } from 'react-chartjs-2'
import ReactConfetti from 'react-confetti'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Admin() {
  const router = useRouter()
  const { t } = useLanguage()
  const { unlockAchievement } = useAchievements()
  const [revenue, setRevenue] = useState(5000000)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showIndividualForm, setShowIndividualForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [showWinButton, setShowWinButton] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const currentUser = Cookies.get('currentUser')
  const isBoss = currentUser?.toLowerCase() === 'morgan' || currentUser?.toLowerCase() === 'elodie'
  const isJoao = currentUser?.toLowerCase() === 'joao'
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null)
  const [fadeTimeout, setFadeTimeout] = useState<NodeJS.Timeout | null>(null)
  const [successTimeout, setSuccessTimeout] = useState<NodeJS.Timeout | null>(null)
  const [successFadeTimeout, setSuccessFadeTimeout] = useState<NodeJS.Timeout | null>(null)

  // Check if user has completed the game before
  const hasCompletedBefore = Cookies.get('gameCompleted')

  // Unlock path_finder achievement if user is exalt
  useEffect(() => {
    if (currentUser?.toLowerCase() === 'exalt') {
      unlockAchievement('path_finder')
    }
  }, [currentUser, unlockAchievement])

  const startCelebration = () => {
    if (!hasCompletedBefore) {
      setShowConfetti(true)
      Cookies.set('gameCompleted', 'true', { expires: 365 }) // Set cookie to expire in 1 year
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000) // Stop confetti after 5 seconds
    }
  }

  // Generate random revenue increase
  useEffect(() => {
    // Set initial random value after mount
    setRevenue(5000000 + Math.random() * 200000)
    
    const interval = setInterval(() => {
      setRevenue(prev => prev + 10000 + Math.random() * 90000)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Chart data
  const chartData = {
    labels: ['2020', '2021', '2022', '2023', '2024 (proj)'],
    datasets: [
      {
        label: t('admin.revenue.title'),
        data: [500000000, 800000000, 1200000000, 1500000000, 2500000000],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  }

  const startErrorTimer = () => {
    // Clear any existing timeouts
    if (errorTimeout) {
      clearTimeout(errorTimeout)
    }
    if (fadeTimeout) {
      clearTimeout(fadeTimeout)
    }

    // Reset error element opacity
    const errorElement = document.querySelector('.error-popup') as HTMLElement
    if (errorElement) {
      errorElement.style.opacity = '1'
      errorElement.style.transition = 'opacity 2s'
    }

    // Set new timeouts for the current error
    const newErrorTimeout = setTimeout(() => {
      const currentErrorElement = document.querySelector('.error-popup') as HTMLElement
      if (currentErrorElement) {
        currentErrorElement.style.opacity = '0'
      }
      const newFadeTimeout = setTimeout(() => setError(null), 2000)
      setFadeTimeout(newFadeTimeout)
    }, 10000)

    setErrorTimeout(newErrorTimeout)
  }

  const startSuccessTimer = () => {
    // Clear any existing timeouts
    if (successTimeout) {
      clearTimeout(successTimeout)
    }
    if (successFadeTimeout) {
      clearTimeout(successFadeTimeout)
    }

    // Reset success element opacity
    const successElement = document.querySelector('.success-popup') as HTMLElement
    if (successElement) {
      successElement.style.opacity = '1'
      successElement.style.transition = 'opacity 2s'
    }

    // Set new timeouts for the current success message
    const newSuccessTimeout = setTimeout(() => {
      const currentSuccessElement = document.querySelector('.success-popup') as HTMLElement
      if (currentSuccessElement) {
        currentSuccessElement.style.opacity = '0'
      }
      const newFadeTimeout = setTimeout(() => setSuccess(null), 2000)
      setSuccessFadeTimeout(newFadeTimeout)
    }, 10000)

    setSuccessTimeout(newSuccessTimeout)
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }
      if (fadeTimeout) {
        clearTimeout(fadeTimeout)
      }
      if (successTimeout) {
        clearTimeout(successTimeout)
      }
      if (successFadeTimeout) {
        clearTimeout(successFadeTimeout)
      }
    }
  }, [errorTimeout, fadeTimeout, successTimeout, successFadeTimeout])

  const handleGiveRaise = () => {
    if (!currentUser) {
      setError(t('admin.actions.raise.notConnected'))
      startErrorTimer()
      return
    }

    if (!isBoss) {
      unlockAchievement('too_good')
      setError(t('admin.actions.raise.collectiveError').replace('!', '!\n'))
      startErrorTimer()
      return
    }

    unlockAchievement('robin_hood')
    setSuccess(t('admin.actions.raise.successMessages.collective'))
    startSuccessTimer()
    startCelebration()
    
    // Only auto-redirect for joao, show button for others
    if (isJoao) {
      setTimeout(() => {
        router.push('/win')
      }, 3000)
    } else {
      setShowWinButton(true)
    }
  }

  const handleIndividualRaise = () => {
    setShowIndividualForm(true)
  }

  const handleIndividualRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) {
      setError(t('admin.actions.raise.notConnected'))
      startErrorTimer()
      return
    }

    if (!isBoss) {
      unlockAchievement('gimme_money')
      setError(t('admin.actions.raise.individualError').replace('{employee}', selectedEmployee))
      startErrorTimer()
    } else {
      unlockAchievement('selfish_hacker')
      setSuccess(t('admin.actions.raise.successMessages.individual').replace('{employee}', selectedEmployee))
      startSuccessTimer()
      startCelebration()
      
      // Only auto-redirect for joao, show button for others
      if (isJoao) {
        setTimeout(() => {
          router.push('/win')
        }, 3000)
      } else {
        setShowWinButton(true)
      }
    }
    
    setShowIndividualForm(false)
    setSelectedEmployee('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <Navbar showLogs={true} isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('admin.title')}</h1>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">{t('admin.revenue.current')}</h3>
              <p className="text-3xl font-bold text-blue-600">€{revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">{t('admin.stats.growth')}</h3>
              <p className="text-3xl font-bold text-green-600">+125%</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">{t('admin.stats.employees')}</h3>
              <p className="text-3xl font-bold text-purple-600">1,500+</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('admin.revenue.title')}</h2>
            <div className="h-[400px]">
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleGiveRaise}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {t('admin.actions.raise.button')}
            </button>

            <button
              onClick={handleIndividualRaise}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t('admin.actions.raise.individual.button')}
            </button>

            {showWinButton && (
              <button
                onClick={() => router.push('/win')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                {t('admin.actions.raise.continueToWin')}
              </button>
            )}

            {error && (
              <div className="fixed top-16 left-4 p-4 bg-red-50 text-red-800 rounded-md shadow-lg error-popup flex items-start gap-4" style={{ opacity: 1, transition: 'opacity 2s' }}>
                <span className="text-4xl">⚠️</span>
                <div className="flex flex-col gap-2">
                  {error.split('\n').map((line, index) => (
                    <p key={index} className="font-bold text-lg">{line}</p>
                  ))}
                </div>
              </div>
            )}

            {success && (
              <div className="fixed top-16 left-4 p-4 bg-green-50 text-green-800 rounded-md shadow-lg success-popup flex items-start gap-4" style={{ opacity: 1, transition: 'opacity 2s' }}>
                <span className="text-4xl">🎉</span>
                <div className="flex flex-col gap-2">
                  {success.split('\n').map((line, index) => (
                    <p key={index} className="font-bold text-lg">{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Raise Form Modal */}
            {showIndividualForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('admin.actions.raise.individual.title')}
                  </h3>
                  <form onSubmit={handleIndividualRaiseSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t('admin.actions.raise.individual.label')}
                      </label>
                      <input
                        type="text"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowIndividualForm(false)}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                      >
                        {t('admin.actions.raise.individual.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {t('admin.actions.raise.individual.submit')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 