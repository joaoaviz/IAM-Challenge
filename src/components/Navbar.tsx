'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LanguageIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useAchievements } from '@/contexts/AchievementsContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface NavbarProps {
  showLogin?: boolean
  showLogs?: boolean
  showAdmin?: boolean
  isLoggedIn?: boolean
  onLanguageToggle?: () => void
  onLogout?: () => void
}

export function Navbar({
  showLogin = false,
  showLogs = false,
  showAdmin = false,
  isLoggedIn = false,
  onLanguageToggle,
  onLogout,
}: NavbarProps) {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [showAllButtons, setShowAllButtons] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { achievements } = useAchievements()
  const { toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const user = Cookies.get('currentUser')
    setCurrentUser(user || null)
    
    // Check if all buttons should be shown (for joao)
    if (typeof window !== 'undefined') {
      setShowAllButtons(localStorage.getItem('showAllButtons') === 'true')
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('currentUser', { path: '/' })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('showAllButtons')
      localStorage.removeItem('shownAchievements')
    }
    window.location.href = '/login'
  }

  // Check if we're on an authenticated page
  const isAuthPage = ['/dashboard', '/admin', '/logs', '/win', '/course'].some(path => 
    pathname.startsWith(path)
  )

  // Check if current user is a boss (Elodie or Morgan) or joao
  const isBoss = (currentUser?.toLowerCase() === 'elodie' || 
                currentUser?.toLowerCase() === 'morgan' || 
                currentUser === 'joao' ||
                showAllButtons) &&
                currentUser?.toLowerCase() !== 'exalt'

  // Check if user is logged in
  const isUserLoggedIn = Boolean(currentUser) || isLoggedIn

  // Check if user has completed the game
  const hasCompletedGame = currentUser === 'joao' || achievements.some(a => 
    (a.id === 'robin_hood' && a.unlocked) || 
    (a.id === 'selfish_hacker' && a.unlocked)
  )

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-nav')
      if (nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <nav className="bg-gray-800 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Home button - always visible */}
            <Link href="/" className="flex items-center ml-2 md:ml-0">
              <span className="text-xl font-semibold text-white">{t('nav.home')}</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:ml-4 space-x-4">
              {/* Dashboard button - shown when logged in */}
              {isUserLoggedIn && (
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.dashboard')}
                </Link>
              )}

              {/* View Logs button - shown for logged in users */}
              {isUserLoggedIn && (
                <Link
                  href="/logs"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/logs'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.viewLogs')}
                </Link>
              )}

              {/* Win button - shown when game is completed */}
              {isUserLoggedIn && hasCompletedGame && (
                <Link
                  href="/win"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/win'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.win')}
                </Link>
              )}

              {/* Admin button - shown for bosses, joao, or when showAdmin is true */}
              {(showAdmin || isBoss) && isUserLoggedIn && (
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/admin'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.admin')}
                </Link>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              aria-label="Toggle language"
            >
              <LanguageIcon className="h-6 w-6" />
            </button>

            {/* User Avatar and Name - shown when logged in */}
            {currentUser && (
              <div className="hidden md:flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">
                  {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}
                </span>
              </div>
            )}

            {/* Login/Logout button */}
            {(showLogin || isAuthPage) && (
              <div className="hidden md:block">
                {currentUser ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t('nav.logout')}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/login'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute w-full bg-gray-800 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isUserLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/dashboard'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {t('nav.dashboard')}
              </Link>

              <Link
                href="/logs"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/logs'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {t('nav.viewLogs')}
              </Link>

              {hasCompletedGame && (
                <Link
                  href="/win"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/win'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.win')}
                </Link>
              )}

              {(showAdmin || isBoss) && (
                <Link
                  href="/admin"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/admin'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {t('nav.admin')}
                </Link>
              )}
            </>
          )}

          {/* Mobile user info and logout */}
          {currentUser && (
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-3">
                <UserCircleIcon className="h-8 w-8 text-gray-300" />
                <span className="ml-3 text-base font-medium text-gray-300">
                  {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}
                </span>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-left"
                >
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          )}

          {/* Mobile login button */}
          {!currentUser && (showLogin || isAuthPage) && (
            <Link
              href="/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/login'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 