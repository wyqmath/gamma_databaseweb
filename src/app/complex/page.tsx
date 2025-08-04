import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Layers, Zap, Target } from 'lucide-react'

export default function ComplexPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-slate-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <Layers className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            γ-Secretase Complex
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Understanding the assembly, structure, and function of the γ-secretase complex
          </p>
        </div>

        {/* Overview Section */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Complex Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                The γ-secretase complex is a multi-subunit intramembrane protease that plays a crucial role in 
                cellular signaling and protein processing. This complex consists of four essential subunits that 
                work together to cleave transmembrane proteins within the lipid bilayer.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Key Functions</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cleavage of amyloid precursor protein (APP)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Processing of Notch signaling pathway
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Regulation of cellular differentiation
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Membrane protein homeostasis
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Clinical Significance</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Alzheimer&apos;s disease pathogenesis
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cancer development and progression
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Developmental disorders
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Therapeutic target for drug development
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Subunits Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Complex Subunits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">PSEN1</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">
                  Catalytic subunit containing the active site for proteolytic cleavage.
                </p>
                <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/subunits/psen1">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">NCT</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">
                  Substrate receptor responsible for substrate recognition and binding.
                </p>
                <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/subunits/nct">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Layers className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">APH-1</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">
                  Stabilizing subunit essential for complex assembly and stability.
                </p>
                <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/subunits/aph1">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-600/20 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">PEN-2</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 text-sm">
                  Assembly cofactor required for complex maturation and activity.
                </p>
                <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/subunits/pen2">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Assembly Process */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Complex Assembly</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg">
                The γ-secretase complex assembly is a highly regulated process that occurs in the endoplasmic 
                reticulum and involves sequential incorporation of subunits.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="text-white font-semibold">Initial Assembly</h4>
                    <p className="text-slate-300 text-sm">PSEN1 and NCT form the initial complex core</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="text-white font-semibold">APH-1 Incorporation</h4>
                    <p className="text-slate-300 text-sm">APH-1 joins to stabilize the complex structure</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="text-white font-semibold">PEN-2 Addition</h4>
                    <p className="text-slate-300 text-sm">PEN-2 completes assembly and enables endoproteolysis</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <h4 className="text-white font-semibold">Mature Complex</h4>
                    <p className="text-slate-300 text-sm">Fully assembled and catalytically active γ-secretase</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Link href="/interactions">
              View Subunit Interactions
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/species">
              Compare Across Species
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/evolution">
              Evolution Analysis
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
