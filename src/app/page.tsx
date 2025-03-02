'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const { t } = useLanguage()
  const [openHint, setOpenHint] = useState<number | null>(null)

  const steps = [
    { id: 1, key: 'step1' },
    { id: 2, key: 'step2' },
    { id: 3, key: 'step3' },
    { id: 4, key: 'step4' },
    { id: 5, key: 'step5' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar showLogin={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t('home.title')}
          </h1>
          
          <div className="prose prose-lg mx-auto mb-12">
            <p className="text-xl text-gray-700 mb-8">
              {t('home.description')}
            </p>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('home.steps.title')}
              </h2>
              
              <div className="space-y-4">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {t(`home.steps.${step.key}.title`)}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {t(`home.steps.${step.key}.description`)}
                      </p>
                      
                      <button
                        onClick={() => setOpenHint(openHint === step.id ? null : step.id)}
                        className="mt-3 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="text-sm font-medium">Hint</span>
                        <ChevronDownIcon 
                          className={`w-4 h-4 ml-1 transform transition-transform ${
                            openHint === step.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {openHint === step.id && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                          {t(`home.steps.${step.key}.hint`)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('home.tips.title')}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>{t('home.tips.authentication')}</li>
                  <li>{t('home.tips.navigation')}</li>
                  <li>{t('home.tips.permissions')}</li>
                  <li>{t('home.tips.sessions')}</li>
                  <li>{t('home.tips.parameters')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <Link 
              href="/course"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {t('home.buttons.course')}
            </Link>
            
            <a 
              href="https://portswigger.net/web-security/authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              {t('home.buttons.owasp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 