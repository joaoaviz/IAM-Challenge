'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ErrorMessageProps {
  message: string | null
  isPasswordError?: boolean
  isFirstPasswordError?: boolean
}

export function ErrorMessage({ message, isPasswordError, isFirstPasswordError }: ErrorMessageProps) {
  const [glowDuration, setGlowDuration] = useState(0)

  useEffect(() => {
    if (message) {
      if (isFirstPasswordError) {
        setGlowDuration(5) // 5 seconds for first password error
      } else if (isPasswordError) {
        setGlowDuration(3) // 3 seconds for subsequent password errors
      } else {
        setGlowDuration(2) // 2 seconds for other errors
      }
    }
  }, [message, isPasswordError, isFirstPasswordError])

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: isPasswordError ? [1, 1.1, 1] : 1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30,
              scale: {
                duration: 0.3,
                repeat: 2,
                repeatType: "reverse"
              }
            }
          }}
          exit={{ opacity: 0, y: 10 }}
          className={`mt-4 p-3 rounded-md text-center font-medium ${
            isPasswordError 
              ? 'bg-red-100 text-red-800 border-2 border-red-300'
              : 'text-red-600 text-sm'
          }`}
          style={{
            animation: glowDuration > 0 ? `glow ${glowDuration}s ease-in-out` : undefined,
          }}
        >
          <style jsx>{`
            @keyframes glow {
              0%, 100% {
                box-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 15px #ef4444;
              }
              50% {
                box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444;
              }
            }
          `}</style>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 