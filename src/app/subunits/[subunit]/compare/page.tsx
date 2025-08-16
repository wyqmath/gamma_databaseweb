import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, BarChart3, Dna, Atom, Info } from 'lucide-react'
import { getProteinsBySubunit } from '@/lib/data'
import { SUBUNITS, Subunit } from '@/types'
import SubunitComparisonViewer from '@/components/SubunitComparisonViewer'
import Breadcrumb from '@/components/Breadcrumb'

interface PageProps {
  params: Promise<{
    subunit: string
  }>
}

export default async function SubunitComparePage({ params }: PageProps) {
  const { subunit } = await params
  
  // Validate subunit parameter
  const normalizedSubunit = subunit.toUpperCase() as Subunit
  if (!SUBUNITS.includes(normalizedSubunit)) {
    notFound()
  }

  // Get all proteins for this subunit
  const allProteins = await getProteinsBySubunit(normalizedSubunit)
  
  if (allProteins.length === 0) {
    notFound()
  }

  // Find human reference protein (fallback to first protein if human not found)
  const humanProtein = allProteins.find(p => p.species_id === 'human') || allProteins[0]
  const targetProteins = allProteins.filter(p => p.id !== humanProtein.id)

  // Get subunit information
  const subunitInfo = getSubunitInfo(normalizedSubunit)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Subunits', href: '/subunits' },
    { label: normalizedSubunit, href: `/subunits/${subunit.toLowerCase()}` },
    { label: 'Compare', href: `/subunits/${subunit.toLowerCase()}/compare` }
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 ${subunitInfo.gradient} rounded-2xl mb-6`}>
            <subunitInfo.icon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {normalizedSubunit} Comparative Analysis
          </h1>
          <p className="text-xl text-slate-400 mb-2">
            Cross-Species Comparison with Human Reference
          </p>
          <p className="text-slate-300 max-w-3xl mx-auto">
            {subunitInfo.description}
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {targetProteins.length + 1}
              </div>
              <div className="text-slate-400 text-sm">Species Analyzed</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Dna className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {humanProtein.sequence.length}
              </div>
              <div className="text-slate-400 text-sm">Reference Length (AA)</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Atom className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {targetProteins.filter(p => p.structure_file).length + 1}
              </div>
              <div className="text-slate-400 text-sm">3D Structures</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {targetProteins.length}
              </div>
              <div className="text-slate-400 text-sm">Comparisons</div>
            </CardContent>
          </Card>
        </div>

        {/* Reference Protein Information */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Reference Protein Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-300 font-medium mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Species:</span>
                    <Badge variant="secondary" className="bg-cyan-600 text-white">
                      {humanProtein.species_id.charAt(0).toUpperCase() + humanProtein.species_id.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protein ID:</span>
                    <span className="text-white font-mono">{humanProtein.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sequence Length:</span>
                    <span className="text-white">{humanProtein.sequence.length} amino acids</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Structure Available:</span>
                    <Badge variant={humanProtein.structure_file ? "default" : "secondary"}>
                      {humanProtein.structure_file ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-slate-300 font-medium mb-3">Description</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {humanProtein.description || `${normalizedSubunit} subunit serving as the reference for cross-species comparative analysis.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Analysis */}
        <SubunitComparisonViewer
          subunit={normalizedSubunit}
          referenceProtein={humanProtein}
          targetProteins={targetProteins}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Link href={`/subunits/${subunit.toLowerCase()}`}>
              Back to {normalizedSubunit} Overview
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/evolution">
              View Evolution Tree
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/msa">
              Multiple Sequence Alignment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function getSubunitInfo(subunit: string) {
  const subunitData = {
    'PSEN1': {
      icon: BarChart3,
      gradient: 'bg-gradient-to-br from-red-500 to-red-600',
      description: 'The catalytic subunit containing the active site aspartate residues responsible for intramembrane proteolysis. Critical for γ-secretase activity and primary target for Alzheimer\'s disease mutations.'
    },
    'NCT': {
      icon: Users,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      description: 'Nicastrin serves as the substrate receptor, recognizing and binding substrates for cleavage. Essential for complex stability and substrate specificity.'
    },
    'APH-1': {
      icon: Atom,
      gradient: 'bg-gradient-to-br from-green-500 to-green-600',
      description: 'Anterior pharynx-defective 1 is crucial for complex assembly and stability. Provides structural support and may influence substrate binding.'
    },
    'PEN-2': {
      icon: Dna,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      description: 'Presenilin enhancer 2 is the smallest subunit, essential for complex maturation and enzymatic activity. Required for proper PSEN1 endoproteolysis.'
    }
  }

  return subunitData[subunit as keyof typeof subunitData] || subunitData['PSEN1']
}
