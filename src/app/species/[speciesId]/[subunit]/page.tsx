import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThreeDViewer from '@/components/ThreeDViewer'
import SimpleSequenceViewer from '@/components/SimpleSequenceViewer'
import Breadcrumb from '@/components/Breadcrumb'
import DownloadButton from '@/components/DownloadButton'
import { 
  getProteinBySpeciesAndSubunit, 
  getSpeciesById, 
  getProteinsBySubunit,
  getSpecies,
  calculateSequenceStats 
} from '@/lib/data'
import { ArrowRight, Download, BarChart3, Dna, Eye, Users, TreePine } from 'lucide-react'

interface SpeciesSubunitPageProps {
  params: Promise<{
    speciesId: string
    subunit: string
  }>
}

export default async function SpeciesSubunitPage({ params }: SpeciesSubunitPageProps) {
  const { speciesId, subunit } = await params
  
  // Get the specific protein
  const protein = await getProteinBySpeciesAndSubunit(speciesId, subunit)
  const species = await getSpeciesById(speciesId)
  
  if (!protein || !species) {
    notFound()
  }
  
  // Get related data
  const allSpecies = await getSpecies()
  const sameSubunitProteins = await getProteinsBySubunit(subunit)
  const sequenceStats = calculateSequenceStats(protein.sequence)
  
  // Get other subunits for this species
  const currentSpeciesProteins = sameSubunitProteins.filter(p => p.species_id === speciesId)
  const otherSpeciesProteins = sameSubunitProteins.filter(p => p.species_id !== speciesId)
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Species', href: '/species' },
    { label: species.common_name, href: `/species/${speciesId}` },
    { label: protein.subunit, href: `/species/${speciesId}/${subunit}` }
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mb-4">
            <span className="text-2xl font-bold text-white">{protein.subunit}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {species.common_name} {protein.subunit}
          </h1>
          <p className="text-xl text-slate-400 italic mb-2">{species.scientific_name}</p>
          <p className="text-slate-300">{protein.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Dna className="h-5 w-5 text-cyan-400" />
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Species Information</h4>
                    <div className="text-slate-400 text-sm space-y-1">
                      <div>Common Name: {species.common_name}</div>
                      <div>Scientific Name: <em>{species.scientific_name}</em></div>
                      <div>Category: {species.category}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Protein Information</h4>
                    <div className="text-slate-400 text-sm space-y-1">
                      <div>Subunit: {protein.subunit}</div>
                      <div>Sequence Length: {sequenceStats.length} aa</div>
                      <div>Molecular Weight: ~{sequenceStats.molecularWeight} Da</div>
                      <div>Hydrophobic Residues: {sequenceStats.hydrophobicResidues}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sequence Statistics */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  <CardTitle className="text-white">Sequence Statistics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 text-sm">
                  {Object.entries(sequenceStats.composition)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([aa, percentage]) => (
                    <div key={aa} className="text-center">
                      <div className="text-white font-mono text-lg">{aa}</div>
                      <div className="text-slate-400">{percentage.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Protein Sequence */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white">Protein Sequence</CardTitle>
                  </div>
                  <DownloadButton
                    content={`>${protein.id}\n${protein.sequence}`}
                    filename={`${protein.id}.fasta`}
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download FASTA
                  </DownloadButton>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleSequenceViewer
                  sequence={protein.sequence}
                  title={protein.id}
                />
              </CardContent>
            </Card>

            {/* 3D Structure */}
            {protein.structure_file && (
              <ThreeDViewer
                structureFile={protein.structure_file}
                proteinName={protein.subunit}
                species={species.common_name}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Navigation */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Other subunits for this species */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Other Subunits for This Species</h4>
                  <div className="space-y-1">
                    {['PSEN1', 'NCT', 'APH-1', 'PEN-2'].map(sub => (
                      <Link
                        key={sub}
                        href={`/species/${speciesId}/${sub.toLowerCase().replace('-', '')}`}
                        className={`block px-3 py-2 rounded text-sm transition-colors ${
                          sub === protein.subunit
                            ? 'bg-cyan-600/20 text-cyan-400'
                            : 'text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Same subunit, other species */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Other Species {protein.subunit}</h4>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {otherSpeciesProteins.map(p => {
                      const otherSpecies = allSpecies.find(s => s.id === p.species_id)
                      if (!otherSpecies) return null
                      return (
                        <Link
                          key={p.id}
                          href={`/species/${p.species_id}/${subunit}`}
                          className="block px-3 py-2 rounded text-sm text-slate-400 hover:bg-slate-700 hover:text-slate-300 transition-colors"
                        >
                          {otherSpecies.common_name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Tools */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-white text-lg">Comparative Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600">
                  <Link href={`/msa?species=${speciesId}&subunit=${protein.subunit}`}>
                    Multiple Sequence Alignment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/evolution">
                    Evolutionary Analysis
                    <TreePine className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Statistics Summary */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Statistics Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sequence Length</span>
                  <span className="text-white">{sequenceStats.length} aa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Molecular Weight</span>
                  <span className="text-white">{sequenceStats.molecularWeight} Da</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hydrophobic Residues</span>
                  <span className="text-white">{sequenceStats.hydrophobicResidues}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Species with Same Subunit</span>
                  <span className="text-white">{sameSubunitProteins.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
