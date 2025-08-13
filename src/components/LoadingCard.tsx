import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface LoadingCardProps {
  className?: string
  showHeader?: boolean
  lines?: number
}

export default function LoadingCard({ 
  className = "", 
  showHeader = true, 
  lines = 3 
}: LoadingCardProps) {
  return (
    <Card className={`bg-slate-800/50 border-slate-700 animate-pulse ${className}`}>
      {showHeader && (
        <CardHeader>
          <div className="h-6 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`h-4 bg-slate-700 rounded ${
              i === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        ))}
      </CardContent>
    </Card>
  )
}

export function LoadingGrid({ 
  count = 6, 
  className = "" 
}: { 
  count?: number
  className?: string 
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

export function LoadingList({ 
  count = 5, 
  className = "" 
}: { 
  count?: number
  className?: string 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} showHeader={false} lines={2} />
      ))}
    </div>
  )
}
