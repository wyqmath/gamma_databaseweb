'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlignmentData } from '@/types'
import { Eye, EyeOff, Copy, Download } from 'lucide-react'

interface SequenceAlignmentViewerProps {
  alignment: AlignmentData
  humanSpeciesName: string
  comparisonSpeciesName: string
}

export default function SequenceAlignmentViewer({ 
  alignment, 
  humanSpeciesName, 
  comparisonSpeciesName 
}: SequenceAlignmentViewerProps) {
  const [showFullAlignment, setShowFullAlignment] = useState(false)
  const [highlightDifferences, setHighlightDifferences] = useState(true)

  // Parse alignment data (simplified - in real implementation would be more sophisticated)
  const parseAlignment = (alignmentData: string) => {
    const lines = alignmentData.split('\n').filter(line => line.trim())
    const humanLines = lines.filter(line => line.startsWith('HUMAN:'))
    const comparisonLines = lines.filter(line => line.startsWith('MOUSE:') || line.startsWith(comparisonSpeciesName.toUpperCase() + ':'))
    const matchLines = lines.filter(line => line.includes('*') || line.includes(':') || line.includes('.'))

    return {
      humanSequence: humanLines.map(line => line.substring(line.indexOf(':') + 1).trim()).join(''),
      comparisonSequence: comparisonLines.map(line => line.substring(line.indexOf(':') + 1).trim()).join(''),
      matchPattern: matchLines.join('')
    }
  }

  const { humanSequence, comparisonSequence } = parseAlignment(alignment.alignment_data)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadAlignment = () => {
    const content = `Sequence Alignment: ${humanSpeciesName} vs ${comparisonSpeciesName}
Similarity: ${alignment.similarity_percentage}%
Mismatches: ${alignment.mismatches}
Gaps: ${alignment.gaps}

${alignment.alignment_data}
`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `alignment_${humanSpeciesName}_vs_${comparisonSpeciesName}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderSequenceBlock = (seq1: string, seq2: string, start: number, length: number = 60) => {
    const end = Math.min(start + length, seq1.length)
    const block1 = seq1.substring(start, end)
    const block2 = seq2.substring(start, end)
    
    return (
      <div key={start} className="mb-4 font-mono text-sm">
        <div className="flex items-center mb-1">
          <span className="w-16 text-slate-400 text-xs">{start + 1}-{end}</span>
          <span className="text-slate-300">
            {block1.split('').map((char, i) => (
              <span
                key={i}
                className={
                  highlightDifferences && block1[i] !== block2[i]
                    ? 'bg-red-900/50 text-red-300'
                    : block1[i] === '-' || block2[i] === '-'
                    ? 'bg-slate-700 text-slate-500'
                    : 'text-slate-300'
                }
              >
                {char}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center mb-1">
          <span className="w-16 text-slate-400 text-xs"></span>
          <span className="text-slate-300">
            {block1.split('').map((char, i) => (
              <span key={i} className="text-slate-600">
                {block1[i] === block2[i] ? '|' : block1[i] === '-' || block2[i] === '-' ? ' ' : ':'}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-16 text-slate-400 text-xs">{start + 1}-{end}</span>
          <span className="text-slate-300">
            {block2.split('').map((char, i) => (
              <span
                key={i}
                className={
                  highlightDifferences && block1[i] !== block2[i]
                    ? 'bg-red-900/50 text-red-300'
                    : block1[i] === '-' || block2[i] === '-'
                    ? 'bg-slate-700 text-slate-500'
                    : 'text-slate-300'
                }
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    )
  }

  const maxLength = Math.max(humanSequence.length, comparisonSequence.length)
  const blocksToShow = showFullAlignment ? Math.ceil(maxLength / 60) : 3

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Sequence Alignment</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              {highlightDifferences ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
              {highlightDifferences ? 'Hide' : 'Show'} Differences
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(alignment.alignment_data)}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAlignment}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">{alignment.similarity_percentage}%</div>
            <div className="text-xs text-slate-400">Similarity</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-400">{alignment.mismatches}</div>
            <div className="text-xs text-slate-400">Mismatches</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">{alignment.gaps}</div>
            <div className="text-xs text-slate-400">Gaps</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Species Labels */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              <span className="font-mono bg-slate-900 px-2 py-1 rounded">HUMAN</span> {humanSpeciesName}
            </span>
            <span className="text-slate-400">
              <span className="font-mono bg-slate-900 px-2 py-1 rounded">COMP</span> {comparisonSpeciesName}
            </span>
          </div>
        </div>

        {/* Alignment Display */}
        <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
          {Array.from({ length: blocksToShow }, (_, i) => 
            renderSequenceBlock(humanSequence, comparisonSequence, i * 60)
          )}
          
          {!showFullAlignment && maxLength > 180 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => setShowFullAlignment(true)}
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
              >
                Show Full Alignment ({Math.ceil(maxLength / 60) - 3} more blocks)
              </Button>
            </div>
          )}
          
          {showFullAlignment && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => setShowFullAlignment(false)}
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
              >
                Show Less
              </Button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 text-xs text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-900/50 rounded mr-1"></span>
              Mismatch
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-slate-700 rounded mr-1"></span>
              Gap
            </div>
            <div className="flex items-center">
              <span className="font-mono">|</span>
              <span className="ml-1">Identical</span>
            </div>
            <div className="flex items-center">
              <span className="font-mono">:</span>
              <span className="ml-1">Similar</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
