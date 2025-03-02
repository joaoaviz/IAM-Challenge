'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useLanguage } from '@/contexts/LanguageContext'

interface LogEntry {
  timestamp: string
  ip: string
  path: string
  method: string
  status: number
  style?: string
}

const generateRandomIP = () => {
  return Array.from({ length: 4 }, () => 
    Math.floor(Math.random() * 256)
  ).join('.')
}

const devCommentKeys = ['frontEnd', 'backEnd', 'devOps']

const generateRandomLog = (): LogEntry => {
  const paths = ['/home', '/dashboard', '/logs']
  // Add admin path with lower probability (10%)
  if (Math.random() < 0.1) {
    paths.push('/admin')
  }
  const methods = ['GET', 'POST']
  const statuses = [200, 401, 403, 404]
  
  return {
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 60000)).toISOString(),
    ip: generateRandomIP(),
    path: paths[Math.floor(Math.random() * paths.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

export default function Logs() {
  const router = useRouter()
  const { t } = useLanguage()
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Generate initial logs
  useEffect(() => {
    const initialLogs = Array.from({ length: 19 }, generateRandomLog);
    // Ensure at least one /admin log
    initialLogs.push({
      timestamp: new Date().toISOString(),
      ip: generateRandomIP(),
      path: '/admin',
      method: 'GET',
      status: 403,
      style: ''
    });
    setLogs(initialLogs);
  }, []);

  // Add new logs periodically
  useEffect(() => {
    let timer = 0;
    const interval = setInterval(() => {
      timer += 3; // Increment by 3 seconds each interval
      setLogs(prevLogs => {
        const newLog = generateRandomLog();
        // Increase /admin frequency over time
        if (timer >= 15 && Math.random() < 0.3) {
          newLog.path = '/admin';
        }
        if (timer >= 40 && Math.random() < 0.5) {
          newLog.path = '/admin';
        }
        if (timer >= 60 && Math.random() < 0.6) {
          newLog.path = '/admin';
        }

        const updatedLogs = [newLog, ...prevLogs.slice(0, 49)]; // Keep last 50 logs, newest first

        // Apply styles based on time
        return updatedLogs.map(log => {
          if (log.path === '/admin') {
            if (timer >= 40 && timer < 60) {
              log.style = 'font-bold'; // Bold after 40 seconds
            } else if (timer >= 60) {
              log.style = 'font-bold text-lg'; // Bold and larger after 60 seconds
            }
          }
          return log;
        });
      });

      if (timer === 90) {
        setLogs(prevLogs => {
          const hintLog = {
            timestamp: new Date().toISOString(),
            ip: 'N/A',
            path: t('logs.finalHint'),
            method: 'HINT',
            status: 200,
            style: 'font-bold text-lg'
          };
          return [hintLog, ...prevLogs.slice(1)];
        });
      }
    }, 3000); // Generate a new log every 3 seconds

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar showLogs={true} isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('logs.title')}</h1>

          {/* Log Table in Scrollable Container */}
          <div className="mb-8 -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('logs.tableHeaders.timestamp')}
                      </th>
                      <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('logs.tableHeaders.ipAddress')}
                      </th>
                      <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('logs.tableHeaders.method')}
                      </th>
                      <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('logs.tableHeaders.path')}
                      </th>
                      <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('logs.tableHeaders.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log, index) => (
                      <tr key={index} className={log.style}>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          {formatTimestamp(log.timestamp)}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          {log.ip}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          {log.method}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          {log.path}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          {log.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Developer Notes */}
          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-gray-900">{t('logs.devNotes.title')}</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="font-medium text-yellow-800">{t('logs.devNotes.frontEnd.author')}</div>
              <p className="text-yellow-700 mt-1">{t('logs.devNotes.frontEnd.comment')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 