import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Wrench, Link as LinkIcon } from 'lucide-react'

export default function SubunitsPage() {
  const subunits = [
    {
      id: 'psen1',
      name: 'PSEN1',
      fullName: 'Presenilin-1',
      description: 'The catalytic subunit of the γ-secretase complex containing the active site aspartate residues responsible for intramembrane proteolysis.',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      keyFeatures: [
        'Contains two critical catalytic aspartate residues (D257, D385)',
        'Undergoes endoproteolytic cleavage to generate active fragments',
        'Nine transmembrane domains forming the catalytic core',
        'Most common target for familial Alzheimer disease mutations'
      ],
      stats: {
        species: 6,
        mutations: '300+',
        conservation: '96.7%'
      }
    },
    {
      id: 'nct',
      name: 'NCT',
      fullName: 'Nicastrin',
      description: 'The substrate receptor subunit that recognizes and binds to the stub peptides generated by α- or β-secretase cleavage of substrates.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      keyFeatures: [
        'Large extracellular domain for substrate recognition',
        'Contains the critical DYIGS substrate-binding motif',
        'Type I transmembrane glycoprotein',
        'Essential for substrate selectivity and binding'
      ],
      stats: {
        species: 6,
        mutations: '50+',
        conservation: '91.8%'
      }
    },
    {
      id: 'aph1',
      name: 'APH-1',
      fullName: 'Anterior Pharynx-defective 1',
      description: 'A seven-transmembrane protein essential for the assembly and stability of the γ-secretase complex.',
      icon: Wrench,
      color: 'from-green-500 to-green-600',
      keyFeatures: [
        'Seven transmembrane domains for complex stabilization',
        'Two paralogs in mammals (APH-1A and APH-1B)',
        'Critical for presenilin endoproteolysis',
        'Contains conserved histidine residues'
      ],
      stats: {
        species: 6,
        mutations: '20+',
        conservation: '94.2%'
      }
    },
    {
      id: 'pen2',
      name: 'PEN-2',
      fullName: 'Presenilin Enhancer 2',
      description: 'A small but essential transmembrane protein required for γ-secretase complex assembly and presenilin activation.',
      icon: LinkIcon,
      color: 'from-purple-500 to-purple-600',
      keyFeatures: [
        'Smallest subunit with only 101 amino acids',
        'Two transmembrane domains',
        'Essential for complex maturation',
        'Facilitates presenilin endoproteolysis'
      ],
      stats: {
        species: 6,
        mutations: '10+',
        conservation: '98.0%'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">γ-Secretase Subunits</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Explore the four essential subunits that form the γ-secretase complex. Each subunit plays 
            a unique and critical role in the assembly, stability, and catalytic activity of this 
            important enzyme complex.
          </p>
        </div>

        {/* Subunits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {subunits.map((subunit) => {
            const IconComponent = subunit.icon
            return (
              <Card key={subunit.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${subunit.color}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-2xl">{subunit.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{subunit.fullName}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300">{subunit.description}</p>
                  
                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {subunit.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-400">
                          <span className="text-cyan-400 mr-2 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                      <div className="text-lg font-bold text-cyan-400">{subunit.stats.species}</div>
                      <div className="text-xs text-slate-500">Species</div>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-400">{subunit.stats.mutations}</div>
                      <div className="text-xs text-slate-500">Mutations</div>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                      <div className="text-lg font-bold text-green-400">{subunit.stats.conservation}</div>
                      <div className="text-xs text-slate-500">Conservation</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Link href={`/subunits/${subunit.id}`}>
                      Explore {subunit.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Complex Overview */}
        <Card className="bg-slate-800/30 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">The γ-Secretase Complex</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-slate-300 max-w-3xl mx-auto">
                The γ-secretase complex is a high molecular weight intramembrane protease composed of 
                four essential subunits. Each subunit contributes unique structural and functional 
                properties that are required for proper complex assembly and catalytic activity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">PSEN1</h4>
                <p className="text-slate-400 text-sm">Catalytic Core</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">NCT</h4>
                <p className="text-slate-400 text-sm">Substrate Receptor</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">APH-1</h4>
                <p className="text-slate-400 text-sm">Stabilizer</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <LinkIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">PEN-2</h4>
                <p className="text-slate-400 text-sm">Assembly Factor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Ready to Compare Across Species?
              </h3>
              <p className="text-slate-300 mb-6">
                Explore how these subunits vary across different organisms and discover 
                evolutionary conservation patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Link href="/species">
                    Browse Species
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/evolution">
                    View Evolution Tree
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
