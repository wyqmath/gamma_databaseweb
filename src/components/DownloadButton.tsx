'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface DownloadButtonProps {
  content: string
  filename: string
  mimeType?: string
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function DownloadButton({
  content,
  filename,
  mimeType = 'text/plain',
  children,
  variant = 'outline',
  size = 'sm',
  className = ''
}: DownloadButtonProps) {
  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: mimeType })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(element.href)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
    >
      {children}
    </Button>
  )
}
