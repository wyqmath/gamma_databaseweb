'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultipleSequenceAlignment, MSAOptions } from '@/types'
import {
  Play,
  Download,
  Copy,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  AlertCircle,
  Loader2
} from 'lucide-react'

// Dynamically import biomsa
// Define a minimal type for the biomsa module
type BiomsaLike = { align: (seqs: string[], options: MSAOptions) => Promise<string[]> }
// Type guard to check biomsa-like modules
const isBiomsaLike = (m: unknown): m is BiomsaLike => {
  return typeof (m as { align?: unknown }).align === 'function'
}

let biomsa: BiomsaLike | null = null
if (typeof window !== 'undefined') {
  import('biomsa').then((module) => {
    const maybeDefault: unknown = (module as { default?: unknown }).default ?? module
    if (isBiomsaLike(maybeDefault)) {
      biomsa = maybeDefault
    } else {
      console.error('Loaded biomsa module does not expose an align function as expected')
    }
  })
}

interface MultipleSequenceAlignmentViewerProps {
  initialSequences?: Array<{
    id: string
    name: string
    sequence: string
    species?: string
    subunit?: string
  }>
  title?: string
  allowEdit?: boolean
}

export default function MultipleSequenceAlignmentViewer({
  initialSequences = [],
  title = "Multiple Sequence Alignment",
  allowEdit = true
}: MultipleSequenceAlignmentViewerProps) {
  const [sequences, setSequences] = useState(initialSequences)
  const [alignment, setAlignment] = useState<MultipleSequenceAlignment | null>(null)
  const [isAligning, setIsAligning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [highlightDifferences, setHighlightDifferences] = useState(true)
  const [showFullAlignment, setShowFullAlignment] = useState(false)

  // MSA options
  const [msaOptions, setMsaOptions] = useState<MSAOptions>({
    method: 'auto',
    type: 'auto',
    gapchar: '-',
    debug: false
  })

  // New sequence input
  const [newSequence, setNewSequence] = useState({
    name: '',
    sequence: '',
    species: '',
    subunit: ''
  })

  // Add a new sequence
  const addSequence = () => {
    if (!newSequence.name.trim() || !newSequence.sequence.trim()) {
      setError('Please enter a name and a sequence')
      return
    }

    const cleanSequence = newSequence.sequence.replace(/\s+/g, '').toUpperCase()
    if (cleanSequence.length === 0) {
      setError('Sequence cannot be empty')
      return
    }

    const newSeq = {
      id: Date.now().toString(),
      name: newSequence.name.trim(),
      sequence: cleanSequence,
      species: newSequence.species.trim() || undefined,
      subunit: newSequence.subunit.trim() || undefined
    }

    setSequences(prev => [...prev, newSeq])
    setNewSequence({ name: '', sequence: '', species: '', subunit: '' })
    setError(null)
  }

  // Remove sequence
  const removeSequence = (id: string) => {
    setSequences(prev => prev.filter(seq => seq.id !== id))
    setAlignment(null)
  }

  // Run multiple sequence alignment
  const performAlignment = async () => {
    if (sequences.length < 2) {
      setError('At least 2 sequences are required to run MSA')
      return
    }

    if (!biomsa) {
      setError('BioMSA is still loading, please try again in a moment')
      return
    }

    setIsAligning(true)
    setError(null)

    try {
      const sequenceStrings = sequences.map(seq => seq.sequence)

      const result = await biomsa.align(sequenceStrings, msaOptions)

      const alignmentResult: MultipleSequenceAlignment = {
        sequences: sequences,
        alignedSequences: result,
        method: msaOptions.method,
        type: msaOptions.type,
        gapChar: msaOptions.gapchar
      }

      setAlignment(alignmentResult)
    } catch (err) {
      console.error('Alignment error:', err)
      setError(`Alignment failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsAligning(false)
    }
  }

  // Copy alignment result
  const copyAlignment = async () => {
    if (!alignment) return

    const content = alignment.sequences.map((seq, index) =>
      `>${seq.name}${seq.species ? ` (${seq.species})` : ''}${seq.subunit ? ` [${seq.subunit}]` : ''}\n${alignment.alignedSequences[index]}`
    ).join('\n\n')

    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      console.error('Failed to copy alignment:', err)
    }
  }

  // Download alignment result
  const downloadAlignment = () => {
    if (!alignment) return

    const content = alignment.sequences.map((seq, index) =>
      `>${seq.name}${seq.species ? ` (${seq.species})` : ''}${seq.subunit ? ` [${seq.subunit}]` : ''}\n${alignment.alignedSequences[index]}`
    ).join('\n\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `multiple_sequence_alignment_${Date.now()}.fasta`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Render alignment block
  const renderAlignmentBlock = (start: number, length: number = 60) => {
    if (!alignment) return null

    const end = Math.min(start + length, alignment.alignedSequences[0]?.length || 0)

    return (
      <div key={start} className="mb-6 font-mono text-sm">
        {alignment.sequences.map((seq, seqIndex) => {
          const alignedSeq = alignment.alignedSequences[seqIndex]
          const block = alignedSeq.substring(start, end)

          return (
            <div key={seqIndex} className="flex items-center mb-1">
              <div className="w-32 text-slate-400 text-xs truncate mr-4">
                {seq.name}
              </div>
              <div className="w-16 text-slate-400 text-xs mr-2">
                {start + 1}-{end}
              </div>
              <div className="text-slate-300">
                {block.split('').map((char, charIndex) => {
                  const globalPos = start + charIndex
                  const isGap = char === (alignment.gapChar || '-')

                  // Check if different from other sequences
                  const isDifferent = highlightDifferences &&
                    alignment.alignedSequences.some((otherSeq, otherIndex) =>
                      otherIndex !== seqIndex &&
                      otherSeq[globalPos] !== char &&
                      otherSeq[globalPos] !== (alignment.gapChar || '-') &&
                      char !== (alignment.gapChar || '-')
                    )

                  return (
                    <span
                      key={charIndex}
                      className={
                        isGap
                          ? 'bg-slate-700 text-slate-500'
                          : isDifferent
                          ? 'bg-red-900/50 text-red-300'
                          : 'text-slate-300'
                      }
                      title={`Position: ${globalPos + 1}, Residue: ${char}, Sequence: ${seq.name}`}
                    >
                      {char}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Consensus indicator */}
        <div className="flex items-center mt-1">
          <div className="w-32 mr-4"></div>
          <div className="w-16 mr-2"></div>
          <div className="text-slate-600">
            {Array.from({ length: end - start }, (_, i) => {
              const pos = start + i
              const chars = alignment.alignedSequences.map(seq => seq[pos])
              const uniqueChars = new Set(chars.filter(c => c !== (alignment.gapChar || '-')))

              return (
                <span key={i}>
                  {uniqueChars.size === 1 && chars.some(c => c !== (alignment.gapChar || '-')) ? '*' :
                   uniqueChars.size <= 2 ? ':' : ' '}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const maxLength = alignment?.alignedSequences[0]?.length || 0
  const blocksToShow = showFullAlignment ? Math.ceil(maxLength / 60) : 3

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            {alignment && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHighlightDifferences(!highlightDifferences)}
                  className="text-slate-300 border-slate-600 hover:bg-slate-700"
                >
                  {highlightDifferences ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {highlightDifferences ? 'Hide' : 'Show'} differences
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAlignment}
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
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error notice */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-700 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}

        {/* Settings panel */}
        {showSettings && (
          <div className="p-4 bg-slate-900 rounded-lg space-y-4">
            <h4 className="text-white font-medium">Alignment settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Method</label>
                <Select
                  value={msaOptions.method}
                  onValueChange={(value) => setMsaOptions(prev => ({ ...prev, method: value as MSAOptions['method'] }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="complete">Complete (optimal, slower)</SelectItem>
                    <SelectItem value="diag">Diagonal (fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Sequence type</label>
                <Select
                  value={msaOptions.type}
                  onValueChange={(value) => setMsaOptions(prev => ({ ...prev, type: value as MSAOptions['type'] }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="amino">Amino</SelectItem>
                    <SelectItem value="nucleic">Nucleic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Sequence management */}
        {allowEdit && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">Sequence management</h4>

            {/* Add new sequence */}
            <div className="p-4 bg-slate-900 rounded-lg space-y-3">
              <h5 className="text-slate-300 text-sm">Add new sequence</h5>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Sequence name"
                  value={newSequence.name}
                  onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  placeholder="Species (optional)"
                  value={newSequence.species}
                  onChange={(e) => setNewSequence(prev => ({ ...prev, species: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                <Input
                  placeholder="Subunit (optional)"
                  value={newSequence.subunit}
                  onChange={(e) => setNewSequence(prev => ({ ...prev, subunit: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <div className="col-span-3">
                  <textarea
                    placeholder="Enter sequence..."
                    value={newSequence.sequence}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, sequence: e.target.value }))}
                    className="w-full h-20 p-2 bg-slate-700 border border-slate-600 rounded text-white text-sm font-mono resize-none"
                  />
                </div>
              </div>
              <Button
                onClick={addSequence}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add sequence
              </Button>
            </div>

            {/* Current sequence list */}
            {sequences.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-slate-300 text-sm">Current sequences ({sequences.length})</h5>
                {sequences.map((seq) => (
                  <div key={seq.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{seq.name}</span>
                        {seq.species && (
                          <span className="text-slate-400 text-sm">({seq.species})</span>
                        )}
                        {seq.subunit && (
                          <span className="text-cyan-400 text-sm">[{seq.subunit}]</span>
                        )}
                      </div>
                      <div className="text-slate-400 text-xs mt-1">
                        Length: {seq.sequence.length} residues
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSequence(seq.id)}
                      className="text-red-400 border-red-600 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 执行对比按钮 */}
        <div className="flex items-center justify-center">
          <Button
            onClick={performAlignment}
            disabled={sequences.length < 2 || isAligning}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2"
          >
            {isAligning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Aligning...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run MSA
              </>
            )}
          </Button>
        </div>

        {/* Alignment result */}
        {alignment && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Alignment result</h4>
              <div className="text-slate-400 text-sm">
                Sequences: {alignment.sequences.length} |
                Alignment length: {alignment.alignedSequences[0]?.length || 0} |
                Method: {alignment.method} |
                Type: {alignment.type}
              </div>
            </div>

            {/* 对比显示区域 */}
            <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
              {Array.from({ length: blocksToShow }, (_, i) =>
                renderAlignmentBlock(i * 60)
              )}

              {!showFullAlignment && maxLength > 180 && (
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFullAlignment(true)}
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    Show full alignment ({Math.ceil(maxLength / 60) - 3} more blocks)
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
                    Show less
                  </Button>
                </div>
              )}
            </div>

            {/* 对比统计信息 */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-3">
                  <div className="text-slate-400 text-xs">Fully conserved</div>
                  <div className="text-white text-lg font-bold">
                    {alignment.alignedSequences[0] ?
                      Array.from({ length: alignment.alignedSequences[0].length }, (_, i) => {
                        const chars = alignment.alignedSequences.map(seq => seq[i])
                        const uniqueChars = new Set(chars.filter(c => c !== (alignment.gapChar || '-')))
                        return uniqueChars.size === 1 && chars.some(c => c !== (alignment.gapChar || '-'))
                      }).filter(Boolean).length : 0
                    }
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-3">
                  <div className="text-slate-400 text-xs">Variable positions</div>
                  <div className="text-white text-lg font-bold">
                    {alignment.alignedSequences[0] ?
                      Array.from({ length: alignment.alignedSequences[0].length }, (_, i) => {
                        const chars = alignment.alignedSequences.map(seq => seq[i])
                        const uniqueChars = new Set(chars.filter(c => c !== (alignment.gapChar || '-')))
                        return uniqueChars.size > 1
                      }).filter(Boolean).length : 0
                    }
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-3">
                  <div className="text-slate-400 text-xs">Gap positions</div>
                  <div className="text-white text-lg font-bold">
                    {alignment.alignedSequences[0] ?
                      Array.from({ length: alignment.alignedSequences[0].length }, (_, i) => {
                        const chars = alignment.alignedSequences.map(seq => seq[i])
                        return chars.some(c => c === (alignment.gapChar || '-'))
                      }).filter(Boolean).length : 0
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-slate-400 space-y-1">
          <div className="font-medium">Tips:</div>
          <div>• Add at least 2 sequences to run MSA</div>
          <div>• Auto-detection supports protein and nucleic sequences</div>
          <div>• &quot;*&quot; = fully conserved, &quot;:&quot; = strongly conserved</div>
          <div>• Red highlights mark differences</div>
          <div>• Adjust method to balance speed and accuracy</div>
        </div>
      </CardContent>
    </Card>
  )
}
