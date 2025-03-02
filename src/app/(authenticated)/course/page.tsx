'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'

interface CourseSection {
  title: string
  content: string[]
}

const courseSections: CourseSection[] = [
  {
    title: 'Introduction to Identity and Access Management',
    content: [
      'Identity and Access Management (IAM) is a framework of policies and technologies ensuring that the right users have appropriate access to technology resources.',
      'IAM systems provide the tools and capabilities to store and manage user identities and access permissions.',
      'Proper IAM implementation is crucial for both security and user experience.',
    ],
  },
  {
    title: 'Common IAM Vulnerabilities',
    content: [
      'User enumeration through inconsistent error messages',
      'Weak password policies and lack of brute force protection',
      'Insufficient multi-factor authentication implementation',
      'Improper access control and authorization checks',
      'Poor session management practices',
    ],
  },
  {
    title: 'Best Practices for IAM Security',
    content: [
      'Implement consistent error messages for authentication failures',
      'Enforce strong password policies and account lockout mechanisms',
      'Use secure MFA methods with proper implementation',
      'Validate permissions on every request, not just UI elements',
      'Implement proper session management with secure token handling',
    ],
  },
  {
    title: 'Real-World Impact',
    content: [
      'Data breaches often result from compromised credentials',
      'Unauthorized access can lead to financial and reputational damage',
      'Proper IAM can prevent many common security incidents',
      'Regular security assessments help identify vulnerabilities',
    ],
  },
]

export default function Course() {
  const [currentSection, setCurrentSection] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold text-center mb-12">
              Introduction to IAM Security
            </h1>

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              {courseSections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentSection === index
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Section {index + 1}
                </button>
              ))}
            </div>

            {/* Current Section Content */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {courseSections[currentSection].title}
              </h2>
              
              <div className="space-y-4">
                {courseSections[currentSection].content.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                disabled={currentSection === 0}
                className={`btn ${
                  currentSection === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-secondary'
                }`}
              >
                Previous Section
              </button>

              <button
                onClick={() => setCurrentSection(prev => Math.min(courseSections.length - 1, prev + 1))}
                disabled={currentSection === courseSections.length - 1}
                className={`btn ${
                  currentSection === courseSections.length - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                Next Section
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 