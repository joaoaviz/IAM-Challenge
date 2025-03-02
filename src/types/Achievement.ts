export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  timestamp?: number // Optional timestamp for when the achievement was unlocked
} 