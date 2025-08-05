'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Zap,
  Database,
  Search,
  TreePine,
  Layers,
  Network,
  X,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QuickAccessItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

const quickAccessItems: QuickAccessItem[] = [
  {
    label: 'Subunit Database',
    href: '/subunits',
    icon: Database,
    color: 'text-cyan-400',
    description: 'PSEN1, NCT, APH-1, PEN-2'
  },
  {
    label: 'Species Index',
    href: '/species',
    icon: Search,
    color: 'text-green-400',
    description: 'Browse all organisms'
  },
  {
    label: 'Evolution Tree',
    href: '/evolution',
    icon: TreePine,
    color: 'text-purple-400',
    description: 'Phylogenetic analysis'
  },
  {
    label: 'Complex Assembly',
    href: '/complex',
    icon: Layers,
    color: 'text-orange-400',
    description: '3D structure view'
  },
  {
    label: 'Protein Interactions',
    href: '/interactions',
    icon: Network,
    color: 'text-blue-400',
    description: 'Interaction networks'
  },
  {
    label: 'Explore Species',
    href: '/explore',
    icon: Zap,
    color: 'text-yellow-400',
    description: 'Guided exploration'
  }
]

interface QuickAccessMenuProps {
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export default function QuickAccessMenu({ 
  className, 
  position = 'bottom-right' 
}: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const menuPositionClasses = {
    'bottom-right': 'bottom-16 right-0',
    'bottom-left': 'bottom-16 left-0',
    'top-right': 'top-16 right-0',
    'top-left': 'top-16 left-0'
  }

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      {/* Quick Access Menu */}
      {isOpen && (
        <div className={cn(
          "absolute w-80 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl",
          menuPositionClasses[position]
        )}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Quick Access</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {quickAccessItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className={cn("h-5 w-5", item.color)} />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-slate-400 text-xs truncate">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-12 w-12 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg",
          "transition-all duration-200 hover:scale-110"
        )}
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <Zap className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}

// Simplified version for inline use
export function InlineQuickAccess({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-3", className)}>
      {quickAccessItems.slice(0, 6).map((item) => {
        const IconComponent = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-colors group"
          >
            <IconComponent className={cn("h-4 w-4", item.color)} />
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-xs group-hover:text-cyan-400 transition-colors truncate">
                {item.label}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
