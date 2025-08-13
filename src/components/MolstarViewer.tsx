'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Download, Maximize2, Eye, EyeOff, Loader2 } from 'lucide-react'

interface MolstarViewerProps {
  structureFile: string
  proteinName: string
  species: string
  comparisonSpecies?: string
  className?: string
}

declare global {
  interface Window {
    PDBeMolstarPlugin: unknown
  }
}

export default function MolstarViewer({ 
  structureFile, 
  proteinName, 
  species, 
  comparisonSpecies,
  className = ""
}: MolstarViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstanceRef = useRef<unknown>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMolstar = async () => {
      try {
        // Load Molstar CSS
        if (!document.querySelector('link[href*="pdbe-molstar"]')) {
          const cssLink = document.createElement('link')
          cssLink.rel = 'stylesheet'
          cssLink.type = 'text/css'
          cssLink.href = 'https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar.css'
          document.head.appendChild(cssLink)
        }

        // Load Molstar JS
        if (!window.PDBeMolstarPlugin) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/pdbe-molstar@3.2.0/build/pdbe-molstar-plugin.js'
          script.onload = () => initViewer()
          script.onerror = () => setError('Failed to load Molstar library')
          document.head.appendChild(script)
        } else {
          initViewer()
        }
      } catch {
        setError('Failed to initialize Molstar viewer')
        setIsLoading(false)
      }
    }

    const initViewer = () => {
      if (!viewerRef.current || !window.PDBeMolstarPlugin) return

      try {
        // Create plugin instance
        const viewerInstance = new (window.PDBeMolstarPlugin as new () => unknown)()
        viewerInstanceRef.current = viewerInstance

        // Set options
        const options = {
          customData: {
            url: structureFile.startsWith('/') ? `${window.location.origin}${structureFile}` : structureFile,
            format: 'cif',
          },
          bgColor: { r: 15, g: 23, b: 42 }, // slate-900 background
          hideCanvasControls: ['expand', 'selection', 'animation', 'controlToggle', 'controlInfo'],
          sequencePanel: false,
          landscape: true,
          hideControls: true,
          expanded: false,
        }

        // Render the viewer
        ;(viewerInstance as { render: (element: HTMLElement, options: unknown) => void }).render(viewerRef.current, options)
        
        // Set loading to false after a short delay to allow rendering
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)

      } catch (err) {
        console.error('Error initializing Molstar viewer:', err)
        setError('Failed to render structure')
        setIsLoading(false)
      }
    }

    loadMolstar()

    // Cleanup
    return () => {
      if (viewerInstanceRef.current) {
        try {
          // Clean up the viewer instance if possible
          viewerInstanceRef.current = null
        } catch (err) {
          console.error('Error cleaning up viewer:', err)
        }
      }
    }
  }, [structureFile])

  const resetView = () => {
    if (viewerInstanceRef.current && viewerRef.current) {
      try {
        // Clear the current viewer and reinitialize
        viewerRef.current.innerHTML = ''
        setIsLoading(true)

        // Reinitialize the viewer
        setTimeout(() => {
          if (viewerRef.current && window.PDBeMolstarPlugin) {
            const viewerInstance = new (window.PDBeMolstarPlugin as new () => unknown)()
            viewerInstanceRef.current = viewerInstance

            const options = {
              customData: {
                url: structureFile.startsWith('/') ? `${window.location.origin}${structureFile}` : structureFile,
                format: 'cif',
              },
              bgColor: { r: 15, g: 23, b: 42 },
              hideCanvasControls: ['expand', 'selection', 'animation', 'controlToggle', 'controlInfo'],
              sequencePanel: false,
              landscape: true,
              hideControls: true,
              expanded: false,
            }

            ;(viewerInstance as { render: (element: HTMLElement, options: unknown) => void }).render(viewerRef.current, options)

            setTimeout(() => {
              setIsLoading(false)
            }, 2000)
          }
        }, 100)
      } catch (err) {
        console.error('Error resetting view:', err)
        setIsLoading(false)
      }
    }
  }

  const downloadStructure = () => {
    const link = document.createElement('a')
    link.href = structureFile
    link.download = `${proteinName}_${species}.cif`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleFullscreen = () => {
    if (viewerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        viewerRef.current.requestFullscreen()
      }
    }
  }

  if (error) {
    return (
      <Card className={`bg-slate-800 border-slate-700 ${className}`}>
        <CardHeader>
          <CardTitle className="text-white">3D Structure: {proteinName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-slate-900 rounded-lg">
            <div className="text-center text-slate-400">
              <div className="text-red-400 mb-2">Error loading structure</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-slate-800 border-slate-700 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">
            3D Structure: {proteinName}
            {comparisonSpecies && (
              <span className="text-sm font-normal text-slate-400 ml-2">
                ({species} vs {comparisonSpecies})
              </span>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOverlay(!showOverlay)}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              {showOverlay ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
              Info
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadStructure}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Fullscreen
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Molstar Viewer Container */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{ height: '500px' }}>
          <div ref={viewerRef} className="w-full h-full" />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-2" />
                <div className="text-slate-300">Loading structure...</div>
              </div>
            </div>
          )}

          {/* Overlay Information */}
          {showOverlay && !isLoading && (
            <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
              <h4 className="text-white font-medium mb-2">{proteinName} Structure</h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Species: {species}</div>
                <div>File: {structureFile.split('/').pop()}</div>
                {comparisonSpecies && (
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <div className="text-slate-400">Comparison with:</div>
                    <div>{comparisonSpecies}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Structure Information */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Format</div>
            <div className="text-white font-medium">CIF</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Subunit</div>
            <div className="text-white font-medium">{proteinName}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Species</div>
            <div className="text-white font-medium">{species}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
