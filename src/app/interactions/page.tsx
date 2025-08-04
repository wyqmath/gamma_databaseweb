import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Network, Zap, Target, Layers } from 'lucide-react'

export default function InteractionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-slate-400 hover:text-white">
            <Link href="/complex">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Complex
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
            <Network className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Subunit Interactions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Exploring the molecular interactions between γ-secretase complex subunits
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Interaction Network</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                The γ-secretase complex functions through a sophisticated network of protein-protein interactions 
                that are essential for complex assembly, stability, and catalytic activity. Understanding these 
                interactions is crucial for comprehending the complex&apos;s mechanism and developing therapeutic strategies.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Interaction Matrix */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interaction Matrix</h2>
          <div className="grid gap-6">
            
            {/* PSEN1 Interactions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">PSEN1 Interactions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">PSEN1 ↔ NCT</h4>
                    <p className="text-slate-300 text-sm">
                      Direct binding through transmembrane domains. Critical for initial complex assembly.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">Strong</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">PSEN1 ↔ APH-1</h4>
                    <p className="text-slate-300 text-sm">
                      Stabilizing interactions that maintain complex integrity and proper folding.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Moderate</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">PSEN1 ↔ PEN-2</h4>
                    <p className="text-slate-300 text-sm">
                      Essential for endoproteolytic activation and catalytic site formation.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">Strong</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NCT Interactions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">NCT Interactions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">NCT ↔ APH-1</h4>
                    <p className="text-slate-300 text-sm">
                      Cooperative binding that enhances substrate recognition and complex stability.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Moderate</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">NCT ↔ PEN-2</h4>
                    <p className="text-slate-300 text-sm">
                      Indirect interactions mediated through PSEN1, important for complex assembly.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">Weak</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* APH-1 and PEN-2 Interactions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Layers className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">APH-1 ↔ PEN-2 Interactions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Cooperative Assembly</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    APH-1 and PEN-2 work together to complete complex assembly and enable catalytic activity. 
                    Their interaction is primarily mediated through their shared contacts with PSEN1.
                  </p>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">Indirect</span>
                    <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">Functional</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Functional Consequences */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Functional Consequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Assembly Defects</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Disrupted PSEN1-NCT binding prevents complex formation
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Loss of APH-1 leads to complex instability
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      PEN-2 absence blocks endoproteolytic activation
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Therapeutic Implications</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Interaction interfaces as drug targets
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Allosteric modulation opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Assembly inhibitors for disease treatment
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/complex">
              Back to Complex Overview
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/subunits">
              Explore Individual Subunits
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/species">
              Compare Across Species
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
