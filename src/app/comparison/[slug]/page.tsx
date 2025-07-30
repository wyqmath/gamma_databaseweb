import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SequenceAlignmentViewer from '@/components/SequenceAlignmentViewer'
import ThreeDViewer from '@/components/ThreeDViewer'
import { getComparisonData, getSpeciesById } from '@/lib/data'
import { Info } from 'lucide-react'

interface ComparisonPageProps {
  params: {
    slug: string
  }
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  // Parse slug (format: "human-vs-species")
  const { slug } = await params
  const parts = slug.split('-vs-')
  if (parts.length !== 2) {
    notFound()
  }

  const [humanSpeciesId, comparisonSpeciesId] = parts

  // Get comparison data
  const comparisons = await getComparisonData(humanSpeciesId, comparisonSpeciesId)
  const humanSpecies = await getSpeciesById(humanSpeciesId)
  const comparisonSpecies = await getSpeciesById(comparisonSpeciesId)

  if (!humanSpecies || !comparisonSpecies || comparisons.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Comparative Analysis
          </h1>
          <div className="flex items-center justify-center space-x-4 text-xl">
            <span className="text-cyan-400 font-semibold">{humanSpecies.common_name}</span>
            <span className="text-slate-500">vs</span>
            <span className="text-blue-400 font-semibold">{comparisonSpecies.common_name}</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-400 mt-2">
            <span className="italic">{humanSpecies.scientific_name}</span>
            <span>•</span>
            <span className="italic">{comparisonSpecies.scientific_name}</span>
          </div>
        </div>

        {/* Subunit Comparisons */}
        <div className="space-y-16">
          {comparisons.map((comparison) => (
            <div key={comparison.human_protein.id} className="space-y-8">
              {/* Subunit Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {comparison.human_protein.subunit}
                </h2>
                <p className="text-slate-400">
                  {comparison.human_protein.subunit === 'PSEN1' && 'Catalytic Subunit'}
                  {comparison.human_protein.subunit === 'NCT' && 'Substrate Receptor'}
                  {comparison.human_protein.subunit === 'APH-1' && 'Stabilizing Subunit'}
                  {comparison.human_protein.subunit === 'PEN-2' && 'Assembly Cofactor'}
                </p>
              </div>

              {/* Key Differences Summary */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-cyan-400" />
                    <CardTitle className="text-white">Key Differences Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    {comparison.alignment.comparison_summary}
                  </p>
                </CardContent>
              </Card>

              {/* Sequence Alignment */}
              <SequenceAlignmentViewer
                alignment={comparison.alignment}
                humanSpeciesName={humanSpecies.common_name}
                comparisonSpeciesName={comparisonSpecies.common_name}
              />

              {/* 3D Structure Comparison */}
              <div className="grid lg:grid-cols-2 gap-8">
                <ThreeDViewer
                  structureFile={comparison.human_protein.structure_file || ''}
                  proteinName={comparison.human_protein.subunit}
                  species={humanSpecies.common_name}
                />
                <ThreeDViewer
                  structureFile={comparison.comparison_protein.structure_file || ''}
                  proteinName={comparison.comparison_protein.subunit}
                  species={comparisonSpecies.common_name}
                />
              </div>

              {/* Comparative Details */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Human Protein Details */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {humanSpecies.common_name} {comparison.human_protein.subunit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
                      <p className="text-slate-400 text-sm">{comparison.human_protein.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Sites</h4>
                      <ul className="text-slate-400 text-sm space-y-1">
                        {comparison.human_protein.key_sites?.map((site, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            {site}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Experimental Data</h4>
                      <p className="text-slate-400 text-sm">{comparison.human_protein.experimental_data}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Protein Details */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {comparisonSpecies.common_name} {comparison.comparison_protein.subunit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
                      <p className="text-slate-400 text-sm">{comparison.comparison_protein.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Sites</h4>
                      <ul className="text-slate-400 text-sm space-y-1">
                        {comparison.comparison_protein.key_sites?.map((site, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            {site}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-2">Experimental Data</h4>
                      <p className="text-slate-400 text-sm">{comparison.comparison_protein.experimental_data}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}