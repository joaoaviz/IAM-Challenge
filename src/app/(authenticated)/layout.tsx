import { AchievementsPanel } from '@/components/AchievementsPanel'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
      <div className="w-80 p-4 hidden lg:block">
        <AchievementsPanel />
      </div>
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-4 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-h-[60vh] overflow-y-auto">
          <AchievementsPanel />
        </div>
      </div>
    </div>
  )
} 