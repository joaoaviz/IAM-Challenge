'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { useLanguage } from '@/contexts/LanguageContext'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const { t } = useLanguage()

  // IAM Attack Statistics
  const attackStats = {
    labels: [
      t('dashboard.stats.phishing'),
      t('dashboard.stats.bruteforce'),
      t('dashboard.stats.privilegeEsc'),
      t('dashboard.stats.sessionHijack'),
      t('dashboard.stats.other')
    ],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ]
    }]
  }

  // IAM Best Practices Adoption
  const bestPracticesData = {
    labels: [
      t('dashboard.practices.mfa'),
      t('dashboard.practices.passwordPolicy'),
      t('dashboard.practices.accessReview'),
      t('dashboard.practices.logging'),
      t('dashboard.practices.automation')
    ],
    datasets: [{
      label: t('dashboard.practices.title'),
      data: [85, 75, 60, 90, 45],
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    }]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar showLogs={true} isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('dashboard.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IAM Attack Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.attackDistribution')}</h2>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut 
                data={attackStats}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* IAM Best Practices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.bestPractices')}</h2>
            <div className="h-[300px]">
              <Bar
                data={bestPracticesData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: (value) => `${value}%`
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* IAM Tips */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.tips.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">{t('dashboard.tips.mfa.title')}</h3>
                <p className="text-blue-600">{t('dashboard.tips.mfa.description')}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">{t('dashboard.tips.leastPrivilege.title')}</h3>
                <p className="text-green-600">{t('dashboard.tips.leastPrivilege.description')}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">{t('dashboard.tips.monitoring.title')}</h3>
                <p className="text-purple-600">{t('dashboard.tips.monitoring.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 