'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useAchievements } from '@/contexts/AchievementsContext'
import { AttemptsCounter } from '@/components/AttemptsCounter'
import { ErrorMessage } from '@/components/ErrorMessage'
import Cookies from 'js-cookie'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Login() {
  const router = useRouter()
  const { unlockAchievement } = useAchievements()
  const { t } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState('')
  const [globalAttempts, setGlobalAttempts] = useState(0)
  const [exaltAttempts, setExaltAttempts] = useState(0)
  const [morganAttempts, setMorganAttempts] = useState(0)
  const [elodieAttempts, setElodieAttempts] = useState(0)
  const [mfaCode, setMfaCode] = useState('')
  const [showMfa, setShowMfa] = useState(false)
  const [mfaAttempts, setMfaAttempts] = useState(0)
  const [seenPasswordErrors, setSeenPasswordErrors] = useState<Set<string>>(new Set())
  const [countdown, setCountdown] = useState(120)

  useEffect(() => {
    // Check for the straight_to_point achievement cookie
    const straightToPointCookie = Cookies.get('unlock_straight_to_point')
    if (straightToPointCookie) {
      unlockAchievement('straight_to_point')
      Cookies.remove('unlock_straight_to_point', { path: '/' })
    }

    // Check for the path_finder achievement cookie
    const pathFinderCookie = Cookies.get('unlock_path_finder')
    if (pathFinderCookie) {
      unlockAchievement('path_finder')
      Cookies.remove('unlock_path_finder', { path: '/' })
    }

    // Initialize attempts from localStorage
    const saved = localStorage.getItem('incorrectAttempts')
    if (saved) {
      const initialAttempts = parseInt(saved, 10)
      if (!isNaN(initialAttempts) && initialAttempts > 0) {
        setGlobalAttempts(initialAttempts)
      } else {
        localStorage.removeItem('incorrectAttempts')
        setGlobalAttempts(0)
      }
    } else {
      setGlobalAttempts(0)
    }
  }, [unlockAchievement])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showMfa && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [showMfa, countdown])

  useEffect(() => {
    if (showMfa) {
      setCountdown(120)
    }
  }, [showMfa])

  const handleAttemptsChange = (attempts: number) => {
    setGlobalAttempts(attempts)
  }

  const incrementAttempts = () => {
    const newAttempts = globalAttempts + 1
    setGlobalAttempts(newAttempts)
    localStorage.setItem('incorrectAttempts', newAttempts.toString())
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setHint('')

    // Special case for Joao (case sensitive)
    if (username === 'Joao') {
      if (password === 'AVIZ') {
        // Unlock all achievements
        [
          'user_enumeration',
          'password_cracker',
          'mfa_destroyer',
          'path_finder',
          'too_good',
          'gimme_money',
          'straight_to_point',
          'robin_hood',
          'selfish_hacker'
        ].forEach(achievement => unlockAchievement(achievement))

        // Set the user and additional cookies to enable all features
        Cookies.set('currentUser', username, { path: '/' })
        Cookies.set('isAdmin', 'true', { path: '/' })
        Cookies.set('isBoss', 'true', { path: '/' })
        
        // Set localStorage flags for navigation
        if (typeof window !== 'undefined') {
          localStorage.setItem('showAllButtons', 'true')
          localStorage.setItem('bypassAuth', 'true')
        }

        // Redirect to win page
        router.push('/win')
        return
      } else {
        setError('WHAT ARE YOU DOING?')
        incrementAttempts()
        return
      }
    }

    // Convert username to lowercase for case-insensitive comparison
    const lowercaseUsername = username.toLowerCase()

    // Check for valid usernames (case-insensitive)
    const validUsers = ['exalt', 'morgan', 'elodie']
    if (!validUsers.includes(lowercaseUsername)) {
      setError(t('login.errorUsername'))
      incrementAttempts()
      
      // Show hint after 10 global attempts if no valid login
      if (globalAttempts >= 9) {
        setHint(t('login.companyNameHint'))
      }
      return
    } else {
      // User found a valid username
      unlockAchievement('user_enumeration')
    }

    // Track attempts for specific accounts
    if (lowercaseUsername === 'exalt') {
      setExaltAttempts(prev => prev + 1)
      if (exaltAttempts >= 4) {  // Changed from 9 to 4 to show hint after 5 attempts
        setHint(t('login.exaltHint'))
      }
      if (exaltAttempts === 2) {  // Show home page hint earlier
        setHint(t('login.homePageHint'))
      }
    } else if (lowercaseUsername === 'morgan' || lowercaseUsername === 'elodie') {
      if (lowercaseUsername === 'morgan') {
        setMorganAttempts(prev => prev + 1)
        if (morganAttempts >= 4) {  // Changed from 9 to 4
          setHint('Hint: The bosses really like each other')
        }
        if (morganAttempts === 2) {  // Show home page hint earlier
          setHint(t('login.homePageHint'))
        }
      } else {
        setElodieAttempts(prev => prev + 1)
        if (elodieAttempts >= 4) {  // Changed from 9 to 4
          setHint('Hint: The bosses really like each other')
        }
        if (elodieAttempts === 2) {  // Show home page hint earlier
          setHint(t('login.homePageHint'))
        }
      }
    }

    // Check if this is the first password error for this user
    const isFirstPasswordError = !seenPasswordErrors.has(lowercaseUsername)

    // Validate passwords (case-insensitive)
    if (lowercaseUsername === 'exalt' && password.toLowerCase() !== 'shield') {
      setError(t('login.errorPassword'))
      setSeenPasswordErrors(prev => new Set(Array.from(prev).concat(lowercaseUsername)))
      incrementAttempts()
      return
    }

    if (lowercaseUsername === 'morgan' && password.toLowerCase() !== 'elodie') {
      setError(t('login.errorPassword'))
      setSeenPasswordErrors(prev => new Set(Array.from(prev).concat(lowercaseUsername)))
      incrementAttempts()
      return
    }

    if (lowercaseUsername === 'elodie' && password.toLowerCase() !== 'morgan') {
      setError(t('login.errorPassword'))
      setSeenPasswordErrors(prev => new Set(Array.from(prev).concat(lowercaseUsername)))
      incrementAttempts()
      return
    }

    // Password is correct
    unlockAchievement('password_cracker')

    // If it's a boss account, show MFA
    if (lowercaseUsername === 'morgan' || lowercaseUsername === 'elodie') {
      setShowMfa(true)
      setHint('')
      // Clear any existing MFA code when showing the form
      setMfaCode('')
      return
    }

    // Store the logged-in user with proper capitalization
    const properUsername = lowercaseUsername === 'exalt' ? 'exalt' : 
                         lowercaseUsername === 'morgan' ? 'Morgan' : 
                         lowercaseUsername === 'elodie' ? 'Elodie' : username
    Cookies.set('currentUser', properUsername, { path: '/' })

    // Successful login for non-boss accounts
    router.push('/dashboard')
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setHint('')
    
    if (mfaCode !== '1234') {
      setMfaAttempts(prev => prev + 1)
      incrementAttempts()
      
      if (mfaAttempts === 4) {
        setHint(t('login.mfa.hints.noMaxAttempts'))
      } else if (mfaAttempts === 9) {
        setHint(t('login.mfa.hints.simpleDemo'))
      } else if (mfaAttempts === 14) {
        setHint(t('login.mfa.hints.tryCode'))
      } else {
        setError(t('login.mfa.error'))
      }
      return
    }

    // MFA successful
    unlockAchievement('mfa_destroyer')

    // Store the logged-in user with proper capitalization
    const properUsername = username.toLowerCase() === 'morgan' ? 'Morgan' : 'Elodie'
    Cookies.set('currentUser', properUsername, { path: '/' })

    // Successful login with MFA
    router.push('/dashboard')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">{t('login.title')}</h2>
          
          <AttemptsCounter onAttemptsChange={handleAttemptsChange} attempts={globalAttempts} />

          {/* Hint display */}
          {hint && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
              {hint}
            </div>
          )}

          {!showMfa ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  {t('login.username')}
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-full mt-1 text-gray-900 bg-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('login.password')}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full mt-1 text-gray-900 bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('login.loginButton')}
              </button>
            </form>
          ) : (
            // MFA Form
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('login.mfa.title')}</h3>
                <p className="text-gray-600 mb-6">{t('login.mfa.description')}</p>
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-center gap-2">
                    <input
                      type="text"
                      id="mfaCode"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      className="block w-48 text-center tracking-[0.5em] text-xl py-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••"
                      maxLength={4}
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {t('login.mfa.expiresIn')} <span className="font-medium text-gray-700">{formatTime(countdown)}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t('login.mfa.verifyButton')}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowMfa(false)}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    ← {t('login.mfa.backToLogin')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {error && (
            <ErrorMessage 
              message={error} 
              isPasswordError={error === t('login.errorPassword')}
              isFirstPasswordError={
                error === t('login.errorPassword') && 
                !seenPasswordErrors.has(username.toLowerCase())
              }
            />
          )}
        </div>
      </div>
    </div>
  )
} 