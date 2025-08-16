import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/Breadcrumb'
import { 
  getSpeciesById, 
  getProteinsBySpecies,
  calculateSequenceStats 
} from '@/lib/data'
import { ArrowRight, Dna, BarChart3, Eye, Database, TreePine } from 'lucide-react'

interface SpeciesPageProps {
  params: Promise<{
    speciesId: string
  }>
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const { speciesId } = await params
  
  const species = await getSpeciesById(speciesId)
  const proteins = await getProteinsBySpecies(speciesId)
  
  if (!species) {
    notFound()
  }
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Species', href: '/species' },
    { label: species.common_name, href: `/species/${speciesId}` }
  ]

  // Group proteins by subunit
  const subunitGroups = proteins.reduce((acc, protein) => {
    if (!acc[protein.subunit]) {
      acc[protein.subunit] = []
    }
    acc[protein.subunit].push(protein)
    return acc
  }, {} as Record<string, typeof proteins>)

  // Calculate total statistics
  const totalSequenceLength = proteins.reduce((sum, p) => sum + p.sequence.length, 0)
  const avgSequenceLength = proteins.length > 0 ? Math.round(totalSequenceLength / proteins.length) : 0

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
            <Database className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {species.common_name}
          </h1>
          <p className="text-xl text-slate-400 italic mb-4">{species.scientific_name}</p>
          <p className="text-slate-300 max-w-2xl mx-auto">{species.description}</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{proteins.length}</div>
              <div className="text-slate-400 text-sm">Subunits</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">{totalSequenceLength}</div>
              <div className="text-slate-400 text-sm">Total Sequence Length</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{avgSequenceLength}</div>
              <div className="text-slate-400 text-sm">Average Sequence Length</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">{species.category}</div>
              <div className="text-slate-400 text-sm">Category</div>
            </CardContent>
          </Card>
        </div>

        {/* Subunit Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {['PSEN1', 'NCT', 'APH-1', 'PEN-2'].map(subunit => {
            const protein = subunitGroups[subunit]?.[0]
            const stats = protein ? calculateSequenceStats(protein.sequence) : null
            
            return (
              <Card key={subunit} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg">
                        <Dna className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{subunit}</CardTitle>
                        <p className="text-slate-400 text-sm">
                          {subunit === 'PSEN1' && 'Catalytic Subunit'}
                          {subunit === 'NCT' && 'Substrate Receptor'}
                          {subunit === 'APH-1' && 'Stabilizing Subunit'}
                          {subunit === 'PEN-2' && 'Assembly Cofactor'}
                        </p>
                      </div>
                    </div>
                    {protein && (
                      <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Link href={`/species/${speciesId}/${subunit.toLowerCase().replace('-', '')}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {protein ? (
                    <div className="space-y-4">
                      <p className="text-slate-300 text-sm">{protein.description}</p>
                      
                      {stats && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Sequence Length:</span>
                            <span className="text-white ml-2">{stats.length} aa</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Molecular Weight:</span>
                            <span className="text-white ml-2">~{stats.molecularWeight} Da</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Hydrophobicity:</span>
                            <span className="text-white ml-2">{stats.hydrophobicResidues}%</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Structure File:</span>
                            <span className="text-white ml-2">{protein.structure_file ? 'Available' : 'None'}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                          <Link href={`/species/${speciesId}/${subunit.toLowerCase().replace('-', '')}`}>
                            Detailed Analysis
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        {protein.structure_file && (
                          <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Link href={`/species/${speciesId}/${subunit.toLowerCase().replace('-', '')}`}>
                              3D Structure
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-slate-500 mb-2">No Data Available</div>
                      <p className="text-slate-400 text-sm">The {subunit} subunit data for this species has not been collected yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-cyan-500 hover:bg-cyan-600">
                  <Link href={`/msa?species=${speciesId}`}>
                    Multiple Sequence Alignment
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/evolution">
                    Evolutionary Analysis
                    <TreePine className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
