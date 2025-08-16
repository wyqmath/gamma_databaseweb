'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  Eye,
  BarChart3,
  Dna,
  Atom,
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  AlertCircle
} from 'lucide-react'
import {
  StructuralComparisonResult,
  SequenceSimilarityResult,
  Protein
} from '@/types'
import { calculateSequenceSimilarity } from '@/lib/similarity'
import MultipleSequenceAlignmentViewer from './MultipleSequenceAlignmentViewer'
import ThreeDViewer from './ThreeDViewer'

interface SubunitComparisonViewerProps {
  subunit: string
  referenceProtein: Protein
  targetProteins: Protein[]
  className?: string
}

interface ComparisonData {
  targetProtein: Protein
  sequenceSimilarity: SequenceSimilarityResult
  structuralComparison: StructuralComparisonResult | null
  isLoading: boolean
  error?: string
}

export default function SubunitComparisonViewer({
  subunit,
  referenceProtein,
  targetProteins,
  className = ""
}: SubunitComparisonViewerProps) {
  const [comparisons, setComparisons] = useState<ComparisonData[]>([])
  const [selectedComparison, setSelectedComparison] = useState<ComparisonData | null>(null)
  const [showAlignment, setShowAlignment] = useState(false)
  const [showStructures, setShowStructures] = useState(false)

  const fetchStructuralComparison = useCallback(async (
    subunit: string,
    targetSpecies: string
  ): Promise<StructuralComparisonResult | null> => {
    try {
      const response = await fetch(`/api/structural-comparison?subunit=${subunit}&targetSpecies=${targetSpecies}`)

      if (response.ok) {
        const data = await response.json()
        return data.data
      } else {
        // If no cached data, simulate for demo
        const simulateResponse = await fetch('/api/structural-comparison', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceFile: referenceProtein.structure_file,
            targetFile: `/structures/${targetSpecies}_${subunit}_01.cif`,
            subunit,
            targetSpecies,
            simulate: true
          })
        })

        if (simulateResponse.ok) {
          const simulateData = await simulateResponse.json()
          return simulateData.data
        }
      }

      return null
    } catch (error) {
      console.error('Error fetching structural comparison:', error)
      return null
    }
  }, [referenceProtein.structure_file])

  const initializeComparisons = useCallback(async () => {
    const initialComparisons: ComparisonData[] = targetProteins.map(protein => ({
      targetProtein: protein,
      sequenceSimilarity: calculateSequenceSimilarity(
        referenceProtein.sequence,
        protein.sequence
      ),
      structuralComparison: null,
      isLoading: true
    }))

    setComparisons(initialComparisons)

    // Load structural comparisons
    for (let i = 0; i < initialComparisons.length; i++) {
      const comparison = initialComparisons[i]
      try {
        const structuralResult = await fetchStructuralComparison(
          subunit,
          comparison.targetProtein.species_id
        )
        
        setComparisons(prev => prev.map((comp, index) => 
          index === i 
            ? { ...comp, structuralComparison: structuralResult, isLoading: false }
            : comp
        ))
      } catch {
        setComparisons(prev => prev.map((comp, index) =>
          index === i
            ? { ...comp, isLoading: false, error: 'Failed to load structural data' }
            : comp
        ))
      }
    }
  }, [subunit, referenceProtein, targetProteins, fetchStructuralComparison])

  useEffect(() => {
    initializeComparisons()
  }, [initializeComparisons])

  const getConservationLevel = (identity: number) => {
    if (identity >= 90) return { level: 'Very High', color: 'bg-green-500', icon: TrendingUp }
    if (identity >= 70) return { level: 'High', color: 'bg-blue-500', icon: TrendingUp }
    if (identity >= 50) return { level: 'Moderate', color: 'bg-yellow-500', icon: Minus }
    if (identity >= 30) return { level: 'Low', color: 'bg-orange-500', icon: TrendingDown }
    return { level: 'Very Low', color: 'bg-red-500', icon: TrendingDown }
  }

  const getStructuralSimilarity = (tmScore: number) => {
    if (tmScore >= 0.9) return { level: 'Excellent', color: 'text-green-500' }
    if (tmScore >= 0.7) return { level: 'Good', color: 'text-blue-500' }
    if (tmScore >= 0.5) return { level: 'Moderate', color: 'text-yellow-500' }
    if (tmScore >= 0.3) return { level: 'Poor', color: 'text-orange-500' }
    return { level: 'Very Poor', color: 'text-red-500' }
  }

  const downloadComparisonData = () => {
    const data = {
      subunit,
      reference: {
        species: referenceProtein.species_id,
        sequence: referenceProtein.sequence
      },
      comparisons: comparisons.map(comp => ({
        species: comp.targetProtein.species_id,
        sequence_similarity: comp.sequenceSimilarity,
        structural_comparison: comp.structuralComparison
      }))
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${subunit}_comparison_analysis.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {subunit} Comparative Analysis
          </h2>
          <p className="text-slate-400">
            Comparing {targetProteins.length} species against human reference
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAlignment(!showAlignment)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Dna className="h-4 w-4 mr-2" />
            {showAlignment ? 'Hide' : 'Show'} Alignment
          </Button>
          <Button
            onClick={() => setShowStructures(!showStructures)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Atom className="h-4 w-4 mr-2" />
            {showStructures ? 'Hide' : 'Show'} Structures
          </Button>
          <Button
            onClick={downloadComparisonData}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
        </div>
      </div>

      {/* Comparison Overview */}
      <div className="grid gap-4">
        {comparisons.map((comparison) => {
          const conservation = getConservationLevel(comparison.sequenceSimilarity.identity)
          const ConservationIcon = conservation.icon
          const structural = comparison.structuralComparison 
            ? getStructuralSimilarity(comparison.structuralComparison.tmScore)
            : null

          return (
            <Card 
              key={comparison.targetProtein.id} 
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer"
              onClick={() => setSelectedComparison(comparison)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {comparison.targetProtein.species_id.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {comparison.targetProtein.species_id.charAt(0).toUpperCase() + 
                         comparison.targetProtein.species_id.slice(1)}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {comparison.targetProtein.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Sequence Similarity */}
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <Dna className="h-4 w-4 text-cyan-400" />
                        <span className="text-slate-300 text-sm">Sequence Identity</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ConservationIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-white font-bold">
                          {comparison.sequenceSimilarity.identity.toFixed(1)}%
                        </span>
                        <Badge variant="secondary" className={`${conservation.color} text-white text-xs`}>
                          {conservation.level}
                        </Badge>
                      </div>
                    </div>

                    {/* Structural Similarity */}
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <Atom className="h-4 w-4 text-purple-400" />
                        <span className="text-slate-300 text-sm">Structural Similarity</span>
                      </div>
                      {comparison.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                          <span className="text-slate-400 text-sm">Loading...</span>
                        </div>
                      ) : comparison.error ? (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <span className="text-red-400 text-sm">Error</span>
                        </div>
                      ) : comparison.structuralComparison && structural ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold">
                            TM: {comparison.structuralComparison.tmScore.toFixed(3)}
                          </span>
                          <Badge variant="secondary" className={`${structural.color} text-xs`}>
                            {structural.level}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">N/A</span>
                      )}
                    </div>

                    {/* RMSD */}
                    {comparison.structuralComparison && (
                      <div className="text-center">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300 text-sm">RMSD</span>
                        </div>
                        <span className="text-white font-bold">
                          {comparison.structuralComparison.rmsd.toFixed(2)} Å
                        </span>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sequence Alignment Viewer */}
      {showAlignment && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Dna className="h-5 w-5 mr-2" />
              Multiple Sequence Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultipleSequenceAlignmentViewer
              initialSequences={[
                {
                  id: 'reference',
                  name: `Human ${subunit}`,
                  sequence: referenceProtein.sequence,
                  species: 'human',
                  subunit: subunit
                },
                ...targetProteins.map(protein => ({
                  id: protein.id,
                  name: `${protein.species_id.charAt(0).toUpperCase() + protein.species_id.slice(1)} ${subunit}`,
                  sequence: protein.sequence,
                  species: protein.species_id,
                  subunit: subunit
                }))
              ]}
              title={`${subunit} Cross-Species Alignment`}
              allowEdit={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Structure Comparison */}
      {showStructures && selectedComparison && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Atom className="h-5 w-5 mr-2" />
              Structure Comparison: Human vs {selectedComparison.targetProtein.species_id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-300 font-medium mb-4">Human {subunit} (Reference)</h4>
                <ThreeDViewer
                  structureFile={referenceProtein.structure_file || ''}
                  proteinName={subunit}
                  species="human"
                />
              </div>
              <div>
                <h4 className="text-slate-300 font-medium mb-4">
                  {selectedComparison.targetProtein.species_id} {subunit}
                </h4>
                <ThreeDViewer
                  structureFile={selectedComparison.targetProtein.structure_file || ''}
                  proteinName={subunit}
                  species={selectedComparison.targetProtein.species_id}
                  comparisonSpecies="human"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
