'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Download, Maximize2, Eye, EyeOff } from 'lucide-react'

interface ThreeDViewerProps {
  structureFile: string
  proteinName: string
  species: string
  comparisonSpecies?: string
}

export default function ThreeDViewer({ 
  structureFile, 
  proteinName, 
  species, 
  comparisonSpecies 
}: ThreeDViewerProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [viewMode, setViewMode] = useState<'cartoon' | 'surface' | 'sticks'>('cartoon')

  // In a real implementation, this would integrate with a molecular viewer like NGL or 3Dmol.js
  // For now, we'll create a placeholder that simulates the 3D viewer interface

  const resetView = () => {
    // Reset 3D viewer to default position
    console.log('Resetting 3D view')
  }

  const downloadStructure = () => {
    // Download the structure file
    const link = document.createElement('a')
    link.href = structureFile
    link.download = `${proteinName}_${species}.cif`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleFullscreen = () => {
    // Toggle fullscreen mode for the 3D viewer
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
        {/* 3D Viewer Container */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
          {/* Placeholder for 3D viewer - in real implementation, this would be the molecular viewer */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Simulated 3D structure representation */}
              <div className="relative w-64 h-64 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full animate-pulse delay-75"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-300/40 to-blue-400/40 rounded-full animate-pulse delay-150"></div>
                <div className="absolute inset-12 bg-gradient-to-br from-cyan-200/50 to-blue-300/50 rounded-full animate-pulse delay-300"></div>
                
                {/* Simulated protein structure elements */}
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500/60 rounded-full"></div>
                <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-green-500/60 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-yellow-500/60 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-7 h-7 bg-purple-500/60 rounded-full"></div>
                
                {/* Connecting lines to simulate secondary structure */}
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
                Interactive 3D structure viewer
                <br />
                <span className="text-xs">Click and drag to rotate • Scroll to zoom</span>
              </div>
            </div>
          </div>

          {/* Overlay Information */}
          {showOverlay && (
            <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
              <h4 className="text-white font-medium mb-2">{proteinName} Structure</h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Species: {species}</div>
                <div>Source: {structureFile.includes('fold_') ? 'AlphaFold Model' : 'Experimental'}</div>
                {comparisonSpecies && (
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <div className="text-slate-400">Comparison with:</div>
                    <div>{comparisonSpecies}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Mode Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-1">
            {(['cartoon', 'surface', 'sticks'] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode)}
                className={`text-xs ${
                  viewMode === mode 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>

          {/* Loading indicator (would be shown during actual structure loading) */}
          <div className="absolute top-4 right-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Structure Information */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Resolution</div>
            <div className="text-white font-medium">
              {structureFile.includes('fold_') ? 'Model' : '2.8 Å'}
            </div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Method</div>
            <div className="text-white font-medium">
              {structureFile.includes('fold_') ? 'AlphaFold' : 'Cryo-EM'}
            </div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">Confidence</div>
            <div className="text-white font-medium">
              {structureFile.includes('fold_') ? 'High' : 'Experimental'}
            </div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="mt-4 p-3 bg-slate-900 rounded-lg">
          <div className="text-xs text-slate-400 mb-2">Color Legend:</div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-slate-300">α-helices</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-slate-300">β-sheets</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span className="text-slate-300">Loops</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-slate-300">Active sites</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
