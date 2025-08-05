'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {/* Home link */}
        <li>
          <Link 
            href="/" 
            className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-500 mx-1" />
            {item.current || !item.href ? (
              <span 
                className={cn(
                  "font-medium",
                  item.current ? "text-cyan-400" : "text-slate-300"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Utility function to generate breadcrumb items based on pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Map of path segments to readable labels
  const labelMap: Record<string, string> = {
    'species': 'Species Index',
    'subunits': 'Subunit Database',
    'evolution': 'Evolution Analysis',
    'explore': 'Explore Species',
    'complex': 'Complex Assembly',
    'interactions': 'Protein Interactions',
    'comparison': 'Species Comparison',
    'admin': 'Admin Panel',
    'about': 'About Project',
    'login': 'Login',
    'psen1': 'PSEN1',
    'nct': 'NCT',
    'aph1': 'APH-1',
    'pen2': 'PEN-2'
  }

  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    
    breadcrumbs.push({
      label: labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
      current: isLast
    })
  })

  return breadcrumbs
}
