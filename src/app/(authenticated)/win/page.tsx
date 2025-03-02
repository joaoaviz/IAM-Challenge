'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useAchievements } from '@/contexts/AchievementsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Cookies from 'js-cookie'

export default function Win() {
  const router = useRouter()
  const { achievements } = useAchievements()
  const { t } = useLanguage()
  const currentUser = Cookies.get('currentUser')

  useEffect(() => {
    // Check if user has completed the challenge
    const hasCompletedChallenge = achievements.some(a => 
      (a.id === 'robin_hood' && a.unlocked) || 
      (a.id === 'selfish_hacker' && a.unlocked)
    )

    // Allow access if user is joao or has completed the challenge
    if (currentUser !== 'joao' && !hasCompletedChallenge) {
      router.push('/dashboard')
    }
  }, [achievements, currentUser, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              {t('win.title')}
            </h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-success mb-4">
                  {t('win.vulnerabilities.title')}
                </h2>

                {/* User Enumeration */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-error mb-2">
                    {t('win.vulnerabilities.userEnumeration.title')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-error">{t('win.vulnerabilities.userEnumeration.exploited')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.userEnumeration.description')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-success">{t('win.vulnerabilities.userEnumeration.bestPractice')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.userEnumeration.solution')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brute Force */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-error mb-2">
                    {t('win.vulnerabilities.bruteForce.title')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-error">{t('win.vulnerabilities.bruteForce.exploited')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.bruteForce.description')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-success">{t('win.vulnerabilities.bruteForce.bestPractice')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.bruteForce.solution')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weak MFA */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-error mb-2">
                    {t('win.vulnerabilities.mfa.title')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-error">{t('win.vulnerabilities.mfa.exploited')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.mfa.description')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-success">{t('win.vulnerabilities.mfa.bestPractice')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.mfa.solution')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* IDOR/URL Manipulation */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-error mb-2">
                    {t('win.vulnerabilities.idor.title')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-error">{t('win.vulnerabilities.idor.exploited')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.idor.description')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-success">{t('win.vulnerabilities.idor.bestPractice')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.idor.solution')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Management */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-error mb-2">
                    {t('win.vulnerabilities.session.title')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-error">{t('win.vulnerabilities.session.exploited')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.session.description')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-success">{t('win.vulnerabilities.session.bestPractice')}</p>
                      <p className="text-gray-700">
                        {t('win.vulnerabilities.session.solution')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Course Links */}
              <section className="text-center space-y-4 mt-12">
                <h2 className="text-xl font-semibold mb-4">{t('win.learnMore.title')}</h2>
                <div className="space-x-4">
                  <a
                    href="/course"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t('win.learnMore.iamCourse')}
                  </a>
                  <a
                    href="https://portswigger.net/web-security/learning-path"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    {t('win.learnMore.owasp')}
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 