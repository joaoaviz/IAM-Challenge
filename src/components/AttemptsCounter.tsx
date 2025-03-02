'use client'

import { useState, useEffect } from 'react'

interface AttemptsCounterProps {
  onAttemptsChange: (attempts: number) => void
  attempts: number
}

export function AttemptsCounter({ onAttemptsChange, attempts }: AttemptsCounterProps) {
  useEffect(() => {
    // Save to localStorage when attempts change
    if (attempts > 0) {
      localStorage.setItem('incorrectAttempts', attempts.toString())
    }
  }, [attempts])

  return (
    <div className="text-sm text-gray-600 text-center mb-6">
      Incorrect attempts: {attempts}
    </div>
  )
} 