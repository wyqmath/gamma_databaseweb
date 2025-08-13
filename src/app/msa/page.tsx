'use client'

import { useState } from 'react'
import MultipleSequenceAlignmentViewer from '@/components/MultipleSequenceAlignmentViewer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dna, Users, Zap } from 'lucide-react'
import { MultipleSequenceAlignment } from '@/types'

// Example sequences
const exampleSequences = {
  gammaSecretase: [
    {
      id: '1',
      name: 'Human PSEN1',
      sequence: 'MTELPPLSYQYQGPIVNHKRGWLVGALLVAGVVVMVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
      species: 'Homo sapiens',
      subunit: 'PSEN1'
    },
    {
      id: '2',
      name: 'Mouse PSEN1',
      sequence: 'MTELPPLSYQYQGPIVNHKRGWLVGALLVAGVVVMVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
      species: 'Mus musculus',
      subunit: 'PSEN1'
    },
    {
      id: '3',
      name: 'Zebrafish PSEN1',
      sequence: 'MTELPPLSYQYQGPIVNHKRGWLVGALLVAGVVVMVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
      species: 'Danio rerio',
      subunit: 'PSEN1'
    }
  ],
  demoProteins: [
    {
      id: '4',
      name: 'Protein A',
      sequence: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG',
      species: 'Species A',
      subunit: 'Demo'
    },
    {
      id: '5',
      name: 'Protein B',
      sequence: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG',
      species: 'Species B',
      subunit: 'Demo'
    },
    {
      id: '6',
      name: 'Protein C',
      sequence: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAAG',
      species: 'Species C',
      subunit: 'Demo'
    }
  ],
  demoDNA: [
    {
      id: '7',
      name: 'Genome segment A',
      sequence: 'ACTGGGGAGGTGTA',
      species: 'Organism A'
    },
    {
      id: '8',
      name: 'Genome segment B',
      sequence: 'ACTGAGGTGTA',
      species: 'Organism B'
    },
    {
      id: '9',
      name: 'Genome segment C',
      sequence: 'ACTGAGGTTTA',
      species: 'Organism C'
    }
  ]
}

export default function MSAPage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [initialSequences, setInitialSequences] = useState<MultipleSequenceAlignment['sequences']>([])

  const loadExample = (exampleKey: keyof typeof exampleSequences) => {
    setInitialSequences(exampleSequences[exampleKey])
    setSelectedExample(exampleKey)
  }

  const clearSequences = () => {
    setInitialSequences([])
    setSelectedExample(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Multiple Sequence Alignment
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Perform efficient multiple sequence alignments using the BioMSA library with automatic detection of protein or nucleic acid sequences.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Dna className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Smart Sequence Detection</h3>
              <p className="text-slate-300 text-sm">
                Automatically detect protein or nucleic sequences to optimize alignment parameters.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Multi-Sequence Support</h3>
              <p className="text-slate-300 text-sm">
                Align multiple sequences simultaneously to identify conserved regions and variable sites.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">High Performance</h3>
              <p className="text-slate-300 text-sm">
                Fast and accurate alignments powered by BioMSA&apos;s optimized algorithms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Examples */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => loadExample('gammaSecretase')}
                variant={selectedExample === 'gammaSecretase' ? 'default' : 'outline'}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Load γ-secretase example
              </Button>
              <Button
                onClick={() => loadExample('demoProteins')}
                variant={selectedExample === 'demoProteins' ? 'default' : 'outline'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Load protein demo
              </Button>
              <Button
                onClick={clearSequences}
                variant="outline"
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
              >
                Clear sequences
              </Button>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              Choose an example dataset or manually add your own sequences to try the MSA feature.
            </p>
          </CardContent>
        </Card>

        {/* MSA component */}
        <MultipleSequenceAlignmentViewer
          key={selectedExample || 'empty'}
          initialSequences={initialSequences}
          title="Multiple Sequence Alignment"
          allowEdit={true}
        />

        {/* Help */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">How to use</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <div>
              <h4 className="font-semibold text-white mb-2">Basic steps:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Load a preset example with the buttons above</li>
                <li>Or add sequences manually: name, species, and sequence content</li>
                <li>Click &quot;Run MSA&quot; after adding at least 2 sequences</li>
                <li>Review the alignment, including conserved, variable, and gap positions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Advanced:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Adjust method: auto, complete, or diag</li>
                <li>Set sequence type: auto, amino, or nucleic</li>
                <li>Toggle difference highlighting for easier inspection</li>
                <li>Export alignment in FASTA format</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}