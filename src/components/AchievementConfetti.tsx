'use client'

import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

interface AchievementConfettiProps {
  x: number
  y: number
  duration: number
}

export function AchievementConfetti({ x, y, duration }: AchievementConfettiProps) {
  const [isActive, setIsActive] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    // Update on resize
    window.addEventListener('resize', handleResize)
    
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration) // Use the provided duration

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [duration])

  if (!isActive || x === 0) return null

  return (
    <ReactConfetti
      width={300}
      height={300}
      recycle={false}
      numberOfPieces={100}
      gravity={0.3}
      initialVelocityX={10}
      initialVelocityY={10}
      confettiSource={{
        x: x,
        y: y,
        w: 10,
        h: 10
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1000,
        left: x - 150, // Center the confetti
        top: y - 150,
        willChange: 'transform', // Performance optimization
      }}
    />
  )
} 