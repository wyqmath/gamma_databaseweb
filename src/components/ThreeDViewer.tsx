'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Download, Maximize2, Eye, EyeOff } from 'lucide-react'
import MolstarViewer from './MolstarViewer'

interface ThreeDViewerProps {
  structureFile: string
  proteinName: string
  species: string
  comparisonSpecies?: string
  useMolstar?: boolean
}

export default function ThreeDViewer({
  structureFile,
  proteinName,
  species,
  comparisonSpecies,
  useMolstar = true
}: ThreeDViewerProps) {
  const [showOverlay, setShowOverlay] = useState(true)

  // Use Molstar viewer if available and requested
  if (useMolstar) {
    return (
      <MolstarViewer
        structureFile={structureFile}
        proteinName={proteinName}
        species={species}
        comparisonSpecies={comparisonSpecies}
      />
    )
  }

  // Fallback to placeholder viewer
  const resetView = () => {
    // For placeholder viewer, we can reset the overlay state
    setShowOverlay(true)
    console.log('Reset placeholder view to default state')
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
    console.log('Toggling fullscreen')
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
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
              Overlay
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
        {/* Placeholder 3D Viewer */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full animate-pulse delay-75"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-300/40 to-blue-400/40 rounded-full animate-pulse delay-150"></div>
                <div className="absolute inset-12 bg-gradient-to-br from-cyan-200/50 to-blue-300/50 rounded-full animate-pulse delay-300"></div>

                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500/60 rounded-full"></div>
                <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-green-500/60 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-yellow-500/60 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-7 h-7 bg-purple-500/60 rounded-full"></div>

                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 64 64 Q 128 32 192 64 Q 160 128 128 192 Q 96 160 64 128 Z"
                    stroke="rgba(34, 197, 94, 0.4)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 32 128 Q 64 96 128 128 Q 192 160 224 128"
                    stroke="rgba(239, 68, 68, 0.4)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse delay-100"
                  />
                </svg>
              </div>

              <div className="text-slate-400 text-sm">
                Placeholder 3D structure viewer
                <br />
                <span className="text-xs">Enable Molstar for interactive viewing</span>
              </div>
            </div>
          </div>

          {showOverlay && (
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
      </CardContent>
    </Card>
  )
}
